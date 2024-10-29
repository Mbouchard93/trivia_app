
<script>
    export let text = "Click"; 
    export let onClick = () => {}; 
    export let className = ""
  </script>
  
  <button on:click={onClick} class="w-full bg-lightPurple text-lightestPurple py-[0.93rem] rounded-[0.3125rem]  {className} shadow-btn-primary uppercase">
    {text}
  </button>