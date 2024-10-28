<script>
  import { screenData, currentScreen } from "$lib/store";
  let score, total;

  screenData.subscribe(data => {
    score = data.score;
    total = data.total;
  });

  function goHome() {
    currentScreen.set("home");
  }
</script>

<div class="grid h-fit gap-6">
  <div class="grid grid-cols-2 h-fit ">
<h2 class="uppercase place-content-end ">results</h2>
<img class="place-self-end" src="/triviascreen.png" alt="">
</div>
<svg  xmlns="http://www.w3.org/2000/svg" width="377" height="2" viewBox="0 0 377 2" fill="none">
  <path d="M0 1H376.5" stroke="#C098DF" stroke-width="0.8" stroke-dasharray="6 6"/>
</svg>
</div>
<p>Votre score: {score} / {total}</p>
<button on:click={goHome}>try again</button>
