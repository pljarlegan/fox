const colors = require("colors"), // eslint-disable-line no-unused-vars
  config = require("config"),
  readFile = require("./lib/helpers/file-reader").readFile,
  statsAlert = require("./lib/helpers/stats-alert"),
  lineSplitter = require("./lib/helpers/line-splitter"),
  Section = require("./Section"),
  stats = {},
  alerts = [],
  addToStats = (request) => {
    "use strict";

    if (request === null) {
      return;
    }

    const sectionName = lineSplitter.getSection(request.request);
    if (stats[ sectionName ] === undefined) {
      stats[ sectionName ] = new Section(sectionName);
    }
    stats[ sectionName ].addRequest(request);

    statsAlert.addAlert(stats, alerts, config.traffic.alertTimeBoxSec * 1000, config.traffic.thresholdHigh);
    const warnMsg = statsAlert.getAlerts(alerts);
    if (warnMsg !== "") {
      statsAlert.print(stats, alerts, config.traffic.alertTimeBoxSec * 1000);
    }
  };

readFile(config.filePath, (line) => addToStats(lineSplitter.log(line))); // eslint-disable-line strict

console.log("Current config : ".blue); // eslint-disable-line no-console
console.log("- File to watch : ".blue + config.filePath.green); // eslint-disable-line no-console
console.log("- Threshold high : ".blue + config.traffic.thresholdHigh.toString().green); // eslint-disable-line no-console
console.log("- Alert timeBox (sec.) : ".blue + config.traffic.alertTimeBoxSec.toString().green); // eslint-disable-line no-console

setInterval(() => {
  "use strict";

  statsAlert.print(stats, alerts, config.traffic.alertTimeBoxSec * 1000);
}, 10 * config.refreshTimeSec);
