# Changelog

## Unreleased

### Added

- Add `Markup` component.
- [prop-types](http://npmjs.com/package/prop-types) dependency for `Markup` component.

### Changed

- **BREAKING** Requires React peer-dependency to be 16.6.0 or newer.
- **BREAKING** `renderMarkup` is now a named export.
- `renderMarkup` returns `null` early if passed an empty string.
