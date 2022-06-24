// add more virtual user ex: 1000
import http from 'k6/http'

export const options = {
    //decalre configuration
    vus: 10,
    duration: '10s',   // 1m2s
  };
  

export default function(){

   

    http.get('https://run.mocky.io/v3/76ee8de8-9862-4c59-b938-f555ce18c2ff');
}