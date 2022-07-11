<script lang="javascript">
  // import viteLogo from "/vite.svg";
  // import svelteLogo from "./assets/svelte.svg";
  import StartMessage from "./Comps/startmessage.svelte";
  import Drawer from "svelte-drawer-component";
  import Header from "./Comps/header.svelte";

  let openDrawer = false;
  const TurnDrawer = () => {
    openDrawer = !openDrawer;
  };
</script>

<main class="kv-container ">
  <Header onBurgerClick={TurnDrawer} />
  <Drawer
    open={openDrawer}
    on:clickAway={() => (openDrawer = false)}
    size="null"
  />
  <StartMessage openDrawer={TurnDrawer} />
</main>

<style lang="scss">
  // :global(body) {
  //   background-image: url("/bg.jpg"); -> см. minireset.sass
  // }
  main.kv-container {
    max-width: 960px !important;
    font-weight: 400;
    font-size: 1em;
    min-height: 100vh;
  }
  main :global(.drawer .panel) {
    transition: transform 1s ease;
    color: rgb(141, 128, 203);
  }

  @media (min-width: 500px) {
    main :global(.drawer .panel) {
      max-width: 350px !important;
    }
  }

  @media (max-width: 500px) {
    :global(.drawer .panel) {
      max-width: 80% !important;
    }
  }
</style>
