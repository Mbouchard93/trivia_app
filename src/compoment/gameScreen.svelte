<script>
    import { onMount } from "svelte";
    import { settingsUrl, screenData, currentScreen } from "$lib/store";
    import { getData } from "$lib/api";
    import { writable } from "svelte/store";
  
    let questions = writable([]);
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60;
    let timer;
  
  
    async function fetchQuestions() {
    const url = $settingsUrl; 
    const data = await getData(url);
    if (data && data.length > 0) {
        questions.set(data);
    }
  }
  

    function answerQuestion(choice) {
      const currentQuestion = $questions[currentQuestionIndex];
      if (choice === currentQuestion.correct_answer) {
        score++;
      }
      updateQuestion();
    }
  

    function updateQuestion() {
      if (currentQuestionIndex < $questions.length - 1) {
        currentQuestionIndex++;
        resetTimer();
      } else {
        clearInterval(timer);
        screenData.set({ score, total: $questions.length });
        currentScreen.set("resultScreen");
      }
    }
  

    function resetTimer() {
      clearInterval(timer);
      timeLeft = 60;
      timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
        } else {
          updateQuestion();
        }
      }, 1000);
    }
  

    onMount(() => {
      fetchQuestions();
      resetTimer();
    });
  </script>
    <div class="grid h-fit gap-6">
      <div class="grid grid-cols-2 h-fit ">
    <h2 class=" place-content-end ">Question {currentQuestionIndex + 1} / {$questions.length}</h2>
    <img class="place-self-end" src="/triviascreen.png" alt="">
    </div>
    <svg  xmlns="http://www.w3.org/2000/svg" width="377" height="2" viewBox="0 0 377 2" fill="none">
      <path d="M0 1H376.5" stroke="#C098DF" stroke-width="0.8" stroke-dasharray="6 6"/>
    </svg>
    </div>
  {#if $questions.length > 0}
    <p>Your current score {score} of {$questions.length}</p>
    <p>{$questions[currentQuestionIndex].question}</p>
    <p>Votre score actuel: {score} sur {$questions.length}</p>
    <p>Temps restant: {timeLeft} secondes</p>
    <progress value={timeLeft} max="60"></progress>
    
    <div>
      <select on:change={(event) => answerQuestion(event.target.value)}>
        {#each [...$questions[currentQuestionIndex].incorrect_answers, $questions[currentQuestionIndex].correct_answer] as choice}
          <option value="{choice}">{choice}</option>
        {/each}
      </select>  
    </div>    
  {:else}
    <p>Chargement des questions...</p>
  {/if}
  