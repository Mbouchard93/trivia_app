<script>
  /**
   * @type {string}
   */
  export let text = "pageName";
  /**
   * @type {number}
   */
  export let textSpan = 0;
  /**
   * @type {string}
   */
  export let className = "";
  /**
   * @type {boolean}
   */
  export let showSpan = false;
</script>

<header class="flex flex-col">
  <div class="flex justify-between pb-4">
    <h2 class="place-content-end text-[20px]">
      {text}
      {#if showSpan}
        <span class={className}>{textSpan}</span>
      {/if}
    </h2>
    <img class="place-self-end" src="/triviascreen.png" alt="" />
  </div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="325"
    height="2"
    viewBox="0 0 377 2"
    fill="none">
    <path
      d="M0 1H376.5"
      stroke="#C098DF"
      stroke-width="0.8"
      stroke-dasharray="6 6"/>
  </svg>
</header>
