<script lang="javascript">
  // import viteLogo from "/vite.svg";
  // import svelteLogo from "./assets/svelte.svg";
  import Header from "./Comps/header.svelte";
</script>

<main class="kv-container ">
  <Header onBurgerClick={null} />
</main>

<style lang="scss">
  main.kv-container {
    max-width: 960px !important;
    font-weight: 400;
    font-size: 1em;
    min-height: 100vh;
  }
</style>
