import {Counter} from 'k6/metrics'


var retryCounter = new Counter("GET API _MAX_RETRY")

import http from 'k6/http'

import {sleep} from 'k6' // use sleep for wait seconds

export default function(){
    // ad restries
    retryCounter.add(1)
    for(var retries = 5 ; retries >0; retries-- ){
        const response = http.get('https://run.mocky.io/v3/88654859-ae28-4fa6-9c0d-6dfb9c6d1678')
    
    if(response.status !== 404){
        retryCounter.add(1)
        console.log('Response is incorrect. attempts is ${retries} VU=${__VU} ITER=${__ITER}')
        //retry after  every 1 second
        sleep(1)
    }
    else {
        retries == 0
    }
    }
}

