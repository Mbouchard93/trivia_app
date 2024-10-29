<script>
    import { getUsernames } from "$lib/user.js";
    import { currentScreen } from "$lib/store";
    let usernames = [];
    export let data;
  
    usernames = getUsernames();
  </script>
  <div class="grid h-fit gap-6">
    <div class="grid grid-cols-2 h-fit ">
  <h2 class="uppercase place-content-end ">best score</h2>
  <img class="place-self-end" src="/triviascreen.png" alt="">
  </div>
  <svg  xmlns="http://www.w3.org/2000/svg" width="377" height="2" viewBox="0 0 377 2" fill="none">
    <path d="M0 1H376.5" stroke="#C098DF" stroke-width="0.8" stroke-dasharray="6 6"/>
  </svg>
  </div>
  <ul>
    {#each usernames as username}
      <li>{username}</li>
    {/each}
  </ul>
  <button on:click={() => currentScreen.set("home")}>Retour à l'accueil</button>
  