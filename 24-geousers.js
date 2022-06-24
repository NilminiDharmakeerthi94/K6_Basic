/* 
basics of load impact scripts
*/
import http from "k6/http";
import { check ,group} from "k6";
import { Rate, Trend } from "k6/metrics";
// declare variables
export let errorRate = new Rate("errors");

//decalre trends
let groupDuration = Trend("groupDuration")
let getUserTrend = Trend("getUserAPITrend")
let getGroupTrend = Trend("getGroupAPITrend")
// define functio for measure time 
function groupWithMetrics(nameOfGroup, groupFuncion){
    // start new
    let start = new Date();
    //call group
    group(nameOfGroup, groupFuncion);
    let end = new Date(); // stop date


    //add Trend timing
    groupDuration.add(end-start, {groupName: nameOfGroup} )
}
//defin options
export let options = {
  vus: 30,
  duration: "50s",
  //threshold
  threasholds: {
    errors: ["rate<0.1"], // 10% error
    "groupDuration{groupName:groupGetUsers}" : ['avg < 200'],
    "groupDuration{groupName:groupGetGroups}" : ['avg < 200'],
  },
  "http_req_duration{type:GETAPITAG}":['p(95)<100'],
  "http_req_duration{type:GETAPIGROUPTAG}":['p(95)<100'],
// lets add thresholds for region
"http_req_duration{load_zone:amazon:us:ashburn}": ["p(95)<500"],
"http_req_duration{load_zone:amazon:ie:dublin}": ["p(95)200"],
"http_req_duration{load_zone:amazon:in:mumbai}": ["p(95)<100"],
"http_req_duration{load_zone:amazon:jp:tokyo}": ["p(95)<300"],
"http_req_duration{load_zone:amazon:sg:singapore}": ["p(95)<400"],
  ext : {
    loadimpact : {
    projectID : 3590352,

    //add distrribution
    distribution : {
        distributionLabel : {loadZone: 'amazon:us:ashburn', percent:10},
        distributionLabel : {loadZone: 'amazon:ie:dublin', percent:10},
        distributionLabel : {loadZone: 'amazon:in:mumbai', percent:10},
        distributionLabel : {loadZone: 'amazon:jp:tokyo', percent:20},
        distributionLabel : {loadZone: 'amazon:sg:singapore', percent:50},
    }
    }
    }


};
//default main function
export default function () {
  //API 1 , assue return multiple users
  groupWithMetrics("groupGetUsers", function () {
    const response = http.get(
      "https://run.mocky.io/v3/318fef6c-41af-46ad-8416-aa7ca5afee28" , {
        tag : {
            type: "GETAPITAG"
        }
      }
    );

    const checkAPI1 = check(response, {
      "is response of API1 is 200 : ": (r) => r.status === 200,
      tags : {
        type: "GETAPITAG"
      }
    });

    //error rate
    errorRate.add(!checkAPI1);

    // add trend
    getUserTrend.add(response.timings.duration, {type: "GETAPITAG"})
  });
  //API 2 , assue return multiple users

  groupWithMetrics("groupGetGroups", function () {
    const responseUsers = http.get(
      "https://run.mocky.io/v3/bd61b869-0082-438e-806d-a4a45efdb8fc", {
        tag : {
            type: "GETAPIGROUPTAG"
        }
      }
    );

    const checkAPI2 = check(responseUsers, {
      "is response of API2 is 200 : ": (r) => r.status === 200,
      tags : {
        type: "GETAPIGROUPTAG"
      }
    });

    //error rate
    errorRate.add(!checkAPI2);

    getGroupTrend.add(responseUsers.timings.duration, {type: "GETAPIGROUPTAG"})
  });


  // now we neet to execute this script

  /*
Command:
k6 login cloud --token 8212f20f4bba69994a550fc0187e565f9a18349e217ce4bc2b4a27c0ef0b4323

k6 run 20-loadimpactBasic.js -o cloud  

*/
}
