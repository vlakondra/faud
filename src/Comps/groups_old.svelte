<script context="module">
    const _expansionState = {};
</script>

<script>
    // import iniData from "./store.js";
    import Item from "./group.svelte";
    import { slide, fade } from "svelte/transition";

    export let state_drawer;

    //const [error, data] = iniData();

    // console.log("ini", error, data);

    let names = { 0: "FormEduName", 1: "Curs", 2: "GSName" };
    export let lev = 0;
    export let nodes;
    export let name;

    let exp = _expansionState[name] || false;
    function toggle() {
        for (const key in _expansionState) {
            if (_expansionState[key]) {
                _expansionState[key] = false;
            }
        }

        exp = _expansionState[name] = !exp;

        console.log("_expansionState", _expansionState);
    }
</script>

<ul transition:slide={{ duration: 300 }}>
    <li>
        {#if nodes}
            {#if name == "Выберите группу"}
                <span on:click={toggle}> {exp ? "+" : "-"} {name} </span>
            {:else}
                <span on:click={toggle}>
                    {exp ? "-" : "+"}
                    {name}
                    {lev + 1 == 2 ? " форма" : ""}
                    {lev + 1 == 3 ? " курс" : ""}</span
                >
            {/if}

            {#if !exp && lev == 0}
                {#each nodes as obj}
                    <svelte:self
                        name={obj[names[lev]]}
                        nodes={obj.arr}
                        lev={lev + 1}
                    />
                {/each}
            {:else if exp && lev > 0}
                {#each nodes as obj}
                    <svelte:self
                        name={obj[names[lev]]}
                        nodes={obj.arr}
                        lev={lev + 1}
                    />
                {/each}
            {/if}
        {:else}
            <Item item={name} />
        {/if}
    </li>
</ul>

<style>
    span {
        padding: 0 0 0 0.5em;
        /*background-size: 0.1em 0.1em;*/
        font-weight: bold;
        font-weight: 100;
        cursor: pointer;
    }

    ul {
        padding: 0.2em 0 0 0.5em;
        margin: 0 0 0 0.5em;
        list-style: none;
    }

    ul:not(:first-child) {
        border-left: 1px solid #eee;
    }

    li {
        padding: 0.2em 0;
    }
</style>
