
define('collapse/docs/demo', function(require, module, exports) {

// START
var demo = {};

demo.controller = function() {
  var module = {
    controller: function() {},
    view: function() {
      return {
        tag: "pre",
        attrs: {},
        children: ["Sample content"]
      };
    }
  };

  this.collapse = m.u.init(m.ui.collapse({
    content: module,
    disabled: false
  }));
};

demo.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {},
    children: [{
        tag: "div",
        attrs: {},
        children: [{
          tag: "span",
          attrs: {
            class: "btn btn-default",
            onclick: ctrl.collapse.toggle
          },
          children: ["Toggle collapse"]
        }]
      }, {
        tag: "br",
        attrs: {}
      },
      ctrl.collapse.$view()
    ]
  };
};
// END

demo.doc = {
  tag: "div",
  attrs: {},
  children: [{
    tag: "p",
    attrs: {},
    children: ["Mithril version of Bootstrap's collapse plugin. Provides a simple way to hide and show an element with a css transition."]
  }, {
    tag: "p",
    attrs: {},
    children: [{
      tag: "strong",
      attrs: {},
      children: ["TODO"]
    }, ": open, close"]
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
      children: ["m.ui.collapse(settings)"]
    }]
  }, {
    tag: "h3",
    attrs: {
      id: "settings"
    },
    children: ["Settings"]
  }, {
    tag: "ul",
    attrs: {},
    children: [{
      tag: "li",
      attrs: {},
      children: [{
        tag: "p",
        attrs: {},
        children: [{
          tag: "code",
          attrs: {},
          children: ["content"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(required)"]
        }, ": Content inside, a customize components."]
      }]
    }, {
      tag: "li",
      attrs: {},
      children: [{
        tag: "p",
        attrs: {},
        children: [{
          tag: "code",
          attrs: {},
          children: ["disabled"]
        }, ": Components is allows to work or not."]
      }]
    }]
  }, {
    tag: "h3",
    attrs: {
      id: "methods"
    },
    children: ["Methods"]
  }, {
    tag: "ul",
    attrs: {},
    children: [{
      tag: "li",
      attrs: {},
      children: [{
        tag: "code",
        attrs: {},
        children: ["toggle()"]
      }, ": To open/close the collapse."]
    }]
  }]
};
demo.small = 'm.ui.collapse';
demo.files = {
  'demo.jsx': "// START\nvar demo = {};\n\ndemo.controller = function() {\n  var module = {\n    controller: function() {},\n    view: function() {\n      return <pre>Sample content</pre>;\n    }\n  };\n\n  this.collapse = m.u.init(m.ui.collapse({\n    content: module,\n    disabled: false\n  }));\n};\n\ndemo.view = function(ctrl) {\n  return INCLUDE('./template');\n};\n// END\n\ndemo.doc =  INCLUDE('./readme');\ndemo.small = 'm.ui.collapse';\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx'),\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>\n  <div>\n    <span class=\"btn btn-default\" onclick={ctrl.collapse.toggle}>Toggle collapse</span>\n  </div>\n  <br/>\n  {ctrl.collapse.$view()}\n</div>\n",
};
module.exports = demo;
}); // collapse/docs/demo
