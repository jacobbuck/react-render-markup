/**
 * @jest-environment jsdom
 */
import PropTypes from 'prop-types';
import * as React from 'react';
import nodesToElements from '../nodesToElements';

const parseHTML = (html) => {
  const el = document.createElement('template');
  el.innerHTML = html;
  return el.content.childNodes;
};

test('renders a tree of element and text nodes', () => {
  const nodeList = parseHTML('<p id="foo">Hello <strong>World!</strong></p>');
  expect(nodesToElements(nodeList, {})).toMatchInlineSnapshot(`
    Array [
      <p
        id="foo"
      >
        Hello 
        <strong>
          World!
        </strong>
      </p>,
    ]
  `);
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
    expect(nodesToElements(nodeList, { allowed })).toMatchInlineSnapshot(`
      Array [
        <div />,
        <hr />,
      ]
    `);
  });

  test('only renders elements when function returns true', () => {
    const allowed = (node) => node.nodeType !== 1 || node.childNodes.length > 0;
    expect(nodesToElements(nodeList, { allowed })).toMatchInlineSnapshot(`
      Array [
        <span>
          Hello!
        </span>,
      ]
    `);
  });
});

describe('handles `replace` property on `options`', () => {
  const nodeList = parseHTML('<p id="foo">Hello <strong>World!</strong></p>');

  test('replaces element type with element type as replacement', () => {
    const replace = { strong: 'em' };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
      Array [
        <p
          id="foo"
        >
          Hello 
          <em>
            World!
          </em>
        </p>,
      ]
    `);
  });

  test('replaces element type with React Component as replacement', () => {
    const Example = ({ children }) => children;
    Example.propTypes = { children: PropTypes.node };

    const replace = { strong: Example };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
      Array [
        <p
          id="foo"
        >
          Hello 
          <Example>
            World!
          </Example>
        </p>,
      ]
    `);
  });

  test('replaces element type with React Fragment as replacement', () => {
    const replace = { strong: React.Fragment };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
      Array [
        <p
          id="foo"
        >
          Hello 
          <React.Fragment>
            World!
          </React.Fragment>
        </p>,
      ]
    `);
  });

  test('removes element with null as replacement', () => {
    const replace = { strong: null };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
      Array [
        <p
          id="foo"
        >
          Hello 
        </p>,
      ]
    `);
  });

  test('doesn’t replace element with undefined as replacement', () => {
    const replace = { strong: undefined };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
      Array [
        <p
          id="foo"
        >
          Hello 
          <strong>
            World!
          </strong>
        </p>,
      ]
    `);
  });

  test('merges element with clone of React Element as replacement', () => {
    const replace = { strong: React.createElement('em') };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
      Array [
        <p
          id="foo"
        >
          Hello 
          <em>
            World!
          </em>
        </p>,
      ]
    `);
  });

  test('replaces type with replacement returned from function', () => {
    const replace = (node) => {
      if (node.nodeName.toLowerCase() === 'p') {
        return 'div';
      }
    };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
      Array [
        <div
          id="foo"
        >
          Hello 
          <strong>
            World!
          </strong>
        </div>,
      ]
    `);
  });
});

describe('handles `trim` property on `options`', () => {
  test('removes whitespace text nodes when `true`', () => {
    const nodeList = parseHTML('   <h1> Hello! </h1>   ');
    expect(nodesToElements(nodeList, { trim: true })).toMatchInlineSnapshot(`
      Array [
        <h1>
           Hello! 
        </h1>,
      ]
    `);
  });
});
