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
  vus: 20,
  duration: "60s",
  //threshold
  threasholds: {
    errors: ["rate<0.1"], // 10% error
    'groupDuration{groupName:groupGetUsers}' : ['avg < 200'],
    'groupDuration{groupName:groupGetGroups}' : ['avg < 200'],
  },
};
//default main function
export default function () {
  //API 1 , assue return multiple users
  groupWithMetrics("groupGetUsers", function () {
    const response = http.get(
      "https://run.mocky.io/v3/318fef6c-41af-46ad-8416-aa7ca5afee28"
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
      "https://run.mocky.io/v3/bd61b869-0082-438e-806d-a4a45efdb8fc"
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
