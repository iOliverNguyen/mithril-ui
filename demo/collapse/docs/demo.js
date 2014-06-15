
define('collapse/docs/demo', function(require, module, exports) {

/** @jsx m */
// START
var demo = {};
demo.controller = function() {

};

demo.view = function(ctrl) {
  return m("div", ["Demo"]);
};
// END

demo.doc = m("div", [
  m("p", ["Document"])
]);
module.exports = demo;
}); // collapse/docs/demo
