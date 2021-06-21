
define('tabs/docs/demo', function(require, module, exports) {

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
  return {
    tag: "div",
    attrs: {},
    children: [
      ctrl.tabs.$view()
    ]
  };
};

var tab1 = {};
tab1.controller = function() {};
tab1.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {},
    children: ["This is tab 1 content"]
  };
};

var tab2 = {};
tab2.controller = function() {};
tab2.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {},
    children: ["This is tab 2 content"]
  };
};
// END

demo.doc = {
  tag: "div",
  attrs: {},
  children: [{
    tag: "p",
    attrs: {},
    children: ["Tabs is a Mithril version of ", {
      tag: "a",
      attrs: {
        href: "http://getbootstrap.com/javascript/#tabs"
      },
      children: ["Bootstrap's tabs plugin"]
    }, "."]
  }, {
    tag: "h2",
    attrs: {
      id: "usage"
    },
    children: ["Usage"]
  }, {
    tag: "p",
    attrs: {},
    children: [{
      tag: "code",
      attrs: {},
      children: ["m.ui.tabs(tabSettings)"]
    }, ": Return a tabs component with given modules. ", {
      tag: "code",
      attrs: {},
      children: ["tabSettings"]
    }, " is an Array of:"]
  }, {
    tag: "ul",
    attrs: {},
    children: [{
      tag: "li",
      attrs: {},
      children: [{
        tag: "code",
        attrs: {},
        children: ["label"]
      }, ": Label of tab."]
    }, {
      tag: "li",
      attrs: {},
      children: [{
        tag: "code",
        attrs: {},
        children: ["module"]
      }, ": Mithril module."]
    }]
  }]
};
demo.small = 'm.ui.tabs';
demo.files = {
  'demo.jsx': "// START\nvar demo = {};\ndemo.controller = function() {\n  this.tabs = m.u.init(m.ui.tabs([{\n    label: 'Tab 1',\n    module: tab1\n  }, {\n    label: 'Tab 2',\n    module: tab2\n  }]));\n};\n\ndemo.view = function(ctrl) {\n  return INCLUDE('./template');\n};\n\nvar tab1 = {};\ntab1.controller = function(){};\ntab1.view = function(ctrl) {\n  return INCLUDE('./tab1');\n};\n\nvar tab2 = {};\ntab2.controller = function(){};\ntab2.view = function(ctrl) {\n  return INCLUDE('./tab2');\n};\n// END\n\ndemo.doc =  INCLUDE('./readme');\ndemo.small = 'm.ui.tabs';\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx'),\n  '_tab1.jsx': CONTENT('./_tab1.jsx'),\n  '_tab2.jsx': CONTENT('./_tab2.jsx')\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>\n  {ctrl.tabs.$view()}\n</div>\n",
  '_tab1.jsx': "<div>This is tab 1 content</div>\n",
  '_tab2.jsx': "<div>This is tab 2 content</div>\n"
};
module.exports = demo;
}); // tabs/docs/demo
