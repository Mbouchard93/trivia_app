export function getUsernames() {
  return JSON.parse(localStorage.getItem("usernames") || "[]");
}

export function addUsername(username) {
  const usernames = getUsernames();
  usernames.push(username);
  localStorage.setItem("usernames", JSON.stringify(usernames));
}

export function validateUsername(username) {
  return username.trim() === "" ? "Please enter your name." : "";
}
