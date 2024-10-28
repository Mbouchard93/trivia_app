export async function fetchCategories() {
  const response = await fetch("https://opentdb.com/api_category.php");
  const data = await response.json();
  console.log(data);
  return data.trivia_categories;
}

export function generateUrl(Nbquestion = 10, selectCategory, difficulty, type) {
  let url = `https://opentdb.com/api.php?amount=${Nbquestion}`;
  if (selectCategory) url += `&category=${selectCategory}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  if (type) url += `&type=${type}`;
  return url;
}
