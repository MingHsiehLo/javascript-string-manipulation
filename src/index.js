// Create a tagged template lf`...` that formats text using LF line endings.
var lf = (arr, ...interpolated) => {
  return arr.reduce((acc, value, i) => {
    let interpolatedValue = interpolated[i] !== null ? interpolated[i] : '';
    if (!Object.getOwnPropertySymbols(interpolatedValue).includes(disableConverter)) {
      interpolatedValue = transformLineEnding(interpolatedValue, lineEndings.LF);
    }
    const transformedValue = transformLineEnding(value, lineEndings.LF);
    return `${acc}${transformedValue}${interpolatedValue}`;
  }, '');
};

// Create a tagged template cr`...` that formats text using CR line endings.
var cr = (arr, ...interpolated) => {
  return arr.reduce((acc, value, i) => {
    let interpolatedValue = interpolated[i] !== null ? interpolated[i] : '';
    if (!Object.getOwnPropertySymbols(interpolatedValue).includes(disableConverter)) {
      interpolatedValue = transformLineEnding(interpolatedValue, lineEndings.CR);
    }
    const transformedValue = transformLineEnding(value, lineEndings.CR);
    return `${acc}${transformedValue}${interpolatedValue}`;
  }, '');
};

// Create a tagged template crlf`...` that formats text using CRLF line endings.
var crlf = (arr, ...interpolated) => {
  return arr.reduce((acc, value, i) => {
    let interpolatedValue = interpolated[i] !== null ? interpolated[i] : '';
    if (!Object.getOwnPropertySymbols(interpolatedValue).includes(disableConverter)) {
      interpolatedValue = transformLineEnding(interpolatedValue, lineEndings.CRLF);
    }
    const transformedValue = transformLineEnding(value, lineEndings.CRLF);
    return `${acc}${transformedValue}${interpolatedValue}`;
  }, '');
};

const transformLineEnding = (string, lineEnding) => {
  string = (string != null ? string.toString() : "");
  const {replaceLF, replaceCR, replaceCRLF} = LineEndingReplacements;
  if (lineEnding === LineEndings.CR) {
    string = replaceCRLF(string, "\r");
    string = replaceLF(string, "\r");
  } else if (lineEnding === LineEndings.LF) {
    string = replaceCRLF(string, "\n");
    string = replaceCR(string, "\n");
  } else if (lineEnding === LineEndings.CRLF) {
    string = replaceCR(string, "\r\n");
    string = replaceLF(string, "\r\n");
  }
  return string;
};

const LineEndings = {
  CR: Symbol("CR"),
  LF: Symbol("LF"),
  CRLF: Symbol("CRLF")
};

const disableConverter = Symbol.for("crlf-converter-disable");

const LineEndingReplacements = {
  replaceCR: (string, newEnding) =>
    string.replace(/(\r+)([^\n]|$)/g, (_match, p1, p2) => {
      return `${newEnding.repeat(p1.length)}${p2}`;
    }),

  replaceLF: (string, newEnding) =>
    string.replace(/([^\r]|^)(\n+)/g, (_match, p1, p2) => {
      return `${p1}${newEnding.repeat(p2.length)}`;
    }),

  replaceCRLF: (string, newEnding) => string.replace(/\r\n/g, `${newEnding}`)
};

module.exports = {
  lf,
  cr,
  crlf,
  LineEndings,
  disableConverter,
  transformLineEnding
};
