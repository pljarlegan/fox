const Table = require("cli-table"),
  colors = require("colors"), // eslint-disable-line no-unused-vars
  addAlert = (stats, alerts, timeBox, threshold) => {
    "use strict";

    const currentTimeStamp = Date.now(),
      allHits = Object.values(stats).map((section) => {
        section.cleanLogsOlderThan(currentTimeStamp - timeBox);
        return section.getHits();
      }).reduce((acc, hits) => {
        return acc + hits;
      }, 0);
    if (allHits >= threshold) {
      alerts.push(`High traffic generated an alert - hits = ${allHits}, triggered at ${new Date().toISOString()}`);
    }
  },
  getAlerts = (alerts) => {
    "use strict";

    return alerts.reduce((acc, string) => `${acc}${string}\n`, "");
  },
  print = (stats, alerts, timeBox) => { // eslint-disable-line strict
    // clear screen ... TADA !
    console.log("\033[2J"); // eslint-disable-line no-console, no-octal-escape
    const currentTimeStamp = Date.now(),
      warnMsg = getAlerts(alerts);

    if (warnMsg !== "") {
      console.log(warnMsg.red); // eslint-disable-line no-console
    }

    const table = new Table({ head: [ "Section", "Error rate", "hits" ], colWidths: [ 15, 20, 20 ] });
    Object.values(stats).forEach((section) => {
      section.cleanLogsOlderThan(currentTimeStamp - timeBox);
      table.push([ section.name, section.getErrorRate(), section.getHits() ]);
    });

    console.log(table.toString()); // eslint-disable-line no-console
    console.log(`refresh at ${new Date(currentTimeStamp).toISOString()}`); // eslint-disable-line no-console
    console.log(""); // eslint-disable-line no-console
  };

module.exports = {
  addAlert,
  getAlerts,
  print,
};
