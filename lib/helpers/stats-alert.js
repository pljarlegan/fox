const readline = require("readline"),
  Table = require("cli-table"),
  colors = require("colors"), // eslint-disable-line no-unused-vars
  addAlert = (stats, alerts, timeBox, threshold) => {
    "use strict";

    const currentTimeStamp = Date.now(),
      allHitsInTimeBox = Object.values(stats).map((section) => {
        section.cleanLogsOlderThan(currentTimeStamp - timeBox);
        return section.getHits();
      }).reduce((acc, hits) => {
        return acc + hits;
      }, 0);


    if (allHitsInTimeBox >= threshold) { // new alert
      alerts.push(`High traffic generated an alert - hits = ${allHitsInTimeBox}, triggered at ${new Date().toISOString()}`.red);
    }
  },
  getAlerts = (alerts) => {
    "use strict";

    if (alerts.length && alerts[ alerts.length - 1 ] !== "End alert".green) {
      alerts.push("End alert".green);
    }
    return alerts.reduce((acc, string) => `${acc}${string}\n`, "");
  },
  cleanConsole = () => {
    "use strict";
    const blank = "\n".repeat(process.stdout.rows);
    console.log(blank); // eslint-disable-line no-console
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
  },
  print = (stats, alerts, timeBox) => {
    "use strict";
    cleanConsole();

    const currentTimeStamp = Date.now(),
      warnMsg = getAlerts(alerts);

    if (warnMsg !== "") {
      console.log(warnMsg.red); // eslint-disable-line no-console
    }
    const topSection = {
        name: "",
        hits: 0,
      },
      table = new Table({ head: [ "Section", "Error rate", `hits (last ${timeBox / 1000} sec)` ], colWidths: [ 20, 20, 30 ] });
    Object.values(stats).forEach((section) => {
      section.cleanLogsOlderThan(currentTimeStamp - timeBox);
      const hits = section.getAllTimesHits();
      if (hits > topSection.hits) {
        topSection.name = section.name;
        topSection.hits = hits;
      }
      table.push([ section.name, `${section.getErrorRate()} %`, section.getHits() ]);
    });
    console.log(`Most Visited Section (all time) : ${topSection.name} (${topSection.hits})`); // eslint-disable-line no-console
    console.log(table.toString()); // eslint-disable-line no-console
    console.log(`refresh at ${new Date(currentTimeStamp).toISOString()}`); // eslint-disable-line no-console
    console.log(""); // eslint-disable-line no-console
  };

module.exports = {
  addAlert,
  getAlerts,
  print,
};
