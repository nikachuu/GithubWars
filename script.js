const API_URL = "https://api.github.com";

function getUserData(username) {
  return fetch(`${API_URL}/users/${username}`).then(result => result.json());
}

getUserData("Febatista107").then(user => {
  console.log(user);
});
