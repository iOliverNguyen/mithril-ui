
define('datepicker/docs/demo', function(require, module, exports) {

/** @jsx m */
// START
var demo = {};
demo.controller = function() {

};

demo.view = function(ctrl) {
  return m("div", ["Datepicker"]);
};
// END

demo.doc = m("div", [
  m("p", ["Document"])
]);
module.exports = demo;
}); // datepicker/docs/demo
