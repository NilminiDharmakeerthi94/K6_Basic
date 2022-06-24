// https://run.mocky.io/v3/52134c70-1031-46d2-b032-5c0f16192c86   200 responce code , https://designer.mocky.io/design/confirmation

import http from 'k6/http'
import {check} from 'k6'


export default function(){
//this function return responce
let response = http.get('https://run.mocky.io/v3/52134c70-1031-46d2-b032-5c0f16192c86') // API for check 200 status
check(response, {'ís responce status is 200:': (r) => r.status===200, })
}
// how check pass/ fail if responce 200 pass