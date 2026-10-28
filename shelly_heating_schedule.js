// --- SETTINGS ---
let START_HOUR = 5;
let START_MINUTE = 30;
let END_HOUR = 6;
let END_MINUTE = 0;
let TEMP_THRESHOLD = 6.0; // Turn on only if outside temp is 6°C or lower
let LAT = "46.0569";      // Coordinates for Ljubljana
let LON = "14.5058";

// Function to check conditions and control the switch
function checkSchedule() {
  let now = new Date();
  let day = now.getDay(); // 1 = Monday, ..., 5 = Friday
  let hour = now.getHours();
  let minute = now.getMinutes();

  // Check if it is a working day (Mon-Fri)
  if (day >= 1 && day <= 5) {
    
    let currentTotalMinutes = hour * 60 + minute;
    let startTotalMinutes = START_HOUR * 60 + START_MINUTE;
    let endTotalMinutes = END_HOUR * 60 + END_MINUTE;

    // Check temperature within a 5-minute window starting from the start time (safety against timer drift)
    if (currentTotalMinutes >= startTotalMinutes && currentTotalMinutes < startTotalMinutes + 5) {
      print("Schedule: Checking outside temperature...");
      
      Shelly.call(
        "HTTP.GET", 
        { url: "https://api.open-meteo.com/v1/forecast?latitude=" + LAT + "&longitude=" + LON + "&current_weather=true" }, 
        function(res, error_code, error_msg) {
          if (error_code === 0 && res.code === 200) {
            let data = JSON.parse(res.body);
            let outsideTemp = data.current_weather.temperature;
            print("Current outside temperature: " + outsideTemp + "°C");

            if (outsideTemp <= TEMP_THRESHOLD) {
              Shelly.call("Switch.Set", { id: 0, on: true });
              print("Outside is cold. Radiator TURNED ON.");
            } else {
              print("Outside is warm (" + outsideTemp + "°C). Turn-on skipped.");
            }
          } else {
            // In case of an internet error, turn on anyway as a fail-safe
            print("Error reading temperature. Turning on radiator for safety.");
            Shelly.call("Switch.Set", { id: 0, on: true });
          }
        }
      );
    }

    // Turn off the radiator when the time expires
    if (currentTotalMinutes === endTotalMinutes) {
      Shelly.call("Switch.Set", { id: 0, on: false }, function(res) {
        print("Schedule: Time expired, radiator TURNED OFF.");
      });
    }
  }
}

// Check every minute
Timer.set(60000, true, function () {
  checkSchedule();
});

// Startup message
print("Script active: Schedule " + START_HOUR + ":" + START_MINUTE + "-" + END_HOUR + ":" + END_MINUTE + " (Mon-Fri), threshold: " + TEMP_THRESHOLD + "°C");
