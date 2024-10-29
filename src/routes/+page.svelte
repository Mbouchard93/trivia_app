<script>
  import '../app.css';
  import { currentScreen, screenData } from "$lib/store";
  
  import Accueil from './accueil/+page.svelte'
  import Game from './gameScreen/+page.svelte'
  import Result from './result/+page.svelte'
  import Settings from './settings/+page.svelte'
  import BestScore from './settings/+page.svelte'

  const components = {
      home: Accueil,
      game: Game,
      result: Result,
      settings: Settings,
      bestScore: BestScore,
  };
</script>

<svelte:component this={components[$currentScreen]} data={$screenData} />
