<script>
  import { screenData, currentScreen } from "$lib/store";
  import ButtonPrimary from "../../compoment/button-primary.svelte";
  let score, total , img , text, username


  screenData.subscribe(data => {
    console.log(data)
    score = data.score;
    total = data.total;
    username = data.username;
  });
  let percentageScore = (score * 100) / total

function winOrLoose () {
  if(percentageScore >= 60){
      img = '/win.svg'
      text = `Congratulations ${username}, you’ve completed this quiz`
    }else{
      img = '/loose.svg'
      text = `you lost ${username}, you will do better next time`
    }
}  
  

  function goHome() {
    currentScreen.set("home");
  }

winOrLoose()

</script>
<section class="flex flex-col h-screen justify-around px-[25px] ">
  <header class="flex flex-col">
    <div class="flex justify-between pb-4">
      <h2 class="place-content-end text-[20px]">result</h2>
      <img class="place-self-end " src="/triviascreen.png" alt="">
    </div>
    <svg  xmlns="http://www.w3.org/2000/svg"  width="325" height="2" viewBox="0 0 377 2" fill="none">
      <path d="M0 1H376.5" stroke="#C098DF" stroke-width="0.8" stroke-dasharray="6 6"/>
    </svg>
  </header>
  <div>
<p class=" bg-lightPurple text-lightestPurple p-3 rounded-t-[0.625rem] mx-3 ">Correct answer : {score} / {total}</p>
<div class="bg-purple rounded-[0.625rem] flex flex-col gap-6 p-8 items-center">
<img src={img} class="h-[8.87169rem] w-[9.86575rem] " alt="">
<p class="text-center">{text}</p>
<p class="bg-lightPurple text-lightestPurple text-center w-[198px] rounded-[0.625rem] text-[60px]"  >{percentageScore}%</p>
</div>
</div>
<ButtonPrimary onClick={goHome} text="try again" />
</section>