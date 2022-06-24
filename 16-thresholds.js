/* define pass/ fail
Example 
System does not product more than 1% of errors
Response time for 95% of APIs / request should be bellow 200 millisecond
Response time for 99% of request should be below 400 milliseconds
*/
import http from 'k6/http'
import {Rate} from 'k6/metrics'


//decalre rate
const failureRate = new Rate ('failed request')
export let option = {

threasholds: {
//define requriements
'failed request': ['rate<0.1'],
'http_req_duration' : ['p(95)<001', 'p(99)<001']
}}
export default function(){
    let res = http.get('https://run.mocky.io/v3/76ee8de8-9862-4c59-b938-f555ce18c2ff')

    //Apply thresholds
failureRate.add(res.status !== 200) // if response is not , then fail
}