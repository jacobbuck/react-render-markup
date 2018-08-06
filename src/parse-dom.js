import { DOMParser } from 'xmldom';

const parser = new DOMParser();

const parseDom = markup => {
  const doc = parser.parseFromString(
    `<!DOCTYPE html>\n<html><body>${markup}</body></html>`,
    'application/xhtml+xml'
  );

  return doc.getElementsByTagName('body')[0].childNodes;
};

export default parseDom;
