<script>
  import { onMount } from "svelte";
  import {
    settingsUrl,
    selectCategory,
    difficulty,
    type,
    currentScreen,
  } from "$lib/store";
  import { fetchCategories, generateUrl } from "$lib/settings";
  import { writable } from "svelte/store";
  import ButtonSecondary from "../../compoment/button-secondary.svelte";
  import ButtonPrimary from "../../compoment/button-primary.svelte";
  import FooterDesktop from "../../compoment/footer-desktop.svelte";
  import HeaderScreen from "../../compoment/header-screen.svelte";

  export const screenData = writable({});
  /**
  * @type {[]} 
  */
  let categories = [];
  /**
   * @type {number}
   */
  let Nbquestion = 10;

  onMount(async () => {
    categories = await fetchCategories();
  });

  function saveSettings() {
    /**
     * @type {string}
     */
    const url = generateUrl(Nbquestion, $selectCategory, $difficulty, $type);
    settingsUrl.set(url);
    currentScreen.set("home");
  }

  function resetSettings() {
    Nbquestion = 10;
    selectCategory.set("");
    difficulty.set("");
    type.set("");
    settingsUrl.set("https://opentdb.com/api.php?amount=10");
  }
</script>

<section class="flex flex-col h-screen gap-7 px-[25px]">
  <HeaderScreen text="settings" />
  <div class="flex flex-col md:w-full md:items-center gap-10">
    <p class="text-lightestPurple text-[2.5rem] font-[600] hidden md:block">
      Choose your setting
    </p>
    <div class="flex flex-col md:grid md:grid-cols-2 md:pt-10 gap-5 md:w-2/3">
      <div class="flex flex-col w-full gap-1">
        <label for="nb">Number of Questions:</label>
        <input
          id="nb"
          class="text-black rounded-[0.5rem] p-2"
          type="number"
          bind:value={Nbquestion}
          min="1"
          max="100"/>
      </div>
      <div class="flex flex-col w-full gap-1">
        <label for="cat">Select Category</label>
        <select
          id="cat"
          class="text-black rounded-[0.5rem] p-2"
          bind:value={$selectCategory}>
          <option class="text-black" value="">Any Category</option>
          {#each categories as category}
            <option class="text-black w-fit" value={category.id}
              >{category.name}</option>
          {/each}
        </select>
      </div>
      <div class="flex flex-col w-full gap-1">
        <label for="dif">Select Difficulty</label>
        <select
          id="dif"
          class="text-black rounded-[0.5rem] p-2"
          bind:value={$difficulty}>
          <option class="text-black" value="">Any Difficulty</option>
          <option class="text-black" value="easy">Facile</option>
          <option class="text-black" value="medium">Moyenne</option>
          <option class="text-black" value="hard">Difficile</option>
        </select>
      </div>
      <div class="flex flex-col w-full gap-1">
        <label for="type">Select Type:</label>
        <select
          id="type"
          class="text-black rounded-[0.5rem] p-2"
          bind:value={$type}>
          <option class="text-black" value="">Any Type</option>
          <option class="text-black" value="multiple">Multiple Choice</option>
          <option class="text-black" value="boolean">True/False</option>
        </select>
      </div>
    </div>
    <div class="md:w-[27.1875rem] flex flex-col gap-5">
      <div class="flex gap-4 pt-6">
        <ButtonSecondary
          onClick={saveSettings}
          text="Save"
          className="md:w-[220px]"/>
        <ButtonSecondary
          onClick={resetSettings}
          text="Reset"
          className="md:w-[220px]"/>
      </div>
      <ButtonPrimary onClick={() => currentScreen.set("home")} text="Play" />
    </div>
  </div>
</section>
<FooterDesktop />
