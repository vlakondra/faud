<!-- <script context="module">
    const _expState = {};
</script> -->
<script>
    // @ts-nocheck

    //https://andybeckmann.com/blog/animating-height-with-javascript
    import Item from "./group.svelte";

    export let lev = 0;
    export let nodes; //groups;
    export let name;

    let names = { 0: "FormEduName", 1: "Curs", 2: "GSName" };
    let curr_ul;

    let is_closed = true;

    /**
     * @param {{ target: Element; }} e
     */
    function toggle(e) {
        e.target.classList.toggle("minus");
        e.target.classList.toggle("plus");

        is_closed = !is_closed;
        if (curr_ul.classList.contains("open")) {
            curr_ul.classList.toggle("hide");
            curr_ul.classList.remove("open");
            is_closed = true;
            return;
        }
        let uls = document.querySelectorAll(".gsnodes"); //document.getElementsByClassName("gsnodes"); //query!!

        for (let ul of uls) {
            if (ul.classList.contains("open")) {
                if (lev == ul.dataset.level) {
                    ul.classList.toggle("hide");
                    ul.classList.remove("open");
                }
            }
            if (
                ul.parentNode.children[0] != e.target &&
                ul.parentNode.children[0].dataset.level ===
                    e.target.dataset.level
            ) {
                if (ul.parentNode.children[0].classList.contains("minus")) {
                    ul.parentNode.children[0].classList.toggle("minus");
                    ul.parentNode.children[0].classList.toggle("plus");
                }
            }
        }

        curr_ul.classList.toggle("hide");
        curr_ul.classList.add("open");
        is_closed = false;
    }
</script>

<!-- {#if name != "выбор группы1"} -->
<span
    class={lev == 0 ? "minus" : lev >= 1 ? "plus" : ""}
    data-level={lev}
    on:click={toggle}
>
    {name}
    {lev + 1 == 2 ? " форма" : ""}
    {lev + 1 == 3 ? " курс" : ""}
</span>
<!-- {/if} -->

<ul
    class={lev == 1 || lev == 2 ? "gsnodes hide" : "gsnodes"}
    data-level={lev}
    bind:this={curr_ul}
>
    {#each nodes as obj}
        <li>
            {#if obj.arr}
                <svelte:self
                    name={obj[names[lev]]}
                    nodes={obj.arr}
                    lev={lev + 1}
                />
            {:else}
                <!-- <Item item={obj[names[lev]]} /> -->
                <Item item={obj} />
            {/if}
        </li>
    {/each}
</ul>

<style>
    span {
        padding: 0 0 0 0.5em;
        /*background: url(/tutorial/icons/folder.svg) 0 0.1em no-repeat;
		background-size: 0.1em 0.1em;*/
        /* font-weight: bold; */
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
