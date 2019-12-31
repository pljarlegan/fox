const colors = require("colors"), // eslint-disable-line no-unused-vars
  readline = require("readline"),
  TailingReadableStream = require("tailing-stream"),

  readFile = (path, lineHandler) => {
    "use strict";
    const fileStream = TailingReadableStream.createReadStream(path, { timeout: 0 }),
      readInterface = readline.createInterface({
        input: fileStream,
      });

    readInterface.on("line", (line) => {
      lineHandler(line);
    });
    return readInterface;
  };

module.exports = {
  readFile,
};
