<script>
  /**
   * @type {string}
   */
  export let text = "Click";
  /**
   * @type {function}
   */
  export let onClick = () => {};
  /**
   * @type {string}
   */
  export let className = "";
</script>

<button
  on:click={onClick}
  class="w-full bg-darkPurple py-[0.93rem] text-lightestPurple border border-white rounded-[0.3125rem] {className}  uppercase">
  {text}
</button>
