<script>
    export let text = "Click"; 
    export let onClick = () => {}; 
    export let className = ""
  </script>
  
  <button on:click={onClick} class="w-full bg-darkPurple text-lightestPurple py-[0.93rem] border border-white rounded-[0.3125rem]  {className}  uppercase">
    {text}
  </button>