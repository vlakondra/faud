<script>
    import { selectedPair, selectedDate, getAuds } from "./store.js";
    import { format } from "date-fns";

    const formatDate = (d) => {
        let frm = "yyyy-MM-dd";
        if (d) {
            return format(d, frm);
        } else {
            return format(new Date(), frm);
        }
    };

    let currdate = new Date();
    let mindate = formatDate(
        new Date(currdate.getFullYear(), currdate.getMonth(), 1),
    );
    let maxdate = formatDate(
        new Date(currdate.getFullYear(), currdate.getMonth() + 2, 0),
    );

    $selectedDate = currdate.toLocaleDateString("ru-RU");

    const callApi = () => {
        $selectedDate = new Date(inputDate.value).toLocaleDateString("ru-RU");
        if ($selectedPair) {
            getAuds($selectedDate, $selectedPair);
        }
    };

    //Открывает input on Hover
    const openInput = (ev) => {
        try {
            //ev.target.focus();
            ev.srcElement.showPicker();
        } catch (err) {
            console.log(err);
        }
    };
    let inputDate;

    function blur() {
        inputDate.blur();
    }
    let now = new Date().toISOString().slice(0, 10);
</script>

<div class="calendar-inputs">
    <div>
        <div class="calendar-txt">Дата:</div>
        <div>
            <input
                type="date"
                value={now}
                min={mindate}
                max={maxdate}
                on:mouseleave={blur}
                bind:this={inputDate}
                on:mousemove={openInput}
                on:change={() => callApi()}
                required
                class="input is-success"
            />
        </div>
    </div>
</div>

<style>
    .calendar-inputs {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 20px;
    }
    .calendar-txt {
        margin-bottom: 5px;
    }

    @media (min-width: 500.5px) {
        .calendar-inputs {
            justify-content: space-around;
        }

        input {
            width: 120px !important;
            padding: 0 3px;
            font-size: 0.95rem;
            /* font-family: Roboto; */
        }
    }

    @media (max-width: 500px) {
        .calendar-inputs {
            justify-content: space-evenly;
        }

        .calendar-txt {
            color: #3488ce;
        }
        input {
            width: 115px !important;
            padding: 0 3px;
            font-size: 0.85rem;

            /* font-family: Roboto; */
        }
    }
</style>
