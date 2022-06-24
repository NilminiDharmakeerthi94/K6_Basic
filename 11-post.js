/* post json body to rest API
// https://run.mocky.io/v3/76ee8de8-9862-4c59-b938-f555ce18c2ff
POST email and PASSWORD to this API in json format


*/

import http from 'k6/http'

export default function(){
    var url = 'https://run.mocky.io/v3/76ee8de8-9862-4c59-b938-f555ce18c2ff'

    var param= {
        headers:{
            'Content-type': 'application/json'
        }
    }
  //  lets define body - its accept emain and password

  var payload= JSON.stringify({
      email:"abc@gmail.com",
      password:"12WER"
  })
  //URL , header, JSON BoDy
  http.post(url,param)
}

