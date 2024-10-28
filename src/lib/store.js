import { writable } from "svelte/store";

function createWritableWithLocalStorage(key, defaultValue) {
  const store = writable(
    typeof window !== "undefined"
      ? localStorage.getItem(key) || defaultValue
      : defaultValue
  );
  store.subscribe((value) => {
    if (typeof window !== "undefined") localStorage.setItem(key, value);
  });
  return store;
}

export const settingsUrl = createWritableWithLocalStorage(
  "settingsUrl",
  "https://opentdb.com/api.php?amount=10"
);
export const selectCategory = createWritableWithLocalStorage(
  "selectCategory",
  ""
);
export const difficulty = createWritableWithLocalStorage("difficulty", "");
export const type = createWritableWithLocalStorage("type", "");
export const currentScreen = writable("home");
export const screenData = writable({});
