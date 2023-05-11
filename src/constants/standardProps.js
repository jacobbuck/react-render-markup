// Mapping of standard attribute names to prop names.
// Based off https://github.com/facebook/react/blob/feb134c30d20ef332771d71d8d1cb66d34311637/packages/react-dom/src/shared/possibleStandardNames.js
export const standardProps = {
  // HTML
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  allowfullscreen: 'allowFullScreen',
  autocapitalize: 'autoCapitalize',
  autocomplete: 'autoComplete',
  autocorrect: 'autoCorrect',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  autosave: 'autoSave',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  charset: 'charSet',
  class: 'className',
  classid: 'classID',
  classname: 'className',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controlslist: 'controlsList',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  disablepictureinpicture: 'disablePictureInPicture',
  disableremoteplayback: 'disableRemotePlayback',
  enctype: 'encType',
  enterkeyhint: 'enterKeyHint',
  for: 'htmlFor',
  formmethod: 'formMethod',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  hreflang: 'hrefLang',
  htmlfor: 'htmlFor',
  'http-equiv': 'httpEquiv',
  inputmode: 'inputMode',
  itemid: 'itemID',
  itemprop: 'itemProp',
  itemref: 'itemRef',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  keyparams: 'keyParams',
  keytype: 'keyType',
  marginwidth: 'marginWidth',
  marginheight: 'marginHeight',
  maxlength: 'maxLength',
  mediagroup: 'mediaGroup',
  minlength: 'minLength',
  nomodule: 'noModule',
  novalidate: 'noValidate',
  playsinline: 'playsInline',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rowspan: 'rowSpan',
  spellcheck: 'spellCheck',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  tabindex: 'tabIndex',
  usemap: 'useMap',

  // SVG
  'accent-height': 'accentHeight',
  'alignment-baseline': 'alignmentBaseline',
  allowreorder: 'allowReorder',
  'arabic-form': 'arabicForm',
  attributename: 'attributeName',
  attributetype: 'attributeType',
  autoreverse: 'autoReverse',
  basefrequency: 'baseFrequency',
  'baseline-shift': 'baselineShift',
  baseprofile: 'baseProfile',
  calcmode: 'calcMode',
  'cap-height': 'capHeight',
  'clip-path': 'clipPath',
  clippathunits: 'clipPathUnits',
  'clip-rule': 'clipRule',
  'color-interpolation': 'colorInterpolation',
  'color-interpolation-filters': 'colorInterpolationFilters',
  'color-profile': 'colorProfile',
  'color-rendering': 'colorRendering',
  contentscripttype: 'contentScriptType',
  contentstyletype: 'contentStyleType',
  diffuseconstant: 'diffuseConstant',
  dominantbaseline: 'dominantBaseline',
  'dominant-baseline': 'dominantBaseline',
  edgemode: 'edgeMode',
  'enable-background': 'enableBackground',
  externalresourcesrequired: 'externalResourcesRequired',
  'fill-opacity': 'fillOpacity',
  'fill-rule': 'fillRule',
  filterres: 'filterRes',
  filterunits: 'filterUnits',
  'flood-opacity': 'floodOpacity',
  'flood-color': 'floodColor',
  fontfamily: 'fontFamily',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-size-adjust': 'fontSizeAdjust',
  'font-stretch': 'fontStretch',
  'font-style': 'fontStyle',
  'font-variant': 'fontVariant',
  'font-weight': 'fontWeight',
  'glyph-name': 'glyphName',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  glyphref: 'glyphRef',
  gradienttransform: 'gradientTransform',
  gradientunits: 'gradientUnits',
  'horiz-adv-x': 'horizAdvX',
  'horiz-origin-x': 'horizOriginX',
  'image-rendering': 'imageRendering',
  kernelmatrix: 'kernelMatrix',
  kernelunitlength: 'kernelUnitLength',
  keypoints: 'keyPoints',
  keysplines: 'keySplines',
  keytimes: 'keyTimes',
  lengthadjust: 'lengthAdjust',
  'letter-spacing': 'letterSpacing',
  'lighting-color': 'lightingColor',
  limitingconeangle: 'limitingConeAngle',
  'marker-end': 'markerEnd',
  markerheight: 'markerHeight',
  'marker-mid': 'markerMid',
  'marker-start': 'markerStart',
  markerunits: 'markerUnits',
  markerwidth: 'markerWidth',
  maskcontentunits: 'maskContentUnits',
  maskunits: 'maskUnits',
  numoctaves: 'numOctaves',
  'overline-position': 'overlinePosition',
  'overline-thickness': 'overlineThickness',
  paintorder: 'paintOrder',
  'paint-order': 'paintOrder',
  'panose-1': 'panose1',
  pathlength: 'pathLength',
  patterncontentunits: 'patternContentUnits',
  patterntransform: 'patternTransform',
  patternunits: 'patternUnits',
  pointerevents: 'pointerEvents',
  'pointer-events': 'pointerEvents',
  pointsatx: 'pointsAtX',
  pointsaty: 'pointsAtY',
  pointsatz: 'pointsAtZ',
  preservealpha: 'preserveAlpha',
  preserveaspectratio: 'preserveAspectRatio',
  primitiveunits: 'primitiveUnits',
  refx: 'refX',
  refy: 'refY',
  'rendering-intent': 'renderingIntent',
  repeatcount: 'repeatCount',
  repeatdur: 'repeatDur',
  requiredextensions: 'requiredExtensions',
  requiredfeatures: 'requiredFeatures',
  'shape-rendering': 'shapeRendering',
  specularconstant: 'specularConstant',
  specularexponent: 'specularExponent',
  spreadmethod: 'spreadMethod',
  startoffset: 'startOffset',
  stddeviation: 'stdDeviation',
  stitchtiles: 'stitchTiles',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'strikethrough-position': 'strikethroughPosition',
  'strikethrough-thickness': 'strikethroughThickness',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-width': 'strokeWidth',
  'stroke-opacity': 'strokeOpacity',
  surfacescale: 'surfaceScale',
  systemlanguage: 'systemLanguage',
  tablevalues: 'tableValues',
  targetx: 'targetX',
  targety: 'targetY',
  'text-anchor': 'textAnchor',
  'text-decoration': 'textDecoration',
  textlength: 'textLength',
  'text-rendering': 'textRendering',
  'underline-position': 'underlinePosition',
  'underline-thickness': 'underlineThickness',
  'unicode-bidi': 'unicodeBidi',
  'unicode-range': 'unicodeRange',
  'units-per-em': 'unitsPerEm',
  'v-alphabetic': 'vAlphabetic',
  'vector-effect': 'vectorEffect',
  'vert-adv-y': 'vertAdvY',
  'vert-origin-x': 'vertOriginX',
  'vert-origin-y': 'vertOriginY',
  'v-hanging': 'vHanging',
  'v-ideographic': 'vIdeographic',
  viewbox: 'viewBox',
  viewtarget: 'viewTarget',
  'v-mathematical': 'vMathematical',
  'word-spacing': 'wordSpacing',
  'writing-mode': 'writingMode',
  xchannelselector: 'xChannelSelector',
  'x-height': 'xHeight',
  'xlink:actuate': 'xlinkActuate',
  'xlink:arcrole': 'xlinkArcrole',
  'xlink:href': 'xlinkHref',
  'xlink:role': 'xlinkRole',
  'xlink:show': 'xlinkShow',
  'xlink:title': 'xlinkTitle',
  'xlink:type': 'xlinkType',
  'xml:base': 'xmlBase',
  'xml:lang': 'xmlLang',
  'xml:space': 'xmlSpace',
  'xmlns:xlink': 'xmlnsXlink',
  ychannelselector: 'yChannelSelector',
  zoomandpan: 'zoomAndPan',
};
