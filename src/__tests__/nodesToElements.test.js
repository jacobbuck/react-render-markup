import * as React from 'react';
import nodesToElements from '../nodesToElements';

test("doesn't render nodes that aren't element or text type", () => {
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

test("doesn't render script elements", () => {
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

test('renders text nodes', () => {
  expect(
    nodesToElements(
      [
        {
          nodeType: 3,
          textContent: 'Hello!',
        },
      ],
      {}
    )
  ).toEqual(['Hello!']);
});

test('renders element nodes', () => {
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
    React.createElement('div', { key: 0, id: 'foo' }, [
      React.createElement('p', { key: 0 }, ['Hello!']),
    ]),
  ]);
});

test('handles allowed option', () => {
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
    React.createElement('div', { key: 0 }, null),
    React.createElement('hr', { key: 2 }, null),
  ]);
});

test('handles replace option', () => {
  const TestComponent = (props) => {
    return 'Hello!';
  };

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
          hr: false,
        },
      }
    )
  ).toEqual([
    React.createElement('span', { key: 0 }, null),
    React.createElement(React.Fragment, { key: 1 }, ['Hello!']),
    React.createElement(TestComponent, { key: 2 }, null),
  ]);
});

test('handles trim option', () => {
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
      {
        trim: true,
      }
    )
  ).toEqual([' Hello! ']);
});
