<script>
    import { Accordion, AccordionItem } from "svelte-collapsible";
    import {
        selectedDate,
        selectedPair,
        ini_data,
        busyAuds,
        err_sched_data,
        load_ini_data,
        accordKey,
    } from "./store";

    import Fa from "svelte-fa";
    import {
        faBold,
        faCaretDown,
        faCaretUp,
    } from "@fortawesome/free-solid-svg-icons";

    export let clwidth;

    const duration = 0.35; // seconds
    const easing = "linear";

    let key = $accordKey;
    accordKey.subscribe((v) => {
        //https://thoughtspile.github.io/2023/04/22/svelte-stores/
        key = v;
    });

    let currPair = null; //$ini_data.Pairs.filter((p) => p.Pair_ID == $selectedPair)[0];

    selectedPair.subscribe((v) => {
        currPair = $ini_data.Pairs.filter((p) => p.Pair_ID == v)[0];
    });

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
</script>

{#if !$load_ini_data}
    {#if $ini_data.Buildings}
        <div class="audcontainer">
            <div class="info">
                <div>
                    {new Date(
                        $selectedDate.split(".")[2],
                        $selectedDate.split(".")[1] - 1,
                        $selectedDate.split(".")[0],
                    ).toLocaleDateString("ru-RU", options)}
                </div>
                <div style="display: flex;flex-direction: row;">
                    <div>
                        {currPair.PairNumb} пара,
                    </div>
                    <div>{currPair.TimeStart} - {currPair.TimeEnd}</div>
                </div>
            </div>

            {#if $busyAuds.Buildings}
                <Accordion bind:key {duration} {easing}>
                    {#each $busyAuds.Buildings as bld}
                        <AccordionItem key={bld.Building_ID}>
                            <h2 slot="header" class="subtitle is-6 header">
                                <div style="display:flex;">
                                    <div class="caret">
                                        <Fa
                                            icon={bld.Building_ID == key
                                                ? faCaretUp
                                                : faCaretDown}
                                            color="yellow"
                                            size="1.5x"
                                        />
                                    </div>
                                    <div
                                        style="margin-left: 5px;margin-top: 2px;"
                                    >
                                        {bld.BuildingName}
                                    </div>
                                </div>
                                <div>
                                    Занято {bld.busyCnt} из {$ini_data.Buildings.filter(
                                        (b) => b.Building_ID == bld.Building_ID,
                                    )[0].Auds.length}
                                </div>
                            </h2>
                            <div slot="body">
                                {#if bld.busyCnt > 0}
                                    <table
                                        class="table is-bordered is-hoverable is-striped is-narrow is-fullwidth"
                                    >
                                        <tbody>
                                            <tr>
                                                {#if clwidth < 500}
                                                    <th>Ауд-ия</th>
                                                    <th>Преп-ль</th>
                                                    <th>Группы</th>
                                                {:else}
                                                    <th>Аудитория</th>
                                                    <th>Преподаватель</th>
                                                    <th>Группы</th>
                                                {/if}
                                            </tr>

                                            {#each bld.Auds as aud}
                                                {#if aud.TimeStart}
                                                    <tr>
                                                        <td>
                                                            {aud.Aud}
                                                        </td>
                                                        <td>
                                                            {aud.EmpFIO}
                                                        </td>
                                                        <td>
                                                            {#each aud.GSName.split(",") as grp}
                                                                <div>{grp}</div>
                                                            {/each}
                                                        </td>
                                                    </tr>
                                                {/if}
                                            {/each}
                                        </tbody>
                                    </table>
                                {:else}
                                    <p>Все аудитории свободны</p>
                                {/if}
                            </div>
                        </AccordionItem>
                    {/each}
                </Accordion>
            {/if}
        </div>
    {/if}
{/if}

<style>
    .audcontainer {
        margin: auto;
        margin-top: -10px;
        max-width: 600px;
    }

    :global(.accordion-item-header) {
        width: 100%;
        padding: 0;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ff9393;
        line-height: 2em;
        width: 100%;
        padding: 0 5px;
        /* max-width: 600px; */
        text-align: left;
    }
    .caret {
        margin-top: 5px;
    }
    tr th {
        font-size: 0.8em;
    }
    .info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-bottom: 10px;
        font-weight: 600;
        color: #2e5c2d;
        letter-spacing: 1px;
        font-size: 0.75em;
    }
</style>
