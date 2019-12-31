const ls = require("../../lib/helpers/line-splitter");

describe("test line splitter log", () => {
  "use strict";

  [
    {
      in: "127.0.0.1 - james [09/May/2018:16:00:39 +0000] \"GET /report HTTP/1.0\" 200 123",
      out: {
        remoteHost: "127.0.0.1",
        authUser: "james",
        date: 1525881639000,
        method: "GET",
        request: "/report",
        version: "HTTP/1.0",
        status: 200,
        bytes: 123,
      },
    },
    {
      in: "127.0.0.1 - jill [09/May/2018:16:00:41 +0000] \"GET /api/user HTTP/1.0\" 200 234",
      out: {
        remoteHost: "127.0.0.1",
        authUser: "jill",
        date: 1525881641000,
        method: "GET",
        request: "/api/user",
        version: "HTTP/1.0",
        status: 200,
        bytes: 234,
      },
    },
  ].map((line) => {
    test(`test ok ${line.in}`, () => {
      expect(ls.log(line.in)).toMatchObject(line.out);
    });
  });
  [
    {
      in: "unprocessable log",
      out: null,
    },
  ].map((line) => {
    test(`test ko ${line.in}`, () => {
      expect(ls.log(line.in)).toEqual(line.out);
    });
  });
});
