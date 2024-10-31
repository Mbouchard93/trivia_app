/**
 *
 * @returns {Promise<object[]>}
 */
export async function fetchCategories() {
  /**
   * @type {Promise<Response>}
   */
  const response = await fetch("https://opentdb.com/api_category.php");
  /**
   * @type {Promise<any>}
   */
  const data = await response.json();
  return data.trivia_categories;
}
/**
 *
 * @param {number} Nbquestion
 * @param {string} selectCategory
 * @param {string} difficulty
 * @param {string} type
 * @returns {string}
 */
export function generateUrl(Nbquestion = 10, selectCategory, difficulty, type) {
  let url = `https://opentdb.com/api.php?amount=${Nbquestion}`;
  if (selectCategory) url += `&category=${selectCategory}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  if (type) url += `&type=${type}`;
  return url;
}
