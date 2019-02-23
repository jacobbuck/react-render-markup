const parser = new window.DOMParser();

const parseDom = markup => {
  const doc = parser.parseFromString(
    `<!DOCTYPE html>\n<html><body>${markup}</body></html>`,
    'text/html'
  );

  return doc.getElementsByTagName('body')[0].childNodes;
};

export default parseDom;
