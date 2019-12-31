const Section = require("../../Section");

describe("section", () => {
  "use strict";


  test("empty section", () => {
    const s = new Section("pl");
    expect(s.name).toEqual("pl");
    expect(s.status.ok).toEqual(0);
    expect(s.status.ko).toEqual(0);
    expect(s.log.length).toEqual(0);
    // expect(s.alerts.length).toEqual(0);
  });

  test("add stuffs", () => {
    const s = new Section("pl");
    s.addRequest({ status: 200, request: "/moo" });
    expect(s.name).toEqual("pl");
    expect(s.status.ok).toEqual(1);
    expect(s.status.ko).toEqual(0);
    expect(s.log.length).toEqual(1);
    // expect(s.alerts.length).toEqual(0);

    s.addRequest({ status: 201, request: "/moo" });
    expect(s.name).toEqual("pl");
    expect(s.status.ok).toEqual(2);
    expect(s.status.ko).toEqual(0);
    expect(s.log.length).toEqual(2);
    // expect(s.alerts.length).toEqual(0);

    s.addRequest({ status: 500, request: "/moo" });
    expect(s.name).toEqual("pl");
    expect(s.status.ok).toEqual(2);
    expect(s.status.ko).toEqual(1);
    expect(s.log.length).toEqual(3);
    // expect(s.alerts.length).toEqual(0);
  });

  test("error rate calculation", () => {
    const s = new Section("pl");
    s.addRequest({ status: 200, request: "/moo" });
    expect(s.getErrorRate()).toEqual(0);
    s.addRequest({ status: 201, request: "/moo" });
    expect(s.getErrorRate()).toEqual(0);
    s.addRequest({ status: 500, request: "/moo" });
    expect(s.getErrorRate()).toEqual(33);
  });

  test("clean old logs", () => {
    const s = new Section();
    s.addRequest({ status: 200, date: Date.now() - 5, request: "/toKeep" });
    s.addRequest({ status: 200, date: Date.now() - 20 * 1000, request: "/toReject" });
    expect(s.log.length).toEqual(2);
    s.cleanLogsOlderThan(Date.now() - 10 * 1000); // last 10 sec
    expect(s.log.length).toEqual(1);
    expect(s.log[ 0 ].request).toEqual("/toKeep");
  });

  test("get Hits", () => {
    const s = new Section();
    expect(s.getHits()).toEqual(0);
    s.addRequest({ status: 200, request: "/moo" });
    expect(s.getHits()).toEqual(1);
  });

  // test("getAlerts (no alert)", () => {
  //   const s = new Section("pl");
  //   expect(s.alerts.length).toEqual(0);
  //   expect(s.getAlerts()).toEqual("");
  // });
  //
  // test("addAlert", () => {
  //   const s = new Section("pl");
  //   s.addAlert("something did wrong !");
  //   expect(s.alerts.length).toEqual(1);
  // });
  //
  // test("getAlerts (some alerts)", () => {
  //   const s = new Section("pl");
  //   s.addAlert(5);
  //   expect(s.alerts.length).toEqual(1);
  //   expect(s.getAlerts()).isPrototypeOf(String);
  //   s.addAlert(10);
  //   expect(s.alerts.length).toEqual(2);
  //   expect(s.getAlerts()).isPrototypeOf(String);
  // });
});
