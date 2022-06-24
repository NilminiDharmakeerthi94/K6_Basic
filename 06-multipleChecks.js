// test with mulptiple user for same API
// multple users req API 
import http from 'k6/http'
import {check} from 'k6'



export default function(){
    let response= http.get('https://run.mocky.io/v3/76ee8de8-9862-4c59-b938-f555ce18c2ff')
   console.log('response body length ${response.body.length} for vu= ${__vu} ITERA = ${__ITER}')// virtual user members
    check(response, {
        'is response status is 200:' : (r) => r.status ===200,
'body size is 101 bytes : ' : (r)=>r.body.length == 0,  // need to ask from dev
})

}
