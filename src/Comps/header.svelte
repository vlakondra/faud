<script>
    import { onMount } from "svelte";

    export let onBurgerClick;

    import Fa from "svelte-fa";

    import { faBars } from "@fortawesome/free-solid-svg-icons";

    let time = new Date();

    onMount(() => {
        let intr = setInterval(
            () => {
                time = new Date();
            },

            1000
        );
        return () => clearInterval(intr);
    });

    // https://cweili.github.io/svelte-fa/
    //https://fontawesome.com/v5/icons/bars?s=solid

    const formatter = new Intl.DateTimeFormat("ru", {
        hour12: false,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
    });
</script>

<div id="header" class="header">
    <div class="date">{new Date().toLocaleDateString("ru-RU")}</div>
    <div class="caption-wrapp">
        <div class="kv-burger" on:click={onBurgerClick}>
            <Fa icon={faBars} />
        </div>
        <div class="caption">Расписание студенческих групп</div>
    </div>
    <div class="time">{formatter.format(time)}</div>
</div>

<style lang="scss">
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #bea5f5;
        flex-wrap: nowrap;
        align-content: center;
        justify-content: space-around;
        padding: 10px 0;
        margin-top: 10px;
        margin-bottom: 25px;
        box-shadow: 1px 2px 6px 0px #5a3c3c;
        border-radius: 5px;
    }

    .date,
    .time {
        font-size: 1.15em;
        font-weight: 400;
        text-shadow: 1px 1px 1px rgb(75 50 31);
        color: #f9ffef;
        letter-spacing: 0.5px;
    }

    .time {
        width: 65px;
    }

    .kv-burger {
        width: 50px;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }

    .caption {
        text-align: left;
        text-shadow: 1px 1px 1px rgb(75 50 31);
        color: #fff;
        letter-spacing: 1px;
        line-height: 1em;
        font-weight: 400;
    }

    .caption-wrapp {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
    }

    // Перепроверить на мобильнике
    @media (min-width: 500px) {
        .kv-burger {
            font-size: 2em;
        }

        .caption {
            font-size: 1.75em;
        }
    }

    @media (max-width: 520px) {
        .header {
            padding: 5px 5px;
            margin: 3px 0 0px 0;
        }

        .caption {
            font-size: 4.5vw;
            letter-spacing: 0px;
        }

        .kv-burger {
            font-size: 1.75em;
        }
    }

    @media (max-width: 700px) {
        .date,
        .time {
            display: none;
        }
    }
</style>
