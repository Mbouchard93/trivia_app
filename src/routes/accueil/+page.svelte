<script>
  import { currentScreen } from "$lib/store";
  import { addUsername, validateUsername } from "$lib/user";
  import ButtonPrimary from "../../compoment/button-primary.svelte";
  import ButtonSecondary from "../../compoment/button-secondary.svelte";
  import FooterDesktop from "../../compoment/footer-desktop.svelte";
  /**
   * @type {string}
  */
  let username = "";
  /**
   * @type {string}
  */
  let errorMessage = "";

  function handlePlay() {
    errorMessage = validateUsername(username);
    if (!errorMessage) {
      addUsername(username);
      localStorage.setItem("username", username);
      currentScreen.set("game");
    }
  }
  /**
   * 
   * @param {string}
   */
  function goTo(screen) {
    currentScreen.set(screen);
  }
</script>

<section class="flex flex-col h-screen justify-around md:pb-[150px] md:h-[820px] px-[25px]">
  <header class="flex flex-col lg:flex-row justify-around items-center">
    <img class="place-self-center" src="/trivialogo.png" alt="trivia_logo" />
    <h1 class="font-mono text-[50px]">Quizz time</h1>
    <div class="hidden lg:flex gap-2">
      <button on:click={() => goTo("settings")} 
      class=" py-[0.93rem] px-[2.3rem] bg-withe text-darkPurple border rounded-[0.3125rem] uppercase">settings</button>
      <button on:click={() => goTo("bestScore")}
      class=" py-[.93rem] px-[1.56rem] bg-withe text-darkPurple border rounded-[0.3125rem] uppercase">best score</button>
    </div>
    <img class="md:hidden" src="/line.svg" alt="" />
  </header>
  <div class="md:w-ful md:flex md:justify-center ">
    <div class="flex flex-col gap-4 md:w-[550px] md:justify-center">
      <div class="flex justify-between">
        <p class="text-[1.5rem] uppercase">LET’S PLAY!!</p>
        <img src="/arrow-square-down-1.svg" alt="" />
      </div>
      <input
        class="p-4 rounded-[0.5rem] text-black "
        type="text"
        bind:value={username}
        placeholder="Name"/>
      <ButtonPrimary onClick={handlePlay} text="play" />
      {#if errorMessage}
        <p class="text-red-600">{errorMessage}</p>
      {/if}
    </div>
  </div>
  <div class="place-self-center flex w-full gap-4 lg:hidden">
    <ButtonSecondary onClick={() => goTo("settings")} text="settings" />
    <ButtonSecondary onClick={() => goTo("bestScore")} text="best score" />
  </div>
</section>
<FooterDesktop />
