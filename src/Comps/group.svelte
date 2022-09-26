<script context="module">
    let sel_id;
</script>

<script>
    import {
        selected_GSName,
        curr_year_id,
        curr_month,
        getSched,
    } from "./store.js";
    import { getContext } from "svelte";

    const { TurnDrawer } = getContext("turn_drawer");

    export let item;
    let li_group;

    const onClick = () => {
        // устанавливаем активную группу
        sel_id = item.GSName; //e.target.id;
        let acts = document.getElementsByClassName("active-group");
        for (let g of acts) {
            g.classList.remove("active-group");
        }

        li_group.classList.add("active-group");

        //получаем расписание
        // console.log(
        //     "query-1 ",
        //     item.GSName,
        //     item.GS_ID,
        //     $curr_year_id,
        //     $curr_month
        // );
        selected_GSName.update(() => item.GSName);
        // getSched(26193); //!!!   //item.GS_ID); //, $curr_year_id, $curr_month);
        getSched(item.GS_ID);

        //гасим drawer
        setTimeout(() => {
            TurnDrawer();
        }, 500);
    };
    const onMouseOver = () => {
        li_group.classList.add("group-hover");
    };
    const onMouseOut = () => {
        li_group.classList.remove("group-hover");
    };

    let w; //ширина
    //https://old.ursei.su/Services/GetGsSched?grpid=26015&yearid=26&monthnum=7
</script>

<span
    class={item.GSName == sel_id ? "active-group bott-border" : "bott-border"}
    bind:this={li_group}
    on:click={onClick}
    on:mouseover={onMouseOver}
    on:mouseout={onMouseOut}
>
    {item.GSName}
</span>

<style>
    .bott-border {
        border-bottom: 1px solid #edd;
        padding: 2px 10px 2px 12px;
        margin-left: -9px;
        font-size: 0.9em;
        border-radius: 7px;
    }

    /*
     .active-group{
         background-color:blue;
     }*/
</style>
