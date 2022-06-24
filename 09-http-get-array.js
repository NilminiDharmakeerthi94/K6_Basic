/*
{
"name":"ane",
"email":"ane@gmail.com",
"location": "london"
},
{
"name":"ane",
"email":"ane@gmail.com",
"location": "london"
},
{
"name":"ane",
"email":"ane@gmail.com",
"location": "london"
}
https://run.mocky.io/v3/b47382d8-6de2-4ceb-844a-79d429a6f7c2
*/

import http from 'k6/http'

export default function(){
    let response= http.get('https://run.mocky.io/v3/9c234994-30ef-40ae-9ebe-5984c1001f31')


    //read response body
    let body = JSON.parse(response.body)
    body.forEach(element => {
        console.log('name is ${element.name}')
    });
}