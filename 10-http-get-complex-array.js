/* complex array
Sometimes  real world responce can be in bellow format
{
    "data":[
{
        "name": "graham",
        "email": "met@gmail.com",
        "array":[
            1,2,3
        ]
    },
    {
        "name": "hena",
        "email": "metma@gmail.com",
        "array":[
            4,5,6
        ]
    }
]
}
// https://run.mocky.io/v3/0809a163-622b-412a-baf1-c78ae17adc93

*/

import http from 'k6/http'

export default function(){
    let response = http.get('https://run.mocky.io/v3/88654859-ae28-4fa6-9c0d-6dfb9c6d1678')
// lets print values - we pass JSON response body
let body= JSON.parse(response.body)

body.data.forEach(element => {
    console.log('value of name from data is ${element.name}')

    element.array.forEach(elementArray => {
        console.log(`value of property array is ${elementArray}`)  
        // pass complex json array
        // it will hepl to parse values and return to next API call
    })
});


}