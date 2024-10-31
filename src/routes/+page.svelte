<script>
  import '../app.css';
  import { currentScreen, screenData } from "$lib/store";
  
  import Accueil from './accueil/+page.svelte'
  import Game from './gameScreen/+page.svelte'
  import Result from './result/+page.svelte'
  import Settings from './settings/+page.svelte'
  import BestScore from './bestScore/+page.svelte'

  /**
   * @type {object}
   */
  const components = {
      home: Accueil,
      game: Game,
      result: Result,
      settings: Settings,
      bestScore: BestScore,
  };
</script>

<svelte:component this={components[$currentScreen]} data={$screenData} />
