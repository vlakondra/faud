<script src="./test.js">
  // import { qwe } from "./test.js";

  import viteLogo from "/vite.svg";
  import svelteLogo from "./assets/svelte.svg";
  import Counter from "./lib/Counter.svelte";
  //import "./assets/index.css"; //"@fontsource/roboto";
  export let prp;
</script>

<main class="kv-container ">
  <div>
    {prp}

    <p class="one">
      Это просто текст в несколько строк. Это просто текст в несколько строк
    </p>
    <p class="two">
      Это просто текст в несколько строк. Это просто текст в несколько строк
    </p>
    <p class="three">
      Это просто текст в несколько строк. Это просто текст в несколько строк
    </p>
    <p class="four">
      Это просто текст в несколько строк. Это просто текст в несколько строк
    </p>
    <a href="https://vitejs.dev" target="_blank"
      ><img src={viteLogo} class="logo" alt="Vite Logo" /></a
    ><a href="https://svelte.dev" target="_blank"
      ><img src={svelteLogo} class="logo svelte" alt="Svelte Logo" /></a
    >
  </div>
  <div class="card box">Vite+Svelte 12345</div>
  <p class="message">789.567 test 678 проверка</p>
  <h1>H1 123 ПРОверка</h1>
  <div class="card"><Counter {prp} /></div>
  <button class="button is-info">Клавиша</button>
</main>

<style lang="scss">
  .card,
  .message {
    width: 200px;
    background-color: $colora;
    color: $yellow;
    margin: 30px;
    filter: drop-shadow(0 0 2em #faf9f8aa);
  }

  .one {
    font-weight: 100;
  }

  .two {
    font-weight: 400;
  }

  .three {
    font-weight: 500;
  }

  .four {
    font-weight: 900;
  }

  .one,
  .two,
  .three,
  .four {
    width: 200px;
  }

  // main {
  //   // font-family: $family-sans-serif;
  //   font-weight: 400;
  //   font-size: 1.2em;
  // }
  main.kv-container {
    // font-family: Roboto;
    max-width: 960px !important;
    font-weight: 400;
    font-size: 1.2em;
    background-color: darken($colord, 50);
    color: $colord;
    height: 100vh;
  }

  h1 {
    // font-family: "Roboto";
    font-weight: 100;
    background-color: $colorb;
    color: $yellow;
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
</style>
