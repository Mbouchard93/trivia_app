<script>
  import { currentScreen } from "$lib/store";
  import ButtonPrimary from "../../compoment/button-primary.svelte";
  import FooterDesktop from "../../compoment/footer-desktop.svelte";
  import HeaderScreen from "../../compoment/header-screen.svelte";
  /**
   * @type {object[]}
   * @property {string} username 
   * @property {number} total 
   * @property {number} score 
   * @property {string} date .
   */
  const usersData = JSON.parse(localStorage.getItem("gameData")) || [];
  
  const users = usersData.map((user) => ({
    username: user.username,
    total: (user.score * 100) / user.total,
    score: user.score,
    date: new Date(user.date).toLocaleDateString(),
  }));
</script>

<section class="flex flex-col h-fit min-h-screen bg-transparent gap-5 px-[25px] pb-10">
  <HeaderScreen className="uppercase" text="best score" />
  <div class=" flex flex-col w-full items-center gap-6 md:pt-5">
    <ul class="grid grid-cols-3 gap-4 uppercase bg-purple border-2 p-4 justify-items-center md:w-[27.1875rem]">
      <li class="font-bold text-[#2F084D]">Players</li>
      <li class="font-bold text-[#2F084D]">Score</li>
      <li class="font-bold text-[#2F084D]">Date</li>
      {#each users as user}
        <li class="text-lightPurple">{user.username}</li>
        <li class="text-lightPurple">{user.total}%</li>
        <li class="text-lightPurple">{user.date}</li>
      {/each}
    </ul>
    <div class="md:w-[27.1875rem] w-full">
      <ButtonPrimary onClick={() => currentScreen.set("home")} text="Play" />
    </div>
  </div>
</section>
<FooterDesktop />
