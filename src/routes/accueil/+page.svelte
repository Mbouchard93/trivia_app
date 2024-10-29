<script>
  import { currentScreen } from "$lib/store";
  import { addUsername, validateUsername } from "$lib/user";
  import ButtonPrimary from "../../compoment/button-primary.svelte";
  import ButtonSecondary from "../../compoment/button-secondary.svelte";
  let username = "";
  let errorMessage = "";

  function handlePlay() {
    errorMessage = validateUsername(username);
    if (!errorMessage) {
      addUsername(username);
      localStorage.setItem("username", username);
      currentScreen.set("game");
    }
  }
  function goTo(screen){
    currentScreen.set(screen)
  }

</script>

<section class="grid h-screen">
  <div class="grid">
    <img class="place-self-center" src="/trivialogo.png" alt="trivia_logo">
    <h1 class="font-mono text-[55px]">Quizz time</h1>
    <img src="/line.svg" alt="">
  </div>
  <div class="grid gap-4 h-fit">
    <div class="flex justify-between">
      <p class="text-[1.5rem] uppercase">LET’S PLAY!!</p>
      <img src="/arrow-square-down-1.svg" alt="">
    </div>
    <input class="p-4 w-full rounded-[0.5rem] text-black" type="text" bind:value={username} placeholder="Name" />
    <ButtonPrimary onClick={handlePlay} text="play" />
    {#if errorMessage}<p class="text-red-500">{errorMessage}</p>
    {/if}
  </div>
  <div class="place-self-center flex w-full gap-2 ">
    <ButtonSecondary  onClick={() => goTo('settings')} text="settings" />
    <ButtonSecondary  onClick={() => goTo('bestScore')} text="best score" />
  </div>
</section>
