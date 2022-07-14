<script lang="javascript">
  import Fa from "svelte-fa";
  import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

  //import iniData from "./Comps/store";
  import { ini_data } from "./Comps/store";

  // import viteLogo from "/vite.svg";
  // import svelteLogo from "./assets/svelte.svg";
  import StartMessage from "./Comps/startmessage.svelte";
  import Drawer from "svelte-drawer-component";
  import Groups from "./Comps/groups.svelte";
  import Header from "./Comps/header.svelte";
  import Progbar from "./Comps/prgbar.svelte";

  let openDrawer = false;
  const TurnDrawer = () => {
    openDrawer = !openDrawer;
  };

  console.log("inidata", ini_data);
</script>

<main class="kv-container ">
  <!-- {#if $ini_data.length}
    <h1>??{"loading"}</h1>
    {#each $ini_data as y}
      <p>!!{y.FormEduName}</p>
    {/each}
  {/if} -->

  <Header onBurgerClick={TurnDrawer} />
  <Drawer
    open={openDrawer}
    on:clickAway={() => (openDrawer = false)}
    size="null"
  >
    <div class="notification">
      <button on:click={() => (openDrawer = false)} class="delete is-medium" />

      {#if $ini_data.length}
        <Groups
          name="Выберите группу"
          nodes={$ini_data}
          state_drawer={TurnDrawer}
        />
      {/if}
    </div>
  </Drawer>
  <Progbar />
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
  main :global(.drawer .panel .notification) {
    background-color: #fff;
    height: 100%;
    font-size: 0.9em;
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

  :global(.active-group) {
    background-color: #9b8fd1;
    color: white;
  }

  :global(.gsnodes.open) {
    //margin-left: 0px;
    opacity: 1;
    font-size: 1em;
    overflow: hidden;
    transition: 0.15s ease all;
  }
  :global(.group-hover) {
    background-color: #9cc87d;
    color: #fff;
    border-radius: 5px;
  }

  :global(.gsnodes.hide) {
    //display:none;
    //margin-left: -100px;
    opacity: 0;
    font-size: 0em;
    overflow: hidden;
    max-height: 0px;
    transition: 0.25s ease all;
  }

  :global(.minus)::before {
    content: "-";
    width: 15px;
    height: 15px;
    background-color: #b2b2e7;
    color: #fff;
    font-weight: 600;
    border: 1px solid #ddd;
    border-radius: 50%;
    margin: 0 3px 0 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  :global(.plus)::before {
    content: "+";
    width: 15px;
    height: 15px;
    background-color: #b2b2e7;
    color: #fff;
    border: 1px solid #ddd;
    border-radius: 50%;
    margin: 0 3px 0 0;
    display: inline-flex;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
</style>
