
define('accordion/docs/demo', function(require, module, exports) {

// START
var module1 = {
  controller: function() {},
  view: function() {
    return {
      tag: "span",
      attrs: {},
      children: ["Static Content"]
    };
  }
};

var module2 = {
  controller: function() {
    var ctrl = this;
    ctrl.data = m.prop([]);
    ctrl.addItem = function() {
      ctrl.data().push('Item' + (ctrl.data().length + 1));
    };
  },
  view: function(ctrl) {
    return {
      tag: "div",
      attrs: {},
      children: [{
          tag: "p",
          attrs: {},
          children: [
            "The body of the accordion group grows to fit the contents"
          ]
        }, {
          tag: "button",
          attrs: {
            class: "btn btn-default",
            onclick: ctrl.addItem
          },
          children: [
            "Add item"
          ]
        },

        ctrl.data().map(function(item) {
          return {
            tag: "div",
            attrs: {},
            children: [item]
          };
        })

      ]
    };
  }
};

var demo = {};
demo.controller = function() {
  var ctrl = this;
  ctrl.oneAtATime = m.prop(false);
  ctrl.disabled = m.prop(false);

  ctrl.accordion = m.u.init(m.ui.accordion({
    group: [{
      heading: 'Static',
      disabled: ctrl.disabled,
      module: module1
    }, {
      heading: {
        tag: "span",
        attrs: {},
        children: ["Header can also have markup", {
          tag: "span",
          attrs: {
            class: "pull-right glyphicon glyphicon-star"
          }
        }]
      },
      module: module1
    }, {
      heading: 'Dynamic',
      module: module2
    }],
    closeOthers: ctrl.oneAtATime
  }));
};

demo.view = function(ctrl) {
  var toggle = function() {
    ctrl.accordion.toggle(0);
  };

  var toggleDisabled = function() {
    ctrl.disabled(!ctrl.disabled());
  };

  return {
    tag: "div",
    attrs: {},
    children: [{
        tag: "p",
        attrs: {},
        children: [{
          tag: "button",
          attrs: {
            class: "btn btn-default",
            onclick: toggle
          },
          children: [
            "Toggle first panel"
          ]
        }, " ", {
          tag: "button",
          attrs: {
            class: "btn btn-default",
            onclick: toggleDisabled
          },
          children: [
            "Enable/Disable first panel"
          ]
        }]
      }, {
        tag: "label",
        attrs: {},
        children: [{
            tag: "input",
            attrs: {
              type: "checkbox",
              onchange: m.withAttr("checked", ctrl.oneAtATime)
            }
          }, " " + ' ' +
          "Only one at a time"
        ]
      }, {
        tag: "br",
        attrs: {}
      },
      ctrl.accordion.$view()
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
    children: ["The accordion components provide a list of items, with collapsible bodies that are collapsed or expanded by clicking on the item`s header."]
  }, {
    tag: "p",
    attrs: {},
    children: [{
      tag: "strong",
      attrs: {},
      children: ["TODO"]
    }, ": open, close, config"]
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
      children: ["m.ui.accordion(settings)"]
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
          children: ["group"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(required)"]
        }, ": List of components including information such as ", {
          tag: "em",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["heading"]
          }]
        }, " for toggle label, ", {
          tag: "em",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["module"]
          }]
        }, " for content and ", {
          tag: "em",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["disabled"]
          }, " (optional, default: false)"]
        }, " for the component working or not"]
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
          children: ["closeOthers"]
        }, ": Define that the accordion allows more than one component open at the same time or not."]
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
          children: ["toggle(index)"]
        }, ": To open a component based on its index."]
      }]
    }]
  }]
};
demo.small = 'm.ui.accordion';
demo.files = {
  'demo.jsx': "// START\nINCLUDE('./module1')\nINCLUDE('./module2')\n\nvar demo = {};\ndemo.controller = function() {\n  var ctrl = this;\n  ctrl.oneAtATime = m.prop(false);\n  ctrl.disabled = m.prop(false);\n\n  ctrl.accordion = m.u.init(m.ui.accordion({\n    group: [{\n      heading: 'Static',\n      disabled: ctrl.disabled,\n      module: module1\n    }, {\n      heading: <span>Header can also have markup\n        <span class=\"pull-right glyphicon glyphicon-star\"></span></span>,\n      module: module1\n    }, {\n      heading: 'Dynamic',\n      module: module2\n    }],\n    closeOthers: ctrl.oneAtATime\n  }));\n};\n\ndemo.view = function(ctrl) {\n  var toggle = function() {\n    ctrl.accordion.toggle(0);\n  };\n\n  var toggleDisabled = function() {\n    ctrl.disabled(!ctrl.disabled());\n  };\n\n  return INCLUDE('./template');\n};\n// END\n\ndemo.doc =  INCLUDE('./readme');\ndemo.small = 'm.ui.accordion';\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx'),\n  '_module1.jsx': CONTENT('./_module1.jsx'),\n  '_module2.jsx': CONTENT('./_module2.jsx'),\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>\n  <p>\n    <button class=\"btn btn-default\" onclick={toggle}>\n      Toggle first panel\n    </button>&nbsp;\n    <button class=\"btn btn-default\" onclick={toggleDisabled}>\n      Enable/Disable first panel\n    </button>\n  </p>\n  <label>\n    <input type=\"checkbox\"\n    onchange={m.withAttr(\"checked\", ctrl.oneAtATime)} />&nbsp;\n    Only one at a time\n  </label>\n  <br/>\n  {ctrl.accordion.$view()}\n</div>\n",
  '_module1.jsx': "var module1 = {\n  controller: function() {},\n  view: function() {\n    return <span>Static Content</span>;\n  }\n};\n",
  '_module2.jsx': "var module2 = {\n  controller: function() {\n    var ctrl = this;\n    ctrl.data = m.prop([]);\n    ctrl.addItem = function() {\n      ctrl.data().push('Item' + (ctrl.data().length + 1));\n    };\n  },\n  view: function(ctrl) {\n    return <div>\n      <p>\n        The body of the accordion group grows to fit the contents\n      </p>\n      <button class=\"btn btn-default\" onclick={ctrl.addItem}>\n        Add item\n      </button>\n      {\n        ctrl.data().map(function(item) {\n          return <div>{item}</div>;\n        })\n      }\n    </div>;\n  }\n};\n",
};
module.exports = demo;
}); // accordion/docs/demo
