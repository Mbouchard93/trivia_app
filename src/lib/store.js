import { writable } from "svelte/store";
/**
 *
 * @param {string} key
 * @param {*} defaultValue
 * @returns {import("svelte/store").Writable}
 */
function createStorage(key, defaultValue) {
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
/**
 * @type {object}
 */
export const settingsUrl = createStorage(
  "settingsUrl",
  "https://opentdb.com/api.php?amount=10"
);
/**
 * @type {object}
 */
export const selectCategory = createStorage("selectCategory", "");
/**
 * @type {object}
 */
export const difficulty = createStorage("difficulty", "");
/**
 * @type {object}
 */
export const type = createStorage("type", "");
/**
 * @type {object}
 */
export const currentScreen = writable("home");
/**
 * @type {object}
 */
export const screenData = writable({});
