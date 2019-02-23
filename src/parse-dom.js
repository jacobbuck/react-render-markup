let DOMParser;
if (window && window.DOMParser) {
  DOMParser = window.DOMParser;
} else {
  DOMParser = require('xmldom').DOMParser;
}

const parser = new DOMParser();

const parseDom = markup => {
  const doc = parser.parseFromString(
    `<!DOCTYPE html>\n<html><body>${markup}</body></html>`,
    'text/html'
  );

  return doc.getElementsByTagName('body')[0].childNodes;
};

export default parseDom;
