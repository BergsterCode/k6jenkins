import http from "k6/http";
import { group, check, sleep } from "k6";

const BASE_URL = "https://172.17.0.1:8243/pizzashack/1.0.0";

// Sleep duration between successive requests.
// Edit the value of this variable or remove calls to the sleep function on the script.
const SLEEP_DURATION = 0.1;

// Global variables should be initialized.
var authToken = "6117d72c-f8ac-391f-a030-18e74f77d35a";

let headers = {
  authorization: "Bearer " + authToken,
  contentType: "application/json"
};

export let options = {
  vus: 1000,  // number of user looping for
  duration: '30s',
  //Set SLO
  thresholds: {
    'http_req_duration': ['p(95)<2000'], // 95% of requests must complete below 2s
  }
};

export default function() {
    group("/menu", () => {
        let url = BASE_URL + `/menu`;
        // Request No. 1
        let request = http.get(url, {headers: headers});
        check(request, {
            "OK. Menu is returned.": (r) => r.status != 304 || 406
        });
        sleep(SLEEP_DURATION);
    });
}
