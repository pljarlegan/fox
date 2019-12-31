const
  moment = require("moment"),
  log = (line) => {
    "use strict";

    const
      logRegex = /^(\S+) (\S+) (\S+) \[([\w:/]+\s[+\-]\d{4})\] "(\S+)\s?(\S+)?\s?(\S+)?" (\d{3}|-) (\d+|-)\s?"?([^"]*)"?\s?"?([^"]*)?"?$/,
      [
        ,
        remoteHost,
        ,
        authUser,
        date,
        method,
        request,
        version,
        status,
        bytes,
      ] = line.match(logRegex) || [];
    if (remoteHost === undefined) {
      return null;
    }
    return {
      remoteHost,
      authUser,
      date: Date.parse(moment(date, "DD/MMM/YYYY:HH:mm:ss Z").format("YYYY-MM-DD HH:mm:ss")),
      method,
      request,
      version,
      status: parseInt(status),
      bytes: parseInt(bytes),
    };
  };
/*
The Common Logfile Format
    127.0.0.1 - james [09/May/2018:16:00:39 +0000] "GET /report HTTP/1.0" 200 123
The common logfile format is as follows:

    remotehost rfc931 authuser [date] "request" status bytes

remotehost
    Remote hostname (or IP number if DNS hostname is not available, or if DNSLookup is Off.
rfc931
    The remote logname of the user.
authuser
    The username as which the user has authenticated himself.
[date]
    Date and time of the request.
"request"
    The request line exactly as it came from the client.
status
    The HTTP status code returned to the client.
bytes
    The content-length of the document transferred.

 */
module.exports = {
  log,
};
