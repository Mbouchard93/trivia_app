/**
 *
 * @returns {string[]}
 */
export function getUsernames() {
  return JSON.parse(localStorage.getItem("usernames") || "[]");
}
/**
 *
 * @param {string} username
 */
export function addUsername(username) {
  const usernames = getUsernames();
  usernames.push(username);
  localStorage.setItem("usernames", JSON.stringify(usernames));
}
/**
 *
 * @param {string} username
 * @returns {string}
 */
export function validateUsername(username) {
  return username.trim() === "" ? "Please enter your name." : "";
}
