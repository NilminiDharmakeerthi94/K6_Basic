/* 
basics of load impact scripts
*/
import http from 'k6/http'
import {check} from 'k6'
import {Rate} from 'k6/metrics'
// declare variables
export let errorRate = new Rate ('errors')

//defin options
export let options = {
    vus:10,
    duration : '2s',
    //threshold
    threasholds : {
        errors : ['rate<0.1']  // 10% error
    }
}
//default main function
export default function(){
    //API 1 , assue return multiple users
    const response = http.get('https://run.mocky.io/v3/318fef6c-41af-46ad-8416-aa7ca5afee28');

    const checkAPI1 = check(response, {
        "is response of API1 is 200 : " : r => r.status === 200
    })

    //error rate
    errorRate.add(!checkAPI1)

  //API 2 , assue return multiple users
  const responseUsers = http.get('https://run.mocky.io/v3/bd61b869-0082-438e-806d-a4a45efdb8fc');

  const checkAPI2 = check(responseUsers, {
      "is response of API2 is 200 : " : r => r.status === 200
  })

  //error rate
  errorRate.add(!checkAPI2)


    // now we neet to execute this script

    
/*
Command:
k6 login cloud --token 8212f20f4bba69994a550fc0187e565f9a18349e217ce4bc2b4a27c0ef0b4323

k6 run 20-loadimpactBasic.js -o cloud  

*/
    
}