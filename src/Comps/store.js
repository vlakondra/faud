import { readable, writable } from 'svelte/store'
// https://svelte.dev/repl/b2d671b8119845ca903667f1b3a96e31?version=3.37.0

// //часы для header'a
// export const time = readable(new Date(), function start(set) {
// 	const interval = setInterval(() => {
// 		set(new Date());
// 	}, 1000);

// 	return function stop() {
// 		clearInterval(interval);
// 	};
// });


export const load_ini_data= writable(false) //индикатор загрузки ини-данных
export const ini_data = writable({}) // ини-данные
export const err_ini_data= writable(false) //сообщение об ошибке при загр. ини-данных

export const load_sched_data= writable(false)
export const err_sched_data= writable(false)

// export const depart_id = writable(null)
// export const teacher_id = writable(null)
// export const teacher_fio = writable(null)

export const d_start = writable(null)
export const d_end = writable(null)
export const  scheddata=writable({})
export const sched_data_loaded=writable(false) //была  загрузка расписания - не показ-ть startmessage
export const client_width = writable(0) //ширина экрана от ResizeObserver

const esc = encodeURIComponent;
// const buildparams =(pars)=>{
//      Object.keys(pars)
//     .map((k) => `${esc(k)}=${esc(pars[k])}`)
//     .join("&");
// }
//загрузка исходных данных: форма - курс - группа
// export default function (){
export default  function (){
    const url = "https://old.ursei.su/Services/GetGSSchedIniData"; 

    //const loading = writable(true) //оставить только data и export-переменные
    const error = writable(false)
	const data = writable({})  
   
    async function get() {
        load_ini_data.set(true)
        let year_id;
        const cd = new Date()
        try {
            const response = await fetch(url,{},3000)
            const js = await response.json();
            if (js.hasOwnProperty('Error')){
               // обраб. ошибку остановки БД для архивации в 01.00
                throw js.Error
            }
            else{
              const years = js.YearList
              //если тек. мес. < 8, то тек уч. год. => "тек.год -1 / тек.год"
              //если >= 8 => "тек.год / тек.год + 1"
              if(cd.getMonth() + 1 < 8){
                 year_id = years.filter(y => y.EduYear.endsWith(cd.getFullYear()))[0]['Year_ID'];
               }else if(cd.getMonth() + 1 >= 8){
                 year_id = years.filter(y => y.EduYear.startsWith(cd.getFullYear()))[0]['Year_ID'];  
               }
              
              const gstree= js.GSTree.filter(y => y.Year_ID===year_id)[0] 

              //console.log('FormEdu',gstree.FormEdu)

              data.set(await gstree.FormEdu);//Группы за определенный уч.год
               await ini_data.set( gstree.FormEdu)
              }
            
            // data.set(await gstree.FormEdu);// response.json())
        } catch(e) {
            err_ini_data.set(e)
        }
        load_ini_data.set(false)
    }

    get()

   // return [error, data];
}

export async function getSched(par){
    let dstart,dend,departid,empid;

    d_start.subscribe((v)=>dstart=new Date(v).toLocaleDateString('ru-RU'))
    d_end.subscribe((v)=>dend=new Date(v).toLocaleDateString('ru-RU'))
    depart_id.subscribe((v)=>departid=v)
    teacher_id.subscribe((v)=>empid=v)

    load_sched_data.set(true)
    const url='https://old.ursei.su/Services/GetTeacherSched?'
    const params = {
        departid:departid,
        empid:empid,
        dstart:dstart,
        dend:dend
      };
    //    let query = buildparams(params)
      const query = Object.keys(params)
      .map((k) => `${esc(k)}=${esc(params[k])}`)
      .join("&");

      try {
        const response = await fetch(url + query)
        scheddata.set( await response.json())  
        sched_data_loaded.set(true)
        //Позиционируем на сегодня, если есть в расписании
        setTimeout(() => {
            let dp = document.getElementById(
                new Date().toISOString().slice(0, 10)
            );
            if (dp) {
                dp.scrollIntoView({ block: "start", behavior: "smooth" });
            }else {
                document.body.scrollIntoView();
            }
        }, 500);
     
    } catch(e) {
        sched_data_loaded.set(true)
        err_sched_data.set(e)
    }
    load_sched_data.set(false)
}






