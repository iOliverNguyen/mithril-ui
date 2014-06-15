
define('tabs/docs/demo', function(require, module, exports) {

/** @jsx m */
// START
var demo = {};
demo.controller = function() {
  this.tabs = m.u.init(m.ui.tabs([{
    label: 'Tab 1',
    module: tab1
  }, {
    label: 'Tab 2',
    module: tab2
  }]));
};

demo.view = function(ctrl) {
  return m("div", [
    ctrl.tabs.$view()
  ]);
};

var tab1 = {};
tab1.controller = function() {};
tab1.view = function(ctrl) {
  return m("div", ["This is tab 1 content"]);
};

var tab2 = {};
tab2.controller = function() {};
tab2.view = function(ctrl) {
  return m("div", ["This is tab 2 content"]);
};
// END

demo.doc = m("div", [
  m("p", ["Tabs is a Mithril version of ", m("a", {
    href: "http://getbootstrap.com/javascript/#tabs"
  }, ["Bootstrap's tabs plugin"]), "."]),
  m("h3", {
    id: "settings"
  }, ["Settings"]),
  m("ul", [
    m("li", [m("p", [m("code", ["m.ui.tabs(configs)"]), ": Return a tabs component with given modules. ", m("code", ["configs"]), " is an Array of:"]),
      m("ul", [
        m("li", [m("code", ["label"]), ": Label of tab."]),
        m("li", [m("code", ["module"]), ": Mithril module."])
      ])
    ])
  ])
]);
demo.extraFiles = ['_tab1.jsx', '_tab2.jsx'];
module.exports = demo;
}); // tabs/docs/demo
