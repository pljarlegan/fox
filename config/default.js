module.exports = {
  filePath: process.env.FILE_PATH || "/tmp/access.log",
  traffic: {
    thresholdHigh: parseInt(process.env.TRAFFIC_THRESHOLD_HIGH) || 10,
    alertTimeBoxSec: parseInt(process.env.TRAFFIC_ALERT_TIMEBOX_SEC) || 120
  }
};
