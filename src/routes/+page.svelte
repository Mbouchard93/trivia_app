<!-- src/routes/+page.svelte -->
<script>
  import '../app.css';
  import { currentScreen, screenData } from "$lib/store";
import Acceuil from '../compoment/acceuil.svelte';
import GameScreen from '../compoment/gameScreen.svelte';
import ResultScreen from '../compoment/resultScreen.svelte';
import Settings from '../compoment/settings.svelte';
import BestScore from '../compoment/bestScore.svelte';

  const components = {
      home: Acceuil,
      gameScreen: GameScreen,
      resultScreen: ResultScreen,
      settings: Settings,
      bestScore: BestScore,
  };
</script>

<svelte:component this={components[$currentScreen]} data={$screenData} />
