
define('timepicker/docs/demo', function(require, module, exports) {

// START
var demo = {};
demo.controller = function() {

};

demo.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {},
    children: ["Demo"]
  };
};
// END

demo.doc = {
  tag: "div",
  attrs: {},
  children: [{
    tag: "p",
    attrs: {},
    children: ["Document"]
  }]
};
demo.files = {
  'demo.jsx': "// START\nvar demo = {};\ndemo.controller = function() {\n\n};\n\ndemo.view = function(ctrl) {\n  return INCLUDE('./template');\n};\n// END\n\ndemo.doc =  INCLUDE('./readme');\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx'),\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>Demo</div>\n",
};
module.exports = demo;
}); // timepicker/docs/demo
