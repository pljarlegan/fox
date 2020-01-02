const sa = require("../../lib/helpers/stats-alert");


describe("stats-alerts", () => {
  "use strict";

  test("get alert : no alert", () => {
    const alerts = [];
    expect(sa.getAlerts(alerts)).isPrototypeOf(String);
    expect(sa.getAlerts(alerts)).toEqual("");
  });

  test("get alert : some alerts", () => {
    const alerts = [];
    alerts.push("pif", "paf", "pouf");
    expect(sa.getAlerts(alerts)).isPrototypeOf(String);
    expect(sa.getAlerts(alerts).split("\n").length).toEqual(5);
    alerts.push("pwet");
    expect(sa.getAlerts(alerts).split("\n").length).toEqual(7);
  });
});
