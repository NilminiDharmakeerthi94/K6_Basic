/*

HTTP API -> https://run.mocky.io/v3/f7c0d915-b053-4a8e-b845-8807570e3528
headr type: application/json
{
"Message" : "Successfully"
}

*/
import http from 'k6/http'
import {check} from 'k6'


export default function (){
var url= 'https://run.mocky.io/v3/e6900d83-3ad9-4cec-b780-90048e3caff0'

var headerParam = {
    headers: {
    'Content-Type' : 'application/json',
    }
}
const response = http.get(url,headerParam)
check(response, {
    'is status is 200': (r)=> r.status === 200,
})

let body = JSON.parse(response.body)
// print
console.log('response body is ${JSON.stringify(body)}')
console.log('response body is ${body.Message}')  // need to ask from dev

check(response, {
    'is Message is success:': (r) => JSON.parse(r.body).Message === "Successfully",
})
}