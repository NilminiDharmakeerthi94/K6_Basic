import http from 'k6/http'

export default function(){

    http.get('https://run.mocky.io/v3/76ee8de8-9862-4c59-b938-f555ce18c2ff')
}

// rate per second ->  request per second

//execute code --vus 5 --duration 5 --rps 5
//
