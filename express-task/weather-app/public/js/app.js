const weatherform = document.querySelector("form");
const city = document.querySelector("#location");
const oneMessage = document.getElementsByClassName("m1");
const secondMessage = document.getElementsByClassName("m2");
const ThirdMessage = document.getElementsByClassName("m3");
oneMessage[0].innerHTML = `<p>Loading.....</p>`;

// 0 weatherform() {
weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = city.value;
  const url = [
    `http://api.weatherstack.com/current?access_key=b199a404cf59ac09f9fbcf9241165eab&query=${name}&units=f`,
    `https://api.ipgeolocation.io/timezone?apiKey=5b95340667404a909fbc60ae25a80db2&location=${name}`,
  ];

  Promise.all(
    url.map((url) =>
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    )
  ).then((dataArray) => {
    oneMessage[0].innerHTML = "";
    secondMessage[0].innerHTML = `
      <div>City : ${dataArray[0].location.name},${dataArray[0].location.region},${dataArray[0].location.country}</div>
      <div> Current Sitution :${dataArray[0].current.weather_descriptions[0]} </div>
      <div>Temperature : ${dataArray[0].current.temperature}\xB0F</div>
      `;
    ThirdMessage[0].innerHTML = `<div>Current Time: ${dataArray[1].date_time}</div>`;
  });
});
