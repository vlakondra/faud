<script>
    import {
        ini_data,
        load_ini_data,
        getAuds,
        selectedPair,
        selectedDate,
    } from "./store.js";
    let selected = 0;

    const callApi = (num) => {
        selected = num;
        $selectedPair = num;
        if (selectedDate) {
            getAuds($selectedDate, num);
        }
    };
</script>

{$load_ini_data}

<table
    class="pairs table is-bordered is-hoverable is-striped is-narrow is-fullwidth"
>
    <tbody>
        <tr>
            <th>Номер</th>
            <th>Начало</th>
            <th>Конец</th>
        </tr>
        {#if $ini_data.Pairs}
            <!-- <p>???</p>
            {$ini_data.Pairs.length} -->
            {#each $ini_data.Pairs as pair}
                <tr
                    class:active={pair.Pair_ID == selected}
                    on:click={() => callApi(pair.Pair_ID)}
                >
                    <td>{pair.PairNumb}</td>
                    <td>{pair.TimeStart}</td>
                    <td>{pair.TimeEnd}</td>
                </tr>
            {/each}
        {/if}
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
