<script>
  import { onMount } from "svelte";
  import { settingsUrl, screenData, currentScreen } from "$lib/store";
  import { getData } from "$lib/api";
  import { writable } from "svelte/store";
  import ButtonPrimary from "../../compoment/button-primary.svelte";
  import FooterDesktop from "../../compoment/footer-desktop.svelte";
  import HeaderScreen from "../../compoment/header-screen.svelte";

    /** 
   * @type {import('svelte/store').Writable<object[]>}
   */
  let questions = writable([]);
  /**
   * @type {number}
   */
  let currentQuestionIndex = 0;
  /**
   * @type {number}
   */
  let score = 0;
  /**
   * @type {number}
   */
  let timeLeft;
  /**
   * @type {number}
   */
  let timer;
  /**
   * @type {string}
   */
  let selectedAnswer = "";
  /**
   * @type{string}
   */
  let username = localStorage.getItem("username") || "";
  /**
   * @type {number}
   */
  $: progressBarWidth = (timeLeft / 45) * 100;

  async function fetchQuestions() {
    /**
     * @type {string}
    */
    const url = $settingsUrl;
    const data = await getData(url);
    if (data && data.length > 0) {
      questions.set(data);
    }
  }

  function answerQuestion() {
    /**
     * @type {object}
     */
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
      screenData.set({ score, total: $questions.length, username });
      currentScreen.set("result");
    }
  }

  function resetTimer() {
    clearInterval(timer);
    timeLeft = 45;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        answerQuestion();
      }
    }, 1000);
  }

  function saveGameData() {
    /**
     * @type {object}
     */
    const gameData = {
      username,
      score,
      total: $questions.length,
      date: new Date().toISOString(),
    };
    /**
     * @type {object[]}
     */
    let storedData = JSON.parse(localStorage.getItem("gameData")) || [];
    storedData.push(gameData);
    /**
     * @type {object[]}
     */
    const recentTop10 = storedData.reverse().slice(0, 10);
    localStorage.setItem("gameData", JSON.stringify(recentTop10));
  }

  onMount(() => {
    fetchQuestions();
    resetTimer();
  });

  /**
   * 
   * @param {string}
   * @returns {string}
   */
  function decodeHtml(html) {
    /**
     * @type {HTMLElement}
     */
    const text = document.createElement("textarea");
    text.innerHTML = html;
    return text.value;
  }
</script>

<section class="flex flex-col h-fit min-h-screen bg-transparent gap-5 px-[25px] pb-10">
  <HeaderScreen
    text="Question {currentQuestionIndex + 1}/"
    className="text-[16px]"
    showSpan={true}
    textSpan={$questions.length}/>

  {#if $questions.length > 0}
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
      <p class="text-purple md:order-2">
        Your current score <span
        class="text-[1.2rem] font-[700] text-lightestPurple">{score}</span> of {$questions.length}</p>
      <div class="w-full md:w-1/2 border-2 border-white rounded-[1.25rem] h-[2.5rem] relative">
        <div class="bg-lightPurple rounded-[1.25rem] h-[2.25rem]" style="width: {progressBarWidth}%;"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          class="absolute right-5 bottom-1.5">
          <path
            d="M12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V13C11.25 13.4142 11.5858 13.75 12 13.75H16C16.4142 13.75 16.75 13.4142 16.75 13C16.75 12.5858 16.4142 12.25 16 12.25H12.75V7Z"
            fill="white"/>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12Z"
            fill="white"/>
        </svg>
      </div>
    </div>
    <div class="flex flex-col md:items-center md:pt-10 gap-5 md:gap-10">
      <p>{decodeHtml($questions[currentQuestionIndex].question)}</p>
      <div class="flex flex-col gap-[1.38rem] md:grid md:grid-cols-2 md:w-2/3">
        {#each [...$questions[currentQuestionIndex].incorrect_answers, $questions[currentQuestionIndex].correct_answer].sort() as choice}
          <label class="bg-purple text-darkPurple h-[4rem] rounded-[10px] p-5">
            <input
              type="radio"
              name="answer"
              bind:group={selectedAnswer}
              value={choice}/>
            {decodeHtml(choice)}
          </label>
        {/each}
      </div>
      <ButtonPrimary onClick={answerQuestion} text="next" />
    </div>
  {:else}
    <p>reload page</p>
  {/if}
</section>
<FooterDesktop />
