<script>
    import { d_start, d_end, getSched } from "./store.js";

    import { add, lastDayOfMonth, format } from "date-fns";
    //https://date-fns.org/v2.28.0/docs/add

    import Fa from "svelte-fa";
    import { faSync } from "@fortawesome/free-solid-svg-icons";

    const formatDate = (d) => {
        let frm = "yyyy-MM-dd";
        if (d) {
            return format(d, frm);
        } else {
            return format(new Date(), frm);
        }
    };

    let currdate = new Date();

    let startDate = currdate; ///.setDate(1); //1-й день тек. мес.
    let frmStartDate = formatDate(startDate);

    let frmMinStartDate = formatDate(currdate.setDate(1));
    let frmMaxStartDate = formatDate(
        add(lastDayOfMonth(currdate), { months: 1 }),
    );

    let endDate = currdate.setDate(lastDayOfMonth(currdate).getDate()); //посл. день тек. мес.
    let frmEndDate = formatDate(endDate);

    //привязка store-writable переменных к значениям input'ов
    $: d_start.update(() => frmStartDate);
    $: d_end.update(() => frmEndDate);

    const getAuds = () => {
        console.log(frmStartDate);
    };
    //Открывает input on Hover
    const openInput = (ev) => {
        try {
            //ev.target.focus();
            console.log(ev);
            ev.srcElement.showPicker();
        } catch (err) {
            console.log(err);
        }
    };
    let inputDate;

    function aaa() {
        console.log("aaa");

        inputDate.blur();
    }
</script>

<div class="calendar-wrapper">
    <div class="calendar-inputs">
        <div>
            <div class="calendar-txt">Дата:</div>
            <div>
                <input
                    type="date"
                    on:mouseleave={aaa}
                    bind:this={inputDate}
                    min={frmMinStartDate}
                    max={frmMaxStartDate}
                    on:mousemove={openInput}
                    bind:value={frmStartDate}
                    on:change={() => getAuds()}
                    required
                    class="input is-success"
                />
            </div>
        </div>
    </div>
</div>

<style>
    .calendar-wrapper {
        padding: 10px 0;
    }
    .calendar-inputs {
        display: flex;
    }

    /* button {
        width: 100%;
    } */

    /* .error-row {
        text-align: center;
    } */
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
    .errmessage {
        color: red;
        letter-spacing: 1px;
        font-weight: 400;
    }
</style>
