/* check will not fail whole load suite
so will use rate along check  */
import {Trend} from 'k6/metrics'
import http from 'k6/http'
import {check} from 'k6'  // user check test pass or fail

// import rate
import {Rate} from 'k6/metrics'
//export variable that we will use in test

export let errorRate = new Rate('error')
// defind trends
var getApiTrend = new Trend("TREND_Get_Api_Duration")
var getApiTrend = new Trend("TREND_Get_Api_Waiting")
var googlegetApiTrend = new Trend("TREND_Google_Get_Api_Duration")
var googlegetApiTrend = new Trend("TREND_Google_Get_Api_Waiting")
//define option
export let options = {
thresholds : {
    errors: ['rate<0.1']  // i.e 10% error rate

} }

export default function(){
    let response= http.get('https://run.mocky.io/v3/76ee8de8-9862-4c59-b938-f555ce18c2ff')
   console.log('response body length ${response.body.length} for vu= ${__vu} ITERA = ${__ITER}')// virtual user members
   const check1 =  check(response, {
        'is response status is 200:' : (r) => r.status ===200,

})
errorRate.add(!check1);  // i.e not 200 , bodt length not match

const check2= check(response, {
    'body size is 101 bytes : ' : (r)=>r.body.length == 0,
})
errorRate.add(!check2); 

// added response duration inside custom trend
getApiTrend.add(response.timings.duration)
getApiTrend.add(response.timings.waiting)


// add more API


const acisResponse = http.get('https://stg.acisaims.com/auth/login'); 
googlegetApiTrend.add(response.timings.duration)
googlegetApiTrend.add(response.timings.waiting)

}