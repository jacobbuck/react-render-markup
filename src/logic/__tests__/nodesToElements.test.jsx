// @jsxRuntime automatic
import PropTypes from 'prop-types';
import { nodesToElements } from '../nodesToElements';

const parseHTML = (html) => {
  const el = document.createElement('template');
  el.innerHTML = html;
  return el.content.childNodes;
};

test('renders a tree of element and text nodes', () => {
  const nodeList = parseHTML('<p id="foo">Hello <strong>World!</strong></p>');
  expect(nodesToElements(nodeList, {})).toMatchInlineSnapshot(`
    [
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
    expect(nodesToElements(nodeList, {})).toEqual([]);
  });

  test('script elements', () => {
    const nodeList = parseHTML('<script>alert("XSS!")</script>');
    expect(nodesToElements(nodeList, {})).toEqual([]);
  });
});

describe('handles `allowElements` property on `options`', () => {
  const nodeList = parseHTML('<b>Hello</b><hr><i>world<s>!</s></i>');

  test('only renders elements of type in array', () => {
    const allowElements = ['b', 'i'];
    expect(nodesToElements(nodeList, { allowElements })).toMatchInlineSnapshot(`
      [
        <b>
          Hello
        </b>,
        <i>
          world
        </i>,
      ]
    `);
  });
});

describe('handles `replaceElements` property on `options`', () => {
  const nodeList = parseHTML('<p id="foo">Hello <strong>World!</strong></p>');

  test('replaces element type with element type as replacement', () => {
    const replaceElements = { strong: 'em' };
    expect(nodesToElements(nodeList, { replaceElements }))
      .toMatchInlineSnapshot(`
      [
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

    const replaceElements = { strong: <Example /> };
    expect(nodesToElements(nodeList, { replaceElements }))
      .toMatchInlineSnapshot(`
      [
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
    const replaceElements = { strong: <></> };
    expect(nodesToElements(nodeList, { replaceElements }))
      .toMatchInlineSnapshot(`
      [
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

  test('doesn’t replace element with undefined as replacement', () => {
    const replaceElements = { strong: undefined };
    expect(nodesToElements(nodeList, { replaceElements }))
      .toMatchInlineSnapshot(`
      [
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
    const replaceElements = { strong: <em /> };
    expect(nodesToElements(nodeList, { replaceElements }))
      .toMatchInlineSnapshot(`
      [
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
    const replaceElements = {
      '*': ({ children, props, type }) => {
        if (type === 'p') {
          return <div {...props}>{children}</div>;
        }
      },
    };
    expect(nodesToElements(nodeList, { replaceElements }))
      .toMatchInlineSnapshot(`
      [
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
      [
        <h1>
           Hello! 
        </h1>,
      ]
    `);
  });
});
