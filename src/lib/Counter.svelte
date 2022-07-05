<script>
  let count = 0;
  const increment = () => {
    count += 1;
  };
  export let prp;
</script>

<button on:click={increment}>
  {prp} Счетчик: {count}
</button>
<div>проверка</div>

<style lang="scss">
  div {
    font-family: inherit;
  }
</style>
