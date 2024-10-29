<script>
  import { onMount } from "svelte";
  import { settingsUrl, selectCategory, difficulty, type, currentScreen } from "$lib/store";
  import { fetchCategories, generateUrl } from "$lib/settings";
  import { writable } from 'svelte/store';
  export let data;

export const screenData = writable({});

  let categories = [];
  let Nbquestion = 10; 

  onMount(async () => {
    categories = await fetchCategories();
  });

  function saveSettings() {
    const url = generateUrl(Nbquestion, $selectCategory, $difficulty, $type); 
    settingsUrl.set(url); 
    console.log(url); 
    currentScreen.set("home");
}

  function resetSettings() {
    Nbquestion = 10;
    selectCategory.set("");
    difficulty.set("");
    type.set("");
    settingsUrl.set("https://opentdb.com/api.php?amount=10")
  }
</script>
<section class="grid h-screen ">
<div class="grid h-fit gap-6">
  <div class="grid grid-cols-2 h-fit ">
<h2 class="uppercase place-content-end ">settings</h2>
<img class="place-self-end" src="/triviascreen.png" alt="">
</div>
<svg  xmlns="http://www.w3.org/2000/svg" width="377" height="2" viewBox="0 0 377 2" fill="none">
  <path d="M0 1H376.5" stroke="#C098DF" stroke-width="0.8" stroke-dasharray="6 6"/>
</svg>
</div>
<div class="grid h-fit">
<label for="nb">
  Nombre de questions:
</label>
  <input id="nb" class="text-black" type="number" bind:value={Nbquestion} min="1" max="50" />
<label for="cat">
  Catégorie:
</label>
  <select id="cat" class="text-black" bind:value={$selectCategory}>
    <option class="text-black" value="">Any Category</option>
    {#each categories as category}
      <option class="text-black w-fit" value={category.id}>{category.name}</option>
    {/each}
  </select>

<label for="dif">
  Difficulté:
</label>
  <select id="dif" class="text-black" bind:value={$difficulty}>
    <option class="text-black" value="">Any Difficulty</option>
    <option class="text-black" value="easy">Facile</option>
    <option class="text-black" value="medium">Moyenne</option>
    <option class="text-black" value="hard">Difficile</option>
  </select>

<label for="type">
  Type:
</label>
  <select id="type" class="text-black" bind:value={$type}>
    <option class="text-black" value="">Any Type</option>
    <option class="text-black" value="multiple">Multiple Choice</option>
    <option class="text-black" value="boolean">True/False</option>
  </select>
</div>
<div>
<button on:click={saveSettings}>Save</button>
<button on:click={resetSettings}>Reset</button>
<button on:click={() => currentScreen.set("gameScreen")}>play</button>
</div>
</section>