<script lang="javascript">
  // @ts-nocheck

  //https://www.npmjs.com/package/svelte-accessible-accordion

  import { setContext } from "svelte";
  import { fade } from "svelte/transition";
  import {
    selectedDate,
    selectedPair,
    busyAuds,
    client_width,
    ini_data,
    err_sched_data,
    load_ini_data,
  } from "./Comps/store";

  import Period from "./Comps/period.svelte";
  import Pairs from "./Comps/pairs.svelte";
  import Auds from "./Comps/auds.svelte";

  // import Schedule from "./Comps/schedule.svelte";
  // import ShahSched from "./Comps/shahsched.svelte";
  import Errschedule from "./Comps/errschedule.svelte";

  import StartMessage from "./Comps/startmessage.svelte";

  import Drawer from "svelte-drawer-component";
  // import ViewFormat from "./Comps/viewformat.svelte";
  // import ResizeObserver from "svelte-resize-observer";
  // import DeviceDetector from "svelte-device-detector";
  // import Groups from "./Comps/groups.svelte";
  // import ToExcel from "./Comps/toexcel.svelte";
  import Header from "./Comps/header.svelte";
  import Progbar from "./Comps/prgbar.svelte";
  // import ExcelTable from "./Comps/exceltable.svelte";

  import Fa from "svelte-fa";
  import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

  let openDrawer = false;
  const TurnDrawer = () => {
    openDrawer = !openDrawer;
  };

  setContext("turn_drawer", { TurnDrawer });

  let showtable = true;
  const ToggleSwitch = (/** @type {boolean} */ frm) => {
    showtable = frm;
  };

  let scrolly = 5;
  const scrollToTop = () => {
    let hdr = document.getElementById("header");
    if (hdr) {
      hdr.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };

  // let w;
</script>

<svelte:window bind:scrollY={scrolly} />

<svelte:head>
  <title>Занятость аудиторий</title>
</svelte:head>

<Progbar />
<main class="kv-container">
  <!-- <ResizeObserver
    on:resize={(e) => {
      w = e.detail.clientWidth;
      client_width.update(() => w);
    }}
  /> -->

  {#if scrolly > 100}
    <div transition:fade on:click={scrollToTop} class="totop-box">
      <Fa icon={faArrowCircleUp} color="#6565ed" size="2.5x" />
    </div>
  {/if}

  <Header onBurgerClick={TurnDrawer} />

  <Drawer
    open={openDrawer}
    on:clickAway={() => (openDrawer = false)}
    size="null"
  >
    <div class="notification">
      <button on:click={() => (openDrawer = false)} class="delete is-medium" />

      {#if $load_ini_data == false}
        <div class="groups-wrapper">
          <Period />
        </div>
        <div>
          <Pairs />
        </div>
      {/if}
    </div>
  </Drawer>

  {#if !$selectedPair || !$selectedDate}
    <StartMessage openDrawer={TurnDrawer} />
  {:else}
    <Auds />
  {/if}

  {#if $err_sched_data}
    <!-- <div> -->
    <Errschedule errmessage={$err_sched_data} />
    <!-- </div> -->
  {:else if showtable}
    <p></p>
  {:else}
    <p></p>
  {/if}
</main>

<style lang="scss">
  // :global(body) {
  //   background-image: url("/bg.jpg"); -> см. minireset.sass
  // }

  :global(.month) {
    cursor: pointer;
    padding: 5px 7px;
    background-color: #e67f7f;
    // background-color: #45a6d6;
    color: #eef9f9;
    border-bottom: 1px solid rgb(195, 195, 251);
    font-style: oblique;
    letter-spacing: 2px;
    font-size: 1.1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  .totop-box {
    position: fixed;
    left: 80%;
    top: 80%;
    cursor: pointer;
    z-index: 99999;
  }
  main.kv-container {
    background-color: aliceblue;
    max-width: 960px !important;
    font-weight: 400;
    font-size: 1em;
    min-height: 100vh;
    margin-bottom: 30px;
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
    background-color: #9cc87d;
    color: white;
  }

  :global(.gsnodes.open) {
    //margin-left: 0px;
    opacity: 1;
    font-size: 1em;
    max-height: 900px;
    overflow: hidden;
    transition: 0.15s ease all;
  }
  :global(.group-hover) {
    background-color: #9b8fd1;
    color: #fff;
    border-radius: 5px;
  }

  :global(.gsnodes.hide) {
    opacity: 0;
    font-size: 0em;
    overflow: hidden;
    max-height: 0em;

    transition: 0.125s ease all;
  }

  :global(.minus)::before {
    content: "\2212";
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
  .groups-wrapper {
    max-height: 450px;
    overflow-y: auto;
  }
</style>
