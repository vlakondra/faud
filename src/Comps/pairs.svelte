<script>
    import { ini_data } from "./store.js";
    let selected = 0;

    const onRowClick = (num) => {
        selected = num;
    };
</script>

<table class="pairs table is-bordered is-striped is-narrow is-fullwidth">
    <tbody>
        <tr>
            <th>Номер</th>
            <th>Начало</th>
            <th>Конец</th>
        </tr>
        <!-- {#each $ini_data.Pairs as pair}
            <tr
                class:active={pair.PairNumb == selected}
                on:click={() => onRowClick(pair.PairNumb)}
            >
                <td>{pair.PairNumb}</td>
                <td>{pair.TimeStart}</td>
                <td>{pair.TimeEnd}</td>
            </tr>
        {/each} -->
    </tbody>
</table>

<style>
    .pairs td {
        cursor: pointer;
    }
    .active {
        background-color: red !important;
        color: azure !important;
    }
</style>
