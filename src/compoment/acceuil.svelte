<script>
  import { currentScreen } from "$lib/store";
  import { addUsername, validateUsername } from "$lib/user"
  let username = "";
  let errorMessage = "";

  function handlePlay() {
    errorMessage = validateUsername(username);
    if (!errorMessage) {
      addUsername(username);
      currentScreen.set("gameScreen");
    }
  }
</script>

<section class="grid h-screen">
  <div class="grid">
  <img class="place-self-center"  src="/trivialogo.png" alt="trivia_logo">
  <h1 class="font-mono text-[55px]">Quizz time</h1>
  <img src="/line.svg" alt="">
</div>
  <div class="grid gap-4 h-fit">
  <div class="flex justify-between">
    <p class="text-[1.5rem] uppercase">LET’S PLAY!!</p>
    <img src="/arrow-square-down-1.svg" alt="">
  </div>
  <input class="p-4 w-full rounded-[0.5rem]" type="text" bind:value={username} placeholder="Name" />
  <button on:click={handlePlay}>PLAY</button>
  {#if errorMessage}<p class="text-red-500">{errorMessage}</p>{/if}
</div>
  <div class="place-self-center">
  <button on:click={() => currentScreen.set('settings')}>Settings</button>
  <button on:click={() => currentScreen.set('bestScore')}>Best Score</button>
</div>
</section>
