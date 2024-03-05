import { describe, expect, test } from 'vitest';
import PropTypes from 'prop-types';
import * as React from 'react';
import nodesToElements from '../nodesToElements';

test('renders a tree of element and text nodes', () => {
  // <p id="foo">Hello <strong>World!</strong></p>
  const nodeList = [
    {
      attributes: [{ name: 'id', value: 'foo' }],
      childNodes: [
        { nodeType: 3, textContent: 'Hello ' },
        {
          attributes: [],
          childNodes: [{ nodeType: 3, textContent: 'World!' }],
          nodeName: 'STRONG',
          nodeType: 1,
        },
      ],
      nodeName: 'P',
      nodeType: 1,
    },
  ];
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
    expect(nodesToElements(nodeList, {})).toBeNull();
  });

  test('script elements', () => {
    const nodeList = [
      {
        attributes: [],
        childNodes: [{ nodeType: 3, textContent: 'alert("XSS!"' }],
        nodeName: 'SCRIPT',
        nodeType: 1,
      },
    ];
    expect(nodesToElements(nodeList, {})).toBeNull();
  });
});

describe('handles `allowed` property on `options`', () => {
  // <div></div><span>Hello!</span><hr>
  const nodeList = [
    {
      attributes: [],
      childNodes: [],
      nodeName: 'DIV',
      nodeType: 1,
    },
    {
      attributes: [],
      childNodes: [{ nodeType: 3, textContent: 'Hello!' }],
      nodeName: 'SPAN',
      nodeType: 1,
    },
    {
      attributes: [],
      childNodes: [],
      nodeName: 'HR',
      nodeType: 1,
    },
  ];
  test('only renders elements of type in array', () => {
    const allowed = ['div', 'hr'];
    expect(nodesToElements(nodeList, { allowed })).toMatchInlineSnapshot(`
      [
        <div />,
        <hr />,
      ]
    `);
  });

  test('only renders elements when function returns true', () => {
    const allowed = (node) => node.nodeType !== 1 || node.childNodes.length > 0;
    expect(nodesToElements(nodeList, { allowed })).toMatchInlineSnapshot(`
      [
        <span>
          Hello!
        </span>,
      ]
    `);
  });
});

describe('handles `replace` property on `options`', () => {
  // <p id="foo">Hello <strong>World!</strong></p>
  const nodeList = [
    {
      attributes: [{ name: 'id', value: 'foo' }],
      childNodes: [
        { nodeType: 3, textContent: 'Hello ' },
        {
          attributes: [],
          childNodes: [{ nodeType: 3, textContent: 'World!' }],
          nodeName: 'STRONG',
          nodeType: 1,
        },
      ],
      nodeName: 'P',
      nodeType: 1,
    },
  ];

  test('replaces element type with element type as replacement', () => {
    const replace = { strong: 'em' };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
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

    const replace = { strong: Example };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
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
    const replace = { strong: React.Fragment };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
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

  test('removes element with null as replacement', () => {
    const replace = { strong: null };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
      [
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
    const replace = { strong: React.createElement('em') };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
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
    const replace = (node) => {
      if (node.nodeName.toLowerCase() === 'p') {
        return 'div';
      }
    };
    expect(nodesToElements(nodeList, { replace })).toMatchInlineSnapshot(`
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
    // ···<h1>·Hello!·</h1>···
    const nodeList = [
      { nodeType: 3, textContent: '   ' },
      {
        attributes: [],
        childNodes: [{ nodeType: 3, textContent: ' Hello! ' }],
        nodeName: 'H1',
        nodeType: 1,
      },
      { nodeType: 3, textContent: '   ' },
    ];
    expect(nodesToElements(nodeList, { trim: true })).toMatchInlineSnapshot(`
      [
        <h1>
           Hello! 
        </h1>,
      ]
    `);
  });
});
