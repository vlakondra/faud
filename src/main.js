//import './app.css'
// import "/src/assets/index_.css";
//https://google-webfonts-helper.herokuapp.com/fonts/roboto?subsets=cyrillic,latin
import "/src/assets/index.css"; //Загрузка шрифтов
import "./app.scss";

import App from './App.svelte';

const app=new App( {

    // target: document.getElementById('app')
    target: document.querySelector('section div'),

  }

)

export default app;