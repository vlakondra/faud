<script>
    import { Accordion, AccordionItem } from "svelte-collapsible";
    import { ini_data, err_sched_data, load_ini_data } from "./store";

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

        <div>
            <Accordion bind:key {duration} {easing}>
                <AccordionItem key="a">
                    <h2
                        slot="header"
                        on:click={() => onHeaderClick("a")}
                        class="subtitle is-1"
                    >
                        <Fa icon={faCaretDown} color="#6565ed" size="0.75x" />
                        Header
                    </h2>
                    <p slot="body">Body</p>
                </AccordionItem>
                <AccordionItem key="b">
                    <h2
                        slot="header"
                        on:click={() => onHeaderClick("b")}
                        class="subtitle is-3"
                    >
                        <Fa icon={faCaretUp} color="#6565ed" size="0.75x" />
                        Header
                    </h2>
                    <p slot="body">Body</p>
                </AccordionItem>
            </Accordion>
        </div>
    {/if}
{/if}

<style>
    .building {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }
</style>
