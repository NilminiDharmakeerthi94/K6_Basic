/*
check usefull for assertion, pass/fail result- no
check just act lise assertion, verify if the things test works as expected
They don't fail the load test

lets combine checks and threaholds to get he both
* apply threaholds on check

*/
import http from 'k6/http'
import {check} from 'k6'

export let option = {
    vus: 10,
    duration :'10s',
    threasholds: {
//rate of sucessfully checks must be greater than 95% , >95% check must PASS/ SUCCESSFUL
'checks': ['rate>0.95']
    }}
    export default function(){
        const response = http.get('https://run.mocky.io/v3/88654859-ae28-4fa6-9c0d-6dfb9c6d1678')

        check(response, {'is status is 200: ' : r => r.status === 200 })
    }


