module.exports = {
  filePath: process.env.FILE_PATH || "/tmp/access.log",
  refreshTimeSec: parseInt(process.env.REFRESH_TIME_SEC) || 10,
  traffic: {
    thresholdHigh: parseInt(process.env.TRAFFIC_THRESHOLD_HIGH) || 1200,
    alertTimeBoxSec: parseInt(process.env.TRAFFIC_ALERT_TIMEBOX_SEC) || 120
  }
};
