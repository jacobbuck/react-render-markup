import PropTypes from 'prop-types';
import { JSDOM } from 'jsdom';
import * as React from 'react';
import nodesToElements from '../nodesToElements';

const parseHTML = (html) => JSDOM.fragment(html).childNodes;

test('renders a tree of element and text nodes', () => {
  const nodeList = parseHTML('<div id="foo"><p>Hello!</p></div>');
  expect(nodesToElements(nodeList, {})).toEqual([
    React.createElement('div', { key: 'div-0', id: 'foo' }, [
      React.createElement('p', { key: 'p-0' }, ['Hello!']),
    ]),
  ]);
});

describe('doesn’t render unwanted nodes', () => {
  test('nodes which aren’t element or text type', () => {
    const nodeList = [
      { nodeType: 4 }, // CDATA_SECTION_NODE
      { nodeType: 7 }, // PROCESSING_INSTRUCTION_NODE
      { nodeType: 8 }, // COMMENT_NODE
      { nodeType: 9 }, // DOCUMENT_NODE
      { nodeType: 10 }, // DOCUMENT_TYPE_NODE
      { nodeType: 11 }, // DOCUMENT_FRAGMENT_NODE
    ];
    expect(nodesToElements(nodeList, {})).toBeNull();
  });

  test('script elements', () => {
    const nodeList = parseHTML('<script>alert("XSS!")</script>');
    expect(nodesToElements(nodeList, {})).toBeNull();
  });
});

describe('handles `allowed` property on `options`', () => {
  const nodeList = parseHTML('<div></div><span>Hello!</span><hr>');

  test('only renders elements of type in array', () => {
    const allowed = ['div', 'hr'];
    expect(nodesToElements(nodeList, { allowed })).toEqual([
      React.createElement('div', { key: 'div-0' }, null),
      React.createElement('hr', { key: 'hr-2' }, null),
    ]);
  });

  test('only renders elements when function returns true', () => {
    const allowed = (node) => node.nodeType !== 1 || node.childNodes.length > 0;
    expect(nodesToElements(nodeList, { allowed })).toEqual([
      React.createElement('span', { key: 'span-1' }, ['Hello!']),
    ]);
  });
});

describe('handles `replace` property on `options`', () => {
  const nodeList = parseHTML(
    '<div><h1>Hello!</h1></div><p>This is a <strong>test</strong></p><hr><figure><img src="test.png"></figure>'
  );

  const TestComponent = ({ children }) =>
    React.createElement('p', { className: 'fancy styles' }, children);
  TestComponent.propTypes = { children: PropTypes.node };

  test('replaces type with replacement defined in object', () => {
    const replace = {
      div: 'header',
      h1: undefined,
      p: TestComponent,
      strong: React.Fragment,
      hr: null,
    };
    expect(nodesToElements(nodeList, { replace })).toEqual([
      React.createElement('header', { key: 'header-0' }, [
        React.createElement('h1', { key: 'h1-0' }, ['Hello!']),
      ]),
      React.createElement(TestComponent, { key: 'TestComponent-1' }, [
        'This is a ',
        React.createElement(React.Fragment, { key: 'Unknown-1' }, ['test']),
      ]),
      React.createElement('figure', { key: 'figure-3' }, [
        React.createElement('img', { key: 'img-0', src: 'test.png' }, null),
      ]),
    ]);
  });

  test('replaces type with replacement returns from function', () => {
    const replace = (node) => {
      if (node.nodeName.toLowerCase() === 'div') {
        return TestComponent;
      }
    };
    expect(nodesToElements(nodeList, { replace })).toEqual([
      React.createElement(TestComponent, { key: 'TestComponent-0' }, [
        React.createElement('h1', { key: 'h1-0' }, ['Hello!']),
      ]),
      React.createElement('p', { key: 'p-1' }, [
        'This is a ',
        React.createElement('strong', { key: 'strong-1' }, ['test']),
      ]),
      React.createElement('hr', { key: 'hr-2' }, null),
      React.createElement('figure', { key: 'figure-3' }, [
        React.createElement('img', { key: 'img-0', src: 'test.png' }, null),
      ]),
    ]);
  });
});

describe('handles `trim` property on `options`', () => {
  test('removes whitespace text nodes when `true`', () => {
    const nodeList = parseHTML('   <h1> Hello! </h1>   ');
    expect(nodesToElements(nodeList, { trim: true })).toEqual([
      React.createElement('h1', { key: 'h1-1' }, [' Hello! ']),
    ]);
  });
});
