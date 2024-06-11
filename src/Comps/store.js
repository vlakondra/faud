import { writable } from 'svelte/store'
export const selectedDate = writable(null)//.toLocaleDateString("ru-RU"));
export const selectedPair = writable(null);
export const busyAuds = writable({})

export const accordKey = writable(0)

export const load_ini_data = writable(false) //индикатор загрузки ини-данных
export const ini_data = writable({}) // ини-данные
export const err_ini_data = writable(false) //сообщение об ошибке при загр. ини-данных
export const load_sched_data = writable(false)
export const data_loading = writable(false)
export const err_sched_data = writable(false)

export const client_width = writable(0) //ширина экрана от ResizeObserver
const esc = encodeURIComponent;

//загрузка исходных данных: 
export default function () {
    const url_api = "https://api-1.ursei.su/schedule/GetBusyAudIniData";

    async function get() {
        load_ini_data.set(true)

        try {
            const response = await fetch(url_api)
            const js = await response.json();

            //throw new Error('Ошибка загрузки данных')

            if (js.hasOwnProperty('Error')) {
                // обраб. ошибку остановки БД для архивации в 01.00
                throw js.Error
            }
            else {
                load_ini_data.set(false)
                ini_data.set(await js)
                err_ini_data.set(false)
                //console.log('ini', js)
            }

        } catch (e) {
            err_ini_data.set(e)
        }
        load_ini_data.set(false)
    }

    get()
}


export async function getAuds(date, pairid) {
    const url_api = "https://api-1.ursei.su/schedule/GetBusyAudsOnDatePair?"

    const params = {
        date: date,
        pairid: pairid
    };

    const query = Object.keys(params)
        .map((k) => `${esc(k)}=${esc(params[k])}`)
        .join("&");

    try {
        let x;
        document.body.scrollIntoView()
        data_loading.set(true)
        const response = await fetch(url_api + query);

        let blds = await response.json()

        //throw new Error("Что-то пошло не так")

        //считаем кол-во занятых аудиторий
        for (const bld of blds.Buildings) {
            let busyAuds = bld.Auds.filter((a) => a.TimeStart != null).length
            bld.busyCnt = busyAuds
        }

        busyAuds.set(blds) //await response.json())
        err_sched_data.set(false)
        data_loading.set(false)

        accordKey.set(0)
        accordKey.set(1)
    } catch (e) {
        data_loading.set(false)
        err_sched_data.set(e)
        console.log(e)
        // err_sched_data.set(e)
    }
}

