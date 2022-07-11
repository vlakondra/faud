<script>
    import iniData from "./store.js";
    import { load_ini_data, err_ini_data, sched_data_loaded } from "./store";
    import { fade, slide } from "svelte/transition";
    import Fa from "svelte-fa";
    import { faSpinner } from "@fortawesome/free-solid-svg-icons";

    export let openDrawer;

    let curr_date = new Date();
    let date_opts = { month: "long" };
    let next_month = new Date(new Date().setMonth(new Date().getMonth() + 1));
    const [error, data] = iniData();
</script>

<!-- {#if $data.YearList}
    <h1>{"loading"}</h1>
    {#each $data.YearList as y}
        <p>{y.Year_ID}</p>
    {/each}
{/if} -->

{#if !$sched_data_loaded}
    <div class="start-message">
        {#if $load_ini_data}
            <Fa icon={faSpinner} size="3x" spin color="blue" />
        {:else if $err_ini_data}
            <div>
                <p class="err">Ошибка!</p>
                <p>
                    {$err_ini_data}
                </p>
            </div>
        {:else}
            <div transition:slide={{ duration: 1000 }} class="start-info">
                <div>Расписание</div>
                <div>
                    на {curr_date.toLocaleDateString("ru-RU", date_opts)} -
                    {next_month.toLocaleDateString("ru-RU", date_opts)}
                    <br />
                    {new Date().getFullYear()} г.
                </div>

                <button class="button select-tchr" on:click={openDrawer}>
                    Выберите группу
                </button>
            </div>
        {/if}
    </div>
{/if}

<style>
    .start-message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: 20px;
        font-weight: 400;
    }
    .start-info {
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 2em;
        color: #c9a59a; /* rgb(188 143 143 / 52%);*/
    }

    .select-tchr {
        color: rgb(0 0 255 / 63%);
        background-color: transparent;
        font-size: 0.75em;
    }
    .err {
        color: red;
        font-weight: 600;
    }
</style>
