/* eslint-disable no-unused-vars */
const assets = require("chai");
const { describe, it } = require("mocha");
const { lf } = global.lf || require("index.js");

describe("CRLF Converter", () => {
  describe("lf", () => {
    it("should replace CRLF at the beginning of a string", () => {
      const result = lf`\r\nHello there.`;
      assets(result.startsWith('\nHello'));
    });

    it("should replace CRLF at the end of a string", () => {
      const result = lf`Hello there.\r\n`;
      assets(result.endsWith('there.\n'));
    });

    it("should replace CRLF in the middle of a string", () => {
      const result = lf`Hello \r\n\r\nthere.`;
      assets(result.includes('o \n\nt'))
      // Use `String.prototype.includes()`
    });
  });
});
