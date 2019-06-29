// const API_URL = "https://api.github.com";
const API_URL = "http://localhost:8080";

function getUserData(username) {
  // return fetch(`${API_URL}/users/${username}`).then(result => result.json());
  return fetch(`${username}.json`).then(result => result.json());
}

const firstGitInput = document.querySelector("input[name=firstGitInput]");
const secondGitInput = document.querySelector("input[name=secondGitInput]");
const submitForm = document.querySelector("input[name=submitForm]");

submitForm.addEventListener("click", async event => {
  event.preventDefault();
  console.log("Pega dados");
  try {
    const firstUser = await getUserData(firstGitInput.value);
    const secondUser = await getUserData(secondGitInput.value);
    console.log(firstUser, secondUser);
  } catch (error) {
    console.log(error.message);
  }
});
