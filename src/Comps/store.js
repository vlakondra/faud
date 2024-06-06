import { dataset_dev } from 'svelte/internal';
import { readable, writable } from 'svelte/store'
// https://svelte.dev/repl/b2d671b8119845ca903667f1b3a96e31?version=3.37.0


export const selectedDate = writable(null)//.toLocaleDateString("ru-RU"));
export const selectedPair = writable(null);
export const busyAuds = writable({})

export const accordKey = writable(0)

export const d_start = writable(null) //начало-конец периода для показа в Noschedule
export const d_end = writable(null)


export const load_ini_data = writable(false) //индикатор загрузки ини-данных
export const ini_data = writable({}) // ини-данные
export const curr_year_id = writable(0) //текущий учебный год
export const curr_month = writable(0) //тек-й мес.
export const err_ini_data = writable(false) //сообщение об ошибке при загр. ини-данных

export const selected_GSName = writable("")

export const load_sched_data = writable(false)


export const data_loading = writable(false)

export const err_sched_data = writable(false)
export const scheddata = writable({})
export const sched_data_loaded = writable(false) //была  загрузка расписания - не показ-ть startmessage

export const client_width = writable(0) //ширина экрана от ResizeObserver

const esc = encodeURIComponent;

//загрузка исходных данных: 

export default function () {
    const url_api = "https://api-1.ursei.su/schedule/GetBusyAudIniData";

    const error = writable(false)
    const data = writable({})

    async function get() {
        load_ini_data.set(true)
        // let year_id;
        const cd = new Date()
        const currMonth = cd.getMonth() + 1

        try {
            //old const response = await fetch(url,{},3000)
            const response = await fetch(url_api)
            const js = await response.json();

            if (js.hasOwnProperty('Error')) {
                // обраб. ошибку остановки БД для архивации в 01.00
                throw js.Error
            }
            else {
                // old const years = js.YearList
                //если тек. мес. < 8, то тек уч. год. => "тек.год -1 / тек.год"
                //если >= 8 =h> "тек.год / тек.год + 1"

                // if(currMonth < 8){
                //    year_id = years.filter(y => y.EduYear.endsWith(cd.getFullYear()))[0]['Year_ID'];
                //  }else if(currMonth >= 8){
                //    year_id = years.filter(y => y.EduYear.startsWith(cd.getFullYear()))[0]['Year_ID'];  
                //  }

                // old const gstree= js.GSTree.filter(y => y.Year_ID===year_id)[0] 

                //текущие уч.год и месяц (будут нужны при запросе расписанияы)
                // old curr_year_id.set(year_id)
                curr_month.set(currMonth)


                load_ini_data.set(false)
                ini_data.set(await js)
                console.log('ini', js)
            }

            // data.set(await gstree.FormEdu);// response.json())
        } catch (e) {
            err_ini_data.set(e)
        }
        load_ini_data.set(false)
    }

    get()

    // return [error, data];
}


export async function getAuds(date, pairid) {
    const url_api = "https://api-1.ursei.su/schedule/GetBusyAudsOnDatePair?"
    console.log(date, pairid)
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
        //считаем кол-во занятых аудиторий
        for (const bld of blds.Buildings) {
            let busyAuds = bld.Auds.filter((a) => a.TimeStart != null).length
            bld.busyCnt = busyAuds
        }

        busyAuds.set(blds) //await response.json())
        data_loading.set(false)

        accordKey.set(0)
        accordKey.set(1)



    } catch (e) {
        data_loading.set(false)
        console.log(e)
        // sched_data_loaded.set(true)
        // err_sched_data.set(e)
    }
}

export async function getSched(grp_id) { // ,year_id,month_num){

    // let dstart,dend,departid,empid;

    // d_start.subscribe((v)=>dstart=new Date(v).toLocaleDateString('ru-RU'))
    // d_end.subscribe((v)=>dend=new Date(v).toLocaleDateString('ru-RU'))
    // depart_id.subscribe((v)=>departid=v)
    // teacher_id.subscribe((v)=>empid=v)

    load_sched_data.set(true)
    //old const url='https://old.ursei.su/Services/GetGsSched?'
    const url_api = "https://api.ursei.su/public/schedule/rest/GetGsSched?";//grpid=26191


    const params = {
        grpid: grp_id
        // yearid:26,//  year_id,
        // monthnum:8//month_num
    };
    const query = Object.keys(params)
        .map((k) => `${esc(k)}=${esc(params[k])}`)
        .join("&");

    try {
        let x;
        const response = await fetch(url_api + query)
        // console.log('JSON', response.json())
        // x= await response.json()
        // console.log('sched',x)

        scheddata.set(await response.json())
        sched_data_loaded.set(true)


        //!!!!! не ЗАБЫТЬ!!!Позиционируем на сегодня, если есть в расписании
        setTimeout(() => {
            let dp = document.getElementById(
                new Date().toISOString().slice(0, 10)
            );
            if (dp) {
                dp.scrollIntoView({ block: "start", behavior: "smooth" });
            } else {
                document.body.scrollIntoView();
            }
        }, 500);

    } catch (e) {
        sched_data_loaded.set(true)
        err_sched_data.set(e)
    }
    load_sched_data.set(false)
}






