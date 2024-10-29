<script>
  import { onMount } from "svelte";
  import { settingsUrl, screenData, currentScreen } from "$lib/store";
  import { getData } from "$lib/api";
  import { writable } from "svelte/store";
  import ButtonPrimary from "../../compoment/button-primary.svelte";
  export let data;
  let questions = writable([]);
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft ;
  let timer;
  let selectedAnswer = "";
  let username = localStorage.getItem("username") || "";
  $: progressBarWidth = (timeLeft / 120) * 100;

  async function fetchQuestions() {
    const url = $settingsUrl;
    const data = await getData(url);
    if (data && data.length > 0) {
      questions.set(data);
    }
  }

  function answerQuestion() {
    const currentQuestion = $questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      score++;
    }
    updateQuestion();
  }

  function updateQuestion() {
    if (currentQuestionIndex < $questions.length - 1) {
      currentQuestionIndex++;
      selectedAnswer = "";
      resetTimer();
    } else {
      clearInterval(timer);
      saveGameData();
      screenData.set({ score, total: $questions.length });
      currentScreen.set("result");
    }
  }

  function resetTimer() {
    clearInterval(timer);
    timeLeft = 120;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        answerQuestion();
      }
    }, 1000);
  }

  function saveGameData() {
    const gameData = {
      username,
      score,
      total: $questions.length
    };
    let storedData = JSON.parse(localStorage.getItem("gameData")) || {};
    storedData[username] = gameData;
    localStorage.setItem("gameData", JSON.stringify(storedData));
  }

  onMount(() => {
    fetchQuestions();
    resetTimer();
  });
</script>

<header class="grid h-fit gap-6">
  <div class="grid grid-cols-2 h-fit">
    <h2 class="place-content-end text-[20px]">Question {currentQuestionIndex + 1}/<span class="text-[18px]">{$questions.length}</span></h2>
    <img class="place-self-end " src="/triviascreen.png" alt="">
  </div>
  <svg  xmlns="http://www.w3.org/2000/svg" width="377" height="2" viewBox="0 0 377 2" fill="none">
    <path d="M0 1H376.5" stroke="#C098DF" stroke-width="0.8" stroke-dasharray="6 6"/>
  </svg>
</header>
<main class="flex flex-col gap-10 ">
{#if $questions.length > 0}
  <p class="text-purple">Your current score {score} of {$questions.length}</p>
  <div class="w-full border-2 border-white rounded-[1.25rem] h-[2.5rem] relative">
    <div class="bg-popPurple rounded-[1.25rem] h-[2.25rem]" style="width: {progressBarWidth}%;"></div>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="absolute right-5 bottom-1.5 "> <!-- Positionner le SVG -->
      <path d="M12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V13C11.25 13.4142 11.5858 13.75 12 13.75H16C16.4142 13.75 16.75 13.4142 16.75 13C16.75 12.5858 16.4142 12.25 16 12.25H12.75V7Z" fill="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12Z" fill="white"/>
    </svg>
  </div>
  <p>{$questions[currentQuestionIndex].question}</p>
  <div class="flex flex-col gap-[1.38rem]">
    {#each [...$questions[currentQuestionIndex].incorrect_answers, $questions[currentQuestionIndex].correct_answer] as choice}
      <label class="bg-purple text-darkPurple  h-[4rem] rounded-[10px] p-5  ">
        <input  type="radio" name="answer" bind:group={selectedAnswer} value="{choice}" />
        {choice}
      </label>
    {/each}
  </div>
  <ButtonPrimary onClick={answerQuestion} text="next"/>
{:else}
  <p>reload page</p>
{/if}
</main>

