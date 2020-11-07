import * as React from 'react';
import nodesToElements from '../nodesToElements';

test('renders a tree of element and text nodes', () => {
  expect(
    nodesToElements(
      [
        {
          nodeType: 1,
          nodeName: 'DIV',
          attributes: [{ name: 'id', value: 'foo' }],
          childNodes: [
            {
              nodeType: 1,
              nodeName: 'P',
              attributes: [],
              childNodes: [
                {
                  nodeType: 3,
                  textContent: 'Hello!',
                },
              ],
            },
          ],
        },
      ],
      {}
    )
  ).toEqual([
    React.createElement('div', { key: 'div-0', id: 'foo' }, [
      React.createElement('p', { key: 'p-0' }, ['Hello!']),
    ]),
  ]);
});

describe('doesn’t render unwanted nodes', () => {
  test('nodes which aren’t element or text type', () => {
    expect(
      nodesToElements(
        [
          { nodeType: 4 }, // CDATA_SECTION_NODE
          { nodeType: 7 }, // PROCESSING_INSTRUCTION_NODE
          { nodeType: 8 }, // COMMENT_NODE
          { nodeType: 9 }, // DOCUMENT_NODE
          { nodeType: 10 }, // DOCUMENT_TYPE_NODE
          { nodeType: 11 }, // DOCUMENT_FRAGMENT_NODE
        ],
        {}
      )
    ).toBeNull();
  });

  test('script elements', () => {
    expect(
      nodesToElements(
        [
          {
            nodeType: 1,
            nodeName: 'SCRIPT',
          },
        ],
        {}
      )
    ).toBeNull();
  });
});

describe('handles `allowed` property on `options`', () => {
  test('only renders elements of type in array', () => {
    expect(
      nodesToElements(
        [
          {
            nodeType: 1,
            nodeName: 'DIV',
            attributes: [],
            childNodes: [],
          },
          {
            nodeType: 1,
            nodeName: 'SPAN',
            attributes: [],
            childNodes: [
              {
                nodeType: 3,
                textContent: 'Hello!',
              },
            ],
          },
          {
            nodeType: 1,
            nodeName: 'HR',
            attributes: [],
            childNodes: [],
          },
        ],
        {
          allowed: ['div', 'hr'],
        }
      )
    ).toEqual([
      React.createElement('div', { key: 'div-0' }, null),
      React.createElement('hr', { key: 'hr-2' }, null),
    ]);
  });
});

describe('handles `replace` property on `options`', () => {
  test('replaces type as defined in key-value pair of object', () => {
    const TestComponent = () => 'Hello!';

    expect(
      nodesToElements(
        [
          {
            nodeType: 1,
            nodeName: 'DIV',
            attributes: [],
            childNodes: [],
          },
          {
            nodeType: 1,
            nodeName: 'SPAN',
            attributes: [],
            childNodes: [
              {
                nodeType: 3,
                textContent: 'Hello!',
              },
            ],
          },
          {
            nodeType: 1,
            nodeName: 'P',
            attributes: [],
            childNodes: [],
          },
          {
            nodeType: 1,
            nodeName: 'HR',
            attributes: [],
            childNodes: [],
          },
        ],
        {
          replace: {
            div: 'span',
            span: React.Fragment,
            p: TestComponent,
            hr: null,
          },
        }
      )
    ).toEqual([
      React.createElement('span', { key: 'span-0' }, null),
      React.createElement(React.Fragment, { key: 'Unknown-1' }, ['Hello!']),
      React.createElement(TestComponent, { key: 'TestComponent-2' }, null),
    ]);
  });
});

describe('handles `trim` property on `options`', () => {
  test('removes whitespace text nodes when `true`', () => {
    expect(
      nodesToElements(
        [
          {
            nodeType: 3,
            textContent: ' Hello! ',
          },
          {
            nodeType: 3,
            textContent: ' ',
          },
          {
            nodeType: 3,
            textContent: '\t\r\n',
          },
        ],
        { trim: true }
      )
    ).toEqual([' Hello! ']);
  });
});
