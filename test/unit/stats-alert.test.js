const sa = require("../../lib/helpers/stats-alert"),
  Section = require("../../Section");


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
    expect(sa.getAlerts(alerts).split("\n").length).toEqual(5); // 3 alert + no alert + 1
    alerts.push("pwet");
    expect(sa.getAlerts(alerts).split("\n").length).toEqual(7); // 3 alert + no alert + 1 alert + no alert + 1
  });
});

describe("print stufs", () => {
  "use strict";

  test("no output", () => {
    const consoleSpy = jest.spyOn(console, "log");
    sa.print({}, [], 10); // eslint-disable-line no-console
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(5);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, "");
    expect(consoleSpy).toHaveBeenNthCalledWith(2, "Most Visited Section (all time) :  (0)");
    consoleSpy.mockRestore();
  });
  test("out some alert", () => {
    const consoleSpy = jest.spyOn(console, "log");
    sa.print({}, [ "pif", "paf" ], 10); // eslint-disable-line no-console
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(6);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, "");
    expect(consoleSpy).toHaveBeenNthCalledWith(2, `pif\npaf\n${"End alert".green}\n`.red);
    expect(consoleSpy).toHaveBeenNthCalledWith(3, "Most Visited Section (all time) :  (0)");

    consoleSpy.mockRestore();
  });
  test("out most visited sec", () => {
    const consoleSpy = jest.spyOn(console, "log"),
      sec1 = new Section("pl1"),
      sec2 = new Section("pl2");
    sec1.status.ok = 3;
    sec1.status.ko = 1;
    sec2.status.ko = 10;
    sa.print({ sec1, sec2 }, [], 10); // eslint-disable-line no-console
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(5);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, "");
    expect(consoleSpy).toHaveBeenNthCalledWith(2, "Most Visited Section (all time) : pl2 (10)");

    consoleSpy.mockRestore();
  });
});

