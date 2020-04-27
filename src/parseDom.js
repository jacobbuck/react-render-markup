let parseDom;

if (process.env.BROWSER) {
  let parser = null;

  parseDom = (markup) => {
    if (parser === null) {
      parser = new window.DOMParser();
    }

    const doc = parser.parseFromString(
      `<!DOCTYPE html>\n<html><body>${markup}</body></html>`,
      'text/html'
    );

    return doc.getElementsByTagName('body')[0].childNodes;
  };
} else {
  const { JSDOM } = require('jsdom');

  parseDom = (markup) => {
    const frag = JSDOM.fragment(markup);
    return frag.childNodes;
  };
}

export default parseDom;
