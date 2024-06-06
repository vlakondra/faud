<script>
    import { Accordion, AccordionItem } from "svelte-collapsible";
    import {
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

    const duration = 0.25; // seconds
    const easing = "linear";

    let key = $accordKey;
    accordKey.subscribe((v) => {
        //https://thoughtspile.github.io/2023/04/22/svelte-stores/
        key = v;
    });

    const onHeaderClick = (k) => {
        console.log(key, k);
    };
</script>

{#if !$load_ini_data}
    {#if $ini_data.Buildings}
        {#each $ini_data.Buildings as bld}
            <div class="building">
                <p>{key}</p>
                <div>{bld.BuildingName}</div>
                <div>{bld.Auds.length}</div>
            </div>
        {/each}

        <div style="margin:auto;width:600px">
            {#if $busyAuds.Buildings}
                <Accordion bind:key {duration} {easing}>
                    {#each $busyAuds.Buildings as bld}
                        <AccordionItem key={bld.Building_ID}>
                            <h2
                                slot="header"
                                on:click={() =>
                                    onHeaderClick({ k: bld.Building_ID })}
                                class="subtitle is-5 header"
                            >
                                <div
                                    style="display:flex;justify-content: space-between;"
                                >
                                    <div style="display:flex;">
                                        <Fa
                                            icon={bld.Building_ID == key
                                                ? faCaretUp
                                                : faCaretDown}
                                            color="#6565ed"
                                            size="1.5x"
                                        />

                                        <div>
                                            {bld.BuildingName}
                                        </div>
                                    </div>
                                    <div>
                                        Занято {bld.busyCnt} аудиторий из {bld
                                            .Auds.length}
                                    </div>
                                </div>
                            </h2>
                            <div slot="body">
                                {#if bld.busyCnt > 0}
                                    {#each bld.Auds as aud}
                                        {#if aud.TimeStart}
                                            <div class="audrow">
                                                <div style="width:25%">
                                                    {aud.EmpFIO}
                                                </div>
                                                <!-- <div style="width:40%">
                                                {aud.SubjName}
                                            </div> -->
                                                <div style="width:20%">
                                                    {aud.GSName}
                                                </div>
                                                <div style="width:15%">
                                                    {aud.Aud}
                                                </div>
                                            </div>
                                        {/if}
                                    {/each}
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
    .building {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 200px;
        margin: auto;
    }
    .audrow {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: nowrap;
        gap: 10px 10px;
        width: 700px;
    }
    .header {
        background-color: #e67f7f;
        width: 600px;
        text-align: left;
    }
</style>
