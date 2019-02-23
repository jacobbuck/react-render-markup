let DOMParser;
if (typeof window !== 'undefined' && 'DOMParser' in window) {
  DOMParser = window.DOMParser;
} else {
  const { JSDOM } = require('jsdom');
  const { window } = new JSDOM('');
  DOMParser = window.DOMParser;
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
