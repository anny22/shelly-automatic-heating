# shelly-automatic-heating
Standalone Shelly mJS script for automated morning heating based on Open-Meteo weather data.

# Shelly Automated Morning Heating Script

A lightweight, standalone JavaScript (mJS) script for **Shelly Gen2/Gen3** devices that automatically turns on a heater or radiator during low-tariff morning hours based on real-time local weather data.

---

## 💡 Overview

This automation connects your Shelly relay directly to the free **Open-Meteo API** to fetch current outdoor temperatures. On scheduled workdays (Monday to Friday), if the outside temperature falls below a set threshold during your specified morning time window, the Shelly relay triggers the heating.

### Key Features
- **No External Hub Required:** Runs directly on the Shelly hardware using native mJS.
- **Weather API Integration:** Dynamically fetches outdoor temperature via HTTP GET requests.
- **Fail-Safe Design:** Includes a 5-minute execution window to prevent timer drift issues and automatically turns heating on if weather API requests fail.
- **Energy & Cost Efficient:** Aligns heating cycles with low-tariff time blocks.

---

## ⚙️ Configuration Options

You can easily adjust the settings at the top of the script:

| Parameter | Default | Description |
| :--- | :--- | :--- |
| `START_HOUR` | `5` | Hour to check weather and turn on heating |
| `START_MINUTE` | `30` | Minute to check weather and turn on heating |
| `END_HOUR` | `6` | Hour to turn off heating |
| `END_MINUTE` | `0` | Minute to turn off heating |
| `TEMP_THRESHOLD` | `6.0` | Maximum temperature (°C) to trigger heating |
| `LAT` | `"46.0569"` | Latitude coordinates (Default: Ljubljana) |
| `LON` | `"14.5058"` | Longitude coordinates (Default: Ljubljana) |

---

## 🚀 Quick Setup Instructions

1. **Access Shelly Web Interface:**
   Open your device's web interface or access it via the official Shelly app.
2. **Create New Script:**
   Navigate to **Scripts** > **Add Script**.
3. **Paste & Configure:**
   Paste the contents of `shelly_heating_schedule.js` into the editor and update the coordinates (`LAT`, `LON`) or schedule settings if needed.
4. **Enable Run on Startup:**
   Toggle **Run on startup** to **ON** so the script executes automatically when the device boots or restarts.
5. **Start Script:**
   Click **Save** and **Start**.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

