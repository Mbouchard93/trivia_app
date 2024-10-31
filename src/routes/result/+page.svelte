<script>
  import { screenData, currentScreen } from "$lib/store";
  import ButtonPrimary from "../../compoment/button-primary.svelte";
  import FooterDesktop from "../../compoment/footer-desktop.svelte";
  import HeaderScreen from "../../compoment/header-screen.svelte";
  /**
   * @type {number}
   */
  let score = 0
  /**
   * @type {number}
  */
  let total = 0
  /**
   * @type {string}
   */
  let img = ''
  /**
   * @type {string}
   */
  let text = ''
  /**
   * @type {string}
   */
  let username = ''

  screenData.subscribe((data) => {
    score = data.score;
    total = data.total;
    username = data.username;
  });
  /**
   * @type {number}
   */
  const percentageScore = (score * 100) / total;

  function winOrLoose() {
    if (percentageScore >= 60) {
      img = "/win.svg";
      text = `Congratulations ${username}, you’ve completed this quiz`;
    } else {
      img = "/loose.svg";
      text = `you lost ${username}, you will do better next time`;
    }
  }

  function goHome() {
    currentScreen.set("home");
  }

  winOrLoose();
</script>

<section class="flex flex-col justify-around f h-fit min-h-screen bg-transparent px-[25px] pb-10">
  <HeaderScreen text="result" />
  <div class=" flex flex-col items-center w-full gap-6">
    <div class="w-[350px]">
      <p class=" bg-lightPurple text-lightestPurple p-3 rounded-t-[0.625rem] mx-3">
        Correct answer : {score} / {total} </p>
      <div class="bg-purple rounded-[0.625rem] flex flex-col gap-6 p-8 items-center">
        <img src={img} class="h-[8.87169rem] w-[9.86575rem]" alt="" />
        <p class="text-center">{text}</p>
        <p class="bg-lightPurple text-lightestPurple text-center w-[198px] rounded-[0.625rem] text-[60px]">
          {percentageScore}%
        </p>
      </div>
    </div>
    <ButtonPrimary
      className="w-[350px]"
      onClick={goHome}
      text="try again"
      showIcon={true}/>
  </div>
</section>
<FooterDesktop />
