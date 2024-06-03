<script>
    import { Accordion, AccordionItem } from "svelte-collapsible";
    import { ini_data, busyAuds, err_sched_data, load_ini_data } from "./store";

    import Fa from "svelte-fa";
    import {
        faBold,
        faCaretDown,
        faCaretUp,
    } from "@fortawesome/free-solid-svg-icons";

    const duration = 0.25; // seconds
    const easing = "linear";
    let key = "a";

    const onHeaderClick = (k) => {
        console.log(key, k);
    };
</script>

{#if !$load_ini_data}
    {#if $ini_data.Buildings}
        {#each $ini_data.Buildings as bld}
            <div class="building">
                <div>{bld.BuildingName}</div>
                <div>{bld.Auds.length}</div>
            </div>
        {/each}

        <div style="margin:auto;width:600px">
            {#if $busyAuds.Buildings}
                <!-- content here -->

                <Accordion bind:key {duration} {easing}>
                    {#each $busyAuds.Buildings as bld}
                        <AccordionItem key={bld.Building_ID}>
                            <h2
                                slot="header"
                                on:click={() =>
                                    onHeaderClick({ k: bld.Building_ID })}
                                class="subtitle is-5 header"
                            >
                                <Fa
                                    icon={faCaretDown}
                                    color="#6565ed"
                                    size="0.75x"
                                />
                                {bld.BuildingName}
                            </h2>
                            <div slot="body">
                                {#each bld.Auds as aud}
                                    <!-- content here -->
                                    {#if aud.TimeStart}
                                        <div class="audrow">
                                            <div style="width:25%">
                                                {aud.EmpFIO}
                                            </div>
                                            <div style="width:40%">
                                                {aud.SubjName}
                                            </div>
                                            <div style="width:20%">
                                                {aud.GSName}
                                            </div>
                                            <div style="width:15%">
                                                {aud.Aud}
                                            </div>
                                        </div>
                                    {/if}
                                {/each}
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
