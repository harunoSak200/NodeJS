import http from "k6/http";
import { check } from "k6";

export let options = {
    vus: 100000, // 10,000 virtual users
    duration: "100s", // Test runs for 30 seconds
};

export default function () {
    let res = http.get("https://www.acharya.ac.in/about/faculty");
    check(res, { "status is 200": (r) => r.status === 200 });
}
