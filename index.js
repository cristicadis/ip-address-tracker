var btn = document.getElementById("IP-button");
var inp_IP =document.getElementById("IP-input");
var adr =document.getElementById("adress");
var loc = document.getElementById("location");
var time = document.getElementById("timezone");
var isp = document.getElementById("isp");
var marker = {};

// If KEY Enter is presed
inp_IP.addEventListener("keypress", function(event) {
    if (event.keyCode == 13)
        btn.click();
});

//Create map;
var mymap = L.map('mapid').setView([55.1104,8.68213],3);
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=IYWFzDAZXyJDZTnE3Ei3', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1,
accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var myIcon = L.icon({
iconUrl: 'images/icon-location.svg',

});




btn.addEventListener("click",function(){
  if (document.getElementById("IP-input").value.length>0){
    var ipAddress = document.getElementById("IP-input").value;
    document.getElementById("IP-input").value="";
    var ourRequest =new XMLHttpRequest();
    ourRequest.open('GET','https://geo.ipify.org/api/v1?apiKey=at_mGXeU1zY4JbFU1sxUdh1WsaPcmALT&ipAddress='+ipAddress);
    ourRequest.onload = function(){
      var ourData = JSON.parse(ourRequest.responseText);
      var lat = ourData.location.lat;
      var long = ourData.location.lng;

      addDates(ourData);
      addMap(lat,long);
      console.log(lat);
    };
    ourRequest.send();


  }


});

function addDates (data) {
  loc.innerHTML = "";
  adr.innerHTML = "";
  time.innerHTML = "";
  isp.innerHTML = "";

  adr.insertAdjacentHTML('afterbegin',data.ip);
  loc.insertAdjacentHTML('afterbegin',data.location.city+ ", " +data.location.country + " " + data.location.postalCode);
  time.insertAdjacentHTML('afterbegin',"UTC"+ data.location.timezone);
  isp.insertAdjacentHTML('afterbegin',data.isp);


}



// Add marker to the map
function addMap (lat,long){
  if (marker != undefined) {
             mymap.removeLayer(marker);
       }
  marker = L.marker([lat, long],{icon: myIcon}).addTo(mymap);
  mymap.flyTo([lat, long], 12);
}
