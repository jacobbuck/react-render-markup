# Changelog

## v3.6.0 - 2023-06-15

### Changed

- Updated [dom-parse](https://www.npmjs.com/package/dom-parse) dependency to v3.0.0.

## v3.5.0 - 2022-04-14

### Changed

- Updated [prop-types](https://www.npmjs.com/package/prop-types) dependency to v15.8.1.
- Updated [tiny-invariant](https://www.npmjs.com/package/tiny-invariant) dependency to v1.2.0.
- Updated [react](https://www.npmjs.com/package/react) peer-dependency to also support v18.
- Updated `replace` option to also allow `false` to skip rendering replacement.

## v3.4.0 - 2021-04-24

### Added

- Added [tiny-invariant](https://www.npmjs.com/package/tiny-invariant) dependency.

### Changed

- Changed type checking in `renderMarkup` function to use `invariant` function.
- Updated [css-to-style](https://www.npmjs.com/package/css-to-style) dependency to v1.4.0.
- Updated [dom-parse](https://www.npmjs.com/package/dom-parse) dependency to v2.1.0.
- Updated `options` parameter in `renderMarkup` to handle `null`.
- Updated `Markup.propTypes` to only be defined in non-production environments.
- Updated `replace` option to handle React elements as replacement.

### Removed

- Removed [kind-of](https://www.npmjs.com/package/kind-of) dependency.

## v3.3.0 - 2020-11-07

### Added

- Added source maps to build output.

### Changed

- Updated `allowed` option to allow callback function passed to conditionally filter elements.
- Updated `replace` option to allow callback function passed to conditionally replace elements.
- Updated `replace` option to skip replacing element if replacement is `undefined`.
- Updated `Markup` component to use internal functions directly instead of `renderMarkup`.

### Removed

- Removed invalid items from list of attributes/property names.

## v3.2.0 - 2020-11-01

### Changed

- Refactored internals to handle more attribute names.

### Fixed

- Fixed an issue where camelCased elements (i.e. `<linearGradient>`) would be incorrectly lowercased.
- Fixed `allowed` and `replace` options to correctly treat tag names as case-sensitive.

## v3.1.0 - 2020-10-31

### Added

- Added type checking of properties in `options` parameter.
- Added [kind-of](https://www.npmjs.com/package/kind-of) dependency.

### Changed

- Improved type checking of `markup` and `options` parameters.
- Refactored `attrToPropName` for more robust prop-name lookup.
- Updated [react](https://www.npmjs.com/package/react) peer-dependency to also support v17.

### Removed

- Removed `defaultProps` in favour of default values in object destructuring.

## v3.0.0 - 2020-09-02

### Added

- Added `Markup` component.
- Added [prop-types](https://www.npmjs.com/package/prop-types) dependency.

### Changed

- **BREAKING** Requires [react](https://www.npmjs.com/package/react) peer-dependency to be v16.6.0 or newer.
- Updated [dom-parse](https://www.npmjs.com/package/dom-parse) dependency to v2.0.3.
- `renderMarkup` is now a named export.
- `renderMarkup` returns `null` early if passed an empty string.
- Updated `propTypes` to only be defined in non-production environments.

### Removed

- **BREAKING** Removed `renderMarkup` as default export.

## v2.1.3 - 2020-07-04

### Changed

- Improved generation of keys with [react-display-name](https://www.npmjs.com/package/react-display-name).

## v2.1.2 - 2020-07-03

### Changed

- Improved performance of prop names lookup.
- Updated [css-to-style](https://www.npmjs.com/package/css-to-style) dependency to v1.3.3.

## v2.1.1 - 2020-07-03

### Added

- Set `"sideEffects": false` in [package.json](./package.json).

### Changed

- Refactored internals for lighter code and better performance.
- Updated [dom-parse](https://www.npmjs.com/package/dom-parse) dependency to v2.0.2.

## v2.1.0 - 2020-06-23

### Added

- Added `trim` option to remove whitespace text nodes.

### Changed

- Refactored internals to filter allowed elements earlier.

## v2.0.5 - 2020-06-23

### Fixed

- Fixed a bug where ReactDOM will throw an exception on void element tags.

## v2.0.4 - 2020-06-13

### Fixed

- Updated `allowed` option logic to work.

## v2.0.3 - 2020-06-13

### Added

- More documentation and examples to [readme.md](./readme.md).

### Changed

- Refactored internals.

## v2.0.2 - 2020-06-09

### Added

- Added CommonJS build.
- Added `module` property in [package.json](./package.json) to ES Module build.

### Changed

- Updated [css-to-style](https://www.npmjs.com/package/css-to-style) dependency to v1.3.1.
- Updated [dom-parse](https://www.npmjs.com/package/dom-parse) dependency to v2.0.1.

## v2.0.1 - 2020-06-09

### Changed

- Improved type-checking of `markup` parameter.
- Refactored internals.

## v2.0.0 - 2020-06-09

### Added

- Added `allowed` option.
- Updated `markup` parameter to now handle `null` and `undefined`.

### Changed

- **BREAKING** CommonJS build has been replaced with ES Module build.
- Improved type-checking of `markup` parameter.
- Refactored internals.
- Replaced internal DOM parser and [jsdom](https://www.npmjs.com/package/jsdom) with [dom-parse](https://www.npmjs.com/package/dom-parse).

### Removed

- Removed explicit check for void elements with [html-void-elements](https://www.npmjs.com/package/html-void-elements).

## v1.2.2 - 2020-04-27

### Changed

- Updated [html-void-elements](https://www.npmjs.com/package/html-void-elements) dependency to v1.0.5.
- Updated [jsdom](https://www.npmjs.com/package/jsdom) dependency to v16.2.2.

## v1.2.1 - 2020-01-14

## v1.2.0 - 2020-01-13

### Added

- Added `engines` property in [package.json](./package.json).

### Changed

- Upgraded [jsdom](https://www.npmjs.com/package/html-void-elements) to v16.0.0.

## v1.1.2 - 2020-01-13

## v1.1.1 - 2020-01-13

### Changed

- Changed `main` property in [package.json](./package.json) to browser build.

## v1.1.0 - 2020-01-11

### Added

- Added built-in support for server-side rendering—again.
- Added [jsdom](https://www.npmjs.com/package/jsdom) for parsing DOM on Node.js.
- Added browser and server builds.

### Changed

- Updated [css-to-style](https://www.npmjs.com/package/css-to-style) dependency to v1.3.0.

### Removed

- Removed SSR section of [readme.md](./readme.md).

## v1.0.4 - 2019-06-15

### Changed

- Updated [html-void-elements](https://www.npmjs.com/package/html-void-elements) dependency to v1.0.4.

## v1.0.3 - 2019-02-24

### Removed

- Removed dead code.

## v1.0.2 - 2019-02-24

### Added

- Added check for reserved react prop names (i.e. `key`, `dangerouslySetInnerHTML`, etc.)
- Added type-checking for `options` parameter.

### Removed

- Removed explicit check for valid HTML, MathML and SVG element tags.
- Removed [html-tag-names](https://www.npmjs.com/package/html-tag-names), [mathml-tag-names](https://www.npmjs.com/package/mathml-tag-names) and [svg-tag-names](https://www.npmjs.com/package/svg-tag-names).

## v1.0.1 - 2019-02-23

### Added

- Added SSR section to [readme.md](./readme.md).

### Removed

- Removed [jsdom](https://www.npmjs.com/package/jsdom) dependency, due to it inflating bundle size.

## v1.0.0 - 2019-02-23

### Added

- Added type-checking of `markup` parameter.

### Changed

- **BREAKING** Changed DOM parser from XHTML to HTML document type.
- **BREAKING** Updated `markup` parameter to require a string.
- Builds are now done with [Rollup](http://rollupjs.org).
- Updated [css-to-style](https://www.npmjs.com/package/css-to-style) dependency to v1.2.1.
- Refactored internals.
- Replaced [xmldom](https://www.npmjs.com/package/xmldom) with [jsdom](https://www.npmjs.com/package/jsdom).

## v0.2.0 - 2018-09-27

### Added

- Returns `null` if `markup` parameter is falsey or not a string.

## v0.1.0 - 2018-08-06

Initial public version! :tada:
