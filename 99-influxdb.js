/* check will not fail whole load suite
so will use rate along check  */

import http from 'k6/http'
import {check} from 'k6'  // user check test pass or fail

// import rate
import {Rate} from 'k6/metrics'
//export variable that we will use in test

export let errorRate = new Rate('error')

//define option
export let options = {
thresholds : {
    errors: ['rate<0.1']  // i.e 10% error rate

} }

export default function(){
    let response= http.get('https://stg.acisaims.com/ngsw.json?ngsw-cache-bust=0.8590232915090608')
   console.log(`response body length ${response.body.length} for VU= ${__VU} ITERA = ${__ITER}`)// virtual user members
   const check1 =  check(response, {
        'is response status is 200:' : (r) => r.status ===200,

})
errorRate.add(!check1);  // i.e not 200 , bodt length not match

const check2= check(response, {
    'body size is 101 bytes : ' : (r)=>r.body.length == 0,
})
errorRate.add(!check2); 

}

// execution code:  k6 run 99-influxdb.js --out influxdb=http://1
//27.0.0.1:8089/myk6db --vus 5 --duration 5s
//k6 run 99-influxdb.js --out influxdb=http://127.0.0.1:8086/myk6db --vus 5 --duration 5s