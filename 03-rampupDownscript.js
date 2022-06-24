// 
//ramp up  ram down --> 10 users for lest say 20 secounds and again increase load and lets say 20 users for next 1 minuts

import http from 'k6/http'

//Rampup snd ramp down users
export let options = {
    stages : [
        {duration : '10s', target: 5}, // 5 users for 10 s
        {duration : '20s', target: 3},  // again additonal user after 20s , ramp up
        {duration : '10s', target: 0}   // ramp down
    ]
}

//main function, VU wii call end point
export default function(){

    http.get('https://run.mocky.io/v3/76ee8de8-9862-4c59-b938-f555ce18c2ff');
}

//running command k6 run ./test/03-rampupDownscript.js