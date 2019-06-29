const API_URL = "https://api.github.com";

function getUserData(username) {
  return fetch(`${API_URL}/users/${username}`).then(result => result.json());
}

function getScore(user) {
  const scoreBases = [
    { label: "Repositórios", key: "public_repos", ppc: 20 },
    { label: "Seguidores", key: "followers", ppc: 10 },
    { label: "Seguindo", key: "following", ppc: 5 },
    { label: "Gists", key: "public_gists", ppc: 5 }
  ];
  const scores = scoreBases.map(scoreBase => {
    const quantity = user[scoreBase.key];
    const score = quantity * scoreBase.ppc;
    return {
      ...scoreBase,
      quantity,
      score
    };
  });
  return scores;
}

const firstGitInput = document.querySelector("input[name=firstGitInput]");
const secondGitInput = document.querySelector("input[name=secondGitInput]");
const submitForm = document.querySelector("input[name=submitForm]");
const errorDisplay = document.getElementById("error");
const firstUserImg = document.getElementById("firstGitImg");
const secondUserImg = document.getElementById("secondGitImg");
const firstUserScoreTable = document.getElementById("firstUserScore");
const secondUserScoreTable = document.getElementById("secondUserScore");

submitForm.addEventListener("click", async event => {
  event.preventDefault();
  try {
    const firstUser = await getUserData(firstGitInput.value);
    const secondUser = await getUserData(secondGitInput.value);
    if (!firstUser || !secondUser) {
      errorDisplay.innerText = "Informe um jedi existente";
      return;
    }
    firstUserImg.setAttribute("src", firstUser.avatar_url);
    secondUserImg.setAttribute("src", secondUser.avatar_url);
    const firstUserScores = getScore(firstUser);
    const secondUserScores = getScore(secondUser);
    firstUserScores.forEach(score => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${score.label}</td>
        <td>${score.quantity}</td>
        <td>${score.score}</td>
      `;
      firstUserScoreTable.appendChild(row);
    });
    secondUserScores.forEach(score => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${score.label}</td>
        <td>${score.quantity}</td>
        <td>${score.score}</td>
      `;
      secondUserScoreTable.appendChild(row);
    });
  } catch (error) {
    errorDisplay.innerText = "Informe um jedi existente";
  }
});
