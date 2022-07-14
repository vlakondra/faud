<script context="module">
    let sel_id;
</script>

<script>
    export let item;
    let li_group;

    const onClick = () => {
        sel_id = item; //e.target.id;
        let acts = document.getElementsByClassName("active-group");
        for (let g of acts) {
            g.classList.remove("active-group");
        }

        li_group.classList.add("active-group");
    };
    const onMouseOver = () => {
        li_group.classList.add("group-hover");
    };
    const onMouseOut = () => {
        li_group.classList.remove("group-hover");
    };

    //https://old.ursei.su/Services/GetGsSched?grpid=26015&yearid=26&monthnum=7
</script>

<span
    class={item == sel_id ? "active-group bott-border" : "bott-border"}
    bind:this={li_group}
    on:click={onClick}
    on:mouseover={onMouseOver}
    on:mouseout={onMouseOut}
>
    {item}
</span>

<!--
     <span  on:click={onClick}>
     {item}
     </span>
 -->
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
