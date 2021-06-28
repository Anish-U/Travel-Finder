const fetch = require("node-fetch");
const moment = require("moment");
const shell = require("electron").shell;

AirportInput("fromAirport");
AirportInput("toAirport");

const url = "https://tequila-api.kiwi.com/v2/search?";
// From the form
const searchBtn = document.getElementById("searchBtn");
const fromAirport = document.getElementById("fromAirport");
const toAirport = document.getElementById("toAirport");
const fromDate = document.getElementById("fromDate");
const toDate = document.getElementById("toDate");
const outputDiv = document.getElementById("output");

searchBtn.addEventListener("click", () => {
  let deptDate = getDateStr(fromDate);
  let arrDate = getDateStr(toDate);
  let deptPort = fromAirport.getAttribute("data-iata");
  let arrPort = toAirport.getAttribute("data-iata");

  if (
    moment(fromDate.value, "YYYY-MM-DD").isAfter(
      moment(toDate.value, "YYYY-MM-DD")
    )
  ) {
    outputDiv.innerHTML = "Invalid Dates. Please try again...";
    return;
  }

  let hitURL =
    url +
    "fly_from=" +
    deptPort +
    "&fly_to=" +
    arrPort +
    "&date_from=" +
    deptDate +
    "&date_to=" +
    arrDate +
    "&only_working_days=false&only_weekends=false&curr=INR&locale=en&sort=price&limit=20";

  console.log(hitURL);

  const headers = {
    apikey: "P-Pl4CowZJRPRUHuL1Gn22KzZj1zaMEC",
  };

  let finalJson;
  fetch(hitURL, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((json) => {
      if (
        json.status == "Bad Request" ||
        json.status == "Unprocessable Entity"
      ) {
        outputDiv.innerHTML = "Bad Input. Please try again...";
        return;
      }
      var data = json.data;
      console.log(json);
      outputDiv.innerHTML = "";
      outputDiv.classList.add("scroll");
      if (data.length > 0) {
        data.forEach((ele) => {
          const flightNo =
            ele.route[0].operating_carrier +
            " " +
            ele.route[0].operating_flight_no;
          const adultPrice = ele.fare.adults;
          const childPrice = ele.fare.children;
          const infantPrice = ele.fare.infants;
          const li = document.createElement("li");
          li.classList.add("list-group-item");
          const div = document.createElement("div");
          div.innerHTML = `<p>Flight No : <a target="_blank" href="https://www.flightradar24.com/data/flights/${flightNo}">${flightNo}</a> </p> 
                          <p>Adult Price : Rs.${adultPrice} </p>
                          <p>Child Price : Rs.${childPrice} </p>
                          <p>Infant Price : Rs.${infantPrice}</p>`;
          li.appendChild(div);
          outputDiv.appendChild(li);
        });
      } else {
        outputDiv.innerHTML = "No Data Available...";
      }
      // console.log(data);
    });
});

// Function that return date string
function getDateStr(input) {
  let date = input.value;
  date = moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
  return date;
}
