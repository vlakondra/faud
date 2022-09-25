<script>
    //https://www.appypie.com/design/image-color-picker/
    import { scheddata, sched_data_loaded } from "./store";
    import { timepairs, isToday, toEnDate } from "./utils.js";
    import Noschedule from "./noschedule.svelte";

    import { fade } from "svelte/transition";

    let shows = Array(2).fill(true); //  Array($scheddata.length).fill(true);

    const PairCount = (daysArr) => {
        //считает кол-во пар в мес.
        let pcount = 0;
        daysArr.forEach((day) => {
            pcount += day["mainSchedule"].length;
        });
        return pcount;
    };

    let startCol = 1;

    const PairItem = (sch, ptime) => {
        return sch.find((e) => e.TimeStart == ptime);
    };
</script>

{#if Object.keys($scheddata).length}
    <div class="pair-wrapper">
        {#each $scheddata.Month as month, m}
            <div
                on:click={() => (shows[m] = !shows[m])}
                style="grid-column: 1 / 10;"
                class="month"
            >
                <span> {month.Name}</span>
                <span
                    >Всего пар: {PairCount(month.Sched)}; дней: {month.Sched
                        .length}</span
                >
            </div>

            {#if shows[m]}
                <div style="grid-column: 1 / 2}; " class="timepairs" />

                {#each Object.entries(timepairs) as [n_pair, time], n}
                    <div
                        style="grid-column: {parseInt(n_pair) + 1} / {parseInt(
                            n_pair
                        ) + 2};"
                        class="timepairs"
                    >
                        {time}
                    </div>
                {/each}

                {#each month.Sched as day, d}
                    <div
                        id={toEnDate(day.datePair)}
                        style="grid-column: {startCol} / {startCol + 1};"
                        in:fade={{ duration: 500 }}
                        out:fade
                        class="first-ceil {day.dayWeek == 'Суббота'
                            ? 'sbt'
                            : 'date-pair'}   {isToday(day.datePair)
                            ? 'today'
                            : ''}"
                    >
                        {#if isToday(day.datePair)}
                            <div class="today-lbl">Сегодня</div>
                        {/if}

                        <div>
                            {day.datePair}
                        </div>
                        <div>
                            {day.dayWeek}
                        </div>
                    </div>

                    {#each Object.entries(timepairs) as [n_pair, time]}
                        <div
                            style="grid-column: {parseInt(n_pair) +
                                1} / {parseInt(n_pair) + 2}"
                            in:fade={{ duration: 1000 }}
                            out:fade
                            class="pair-ceil"
                        >
                            {#if day.mainSchedule.findIndex((el) => el.TimeStart == time) == -1}
                                {""}
                            {:else}
                                <div
                                    title={PairItem(day.mainSchedule, time)
                                        .TimeStart +
                                        " - " +
                                        n_pair +
                                        " пара: " +
                                        PairItem(day.mainSchedule, time).SubjSN}
                                    class="pair-detail"
                                >
                                    <div class="subj">
                                        {PairItem(day.mainSchedule, time)
                                            .SubjSN}
                                    </div>
                                    <div class="aud-fio-wrapp">
                                        <div class="aud-wrapper">
                                            <div class="aud">
                                                {PairItem(
                                                    day.mainSchedule,
                                                    time
                                                ).Aud}
                                            </div>
                                            <div class="kind-load">
                                                {PairItem(
                                                    day.mainSchedule,
                                                    time
                                                ).LoadKindSN}
                                            </div>
                                        </div>

                                        <div class="groups">
                                            {PairItem(day.mainSchedule, time)
                                                .FIO}
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    {/each}
                {/each}
            {/if}
        {/each}
    </div>
{:else if $sched_data_loaded}
    <Noschedule />
{/if}

<style>
    .sbt {
        background-color: rgb(246 95 95) !important;
        color: whitesmoke;
        text-align: center;
    }
    .today {
        font-size: 1.15em;
        background-color: #97cfd0 !important;
    }
    .today-lbl {
        color: #fff;
        font-weight: 600;
        letter-spacing: 1px;
    }

    .month span:first-child {
        margin-left: 20px;
    }
    .date-pair {
        background-color: #7bdc7f;
        text-align: center;
    }
    .pair-wrapper {
        display: grid;
        gap: 1px 1px;
        min-width: 860px;
        max-width: 960px;
        background-color: #8b8cab;
        grid-template-columns: auto;
        grid-template-rows: auto;
        border-top-left-radius: 0.7em;
        border-top-right-radius: 0.7em;
    }
    .timepairs {
        background-color: #7bdc7f;
        color: #225353;
        padding: 0 5px;
    }
    .first-ceil {
        padding: 5px 3px;
    }
    .pair-ceil {
        background-color: #f1fff7;
        padding: 5px;
    }

    .pair-detail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
    .aud-wrapper {
        margin: 5px 0;
        height: 40px;
    }
    .aud {
        text-align: right;
        font-size: 0.9em;
        font-weight: 400;
    }
    .subj {
        /* font-family: "Roboto"; */
        font-family: "Montserrat";
        font-weight: normal;
        color: rgb(5 19 19);
        font-size: 0.85em;
        line-height: 1em;
        /* height: 70px; */

        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        /* text-overflow: ellipsis; */
        /* white-space: nowrap; */
        /* width: 180px; */
    }
    .kind-load {
        text-align: right;
        line-height: 1em;
        font-size: 0.8em;
        font-weight: 400;
    }
    .groups {
        background-color: #d2c0fa;
        color: #071919 !important;
        font-size: 0.75em;
        border-radius: 0.4em;
        word-break: break-all;
        padding: 0 3px;
        min-height: 37px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
