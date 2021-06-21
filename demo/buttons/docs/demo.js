
define('buttons/docs/demo', function(require, module, exports) {

// START
var demo = {};
demo.controller = function() {
  var ctrl = this;
  ctrl.single = m.prop(0);
  ctrl.checks = {
    left: m.prop(false),
    middle: m.prop(false),
    right: m.prop(false)
  };
  ctrl.radio = m.prop('left');
};

demo.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {},
    children: [{
      tag: "div",
      attrs: {},
      children: [{
        tag: "h4",
        attrs: {},
        children: ["Single toggle"]
      }, {
        tag: "pre",
        attrs: {},
        children: [ctrl.single()]
      }, {
        tag: "button",
        attrs: {
          class: "btn btn-primary",
          config: m.ui.configCheckbox(ctrl.single, {
            true: 1,
            false: 0
          })
        },
        children: [
          "Single Toggle"
        ]
      }]
    }, {
      tag: "br",
      attrs: {}
    }, {
      tag: "div",
      attrs: {},
      children: [{
        tag: "h4",
        attrs: {},
        children: ["Checkbox"]
      }, {
        tag: "pre",
        attrs: {},
        children: [JSON.stringify(ctrl.checks)]
      }, {
        tag: "div",
        attrs: {
          class: "btn-group"
        },
        children: [{
          tag: "button",
          attrs: {
            class: "btn btn-success",
            config: m.ui.configCheckbox(ctrl.checks.left)
          },
          children: [
            "Left"
          ]
        }, {
          tag: "button",
          attrs: {
            class: "btn btn-success",
            config: m.ui.configCheckbox(ctrl.checks.middle)
          },
          children: [
            "Middle"
          ]
        }, {
          tag: "button",
          attrs: {
            class: "btn btn-success",
            config: m.ui.configCheckbox(ctrl.checks.right)
          },
          children: [
            "Right"
          ]
        }]
      }]
    }, {
      tag: "br",
      attrs: {}
    }, {
      tag: "div",
      attrs: {},
      children: [{
        tag: "h4",
        attrs: {},
        children: ["Radio"]
      }, {
        tag: "pre",
        attrs: {},
        children: [ctrl.radio()]
      }, {
        tag: "div",
        attrs: {
          class: "btn-group"
        },
        children: [{
          tag: "button",
          attrs: {
            class: "btn btn-danger",
            config: m.ui.configRadio(ctrl.radio, 'left')
          },
          children: [
            "Left"
          ]
        }, {
          tag: "button",
          attrs: {
            class: "btn btn-danger",
            config: m.ui.configRadio(ctrl.radio, 'middle')
          },
          children: [
            "Middle"
          ]
        }, {
          tag: "button",
          attrs: {
            class: "btn btn-danger",
            config: m.ui.configRadio(ctrl.radio, 'right')
          },
          children: [
            "Right"
          ]
        }]
      }]
    }]
  };
};
// END

demo.doc = {
  tag: "div",
  attrs: {},
  children: [{
    tag: "p",
    attrs: {},
    children: ["There are two methods that can make a group of buttons behave like a set of checkboxes or radio buttons."]
  }, {
    tag: "h2",
    attrs: {
      id: "usage"
    },
    children: ["Usage"]
  }, {
    tag: "p",
    attrs: {},
    children: ["In element config:"]
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
          children: ["m.ui.configCheckbox(prop, settings)"]
        }]
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
          children: ["m.ui.configRadio(prop, value)"]
        }]
      }]
    }]
  }, {
    tag: "h3",
    attrs: {
      id: "checkbox"
    },
    children: ["Checkbox"]
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
          children: ["prop"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(required)"]
        }, ": Getter and setter returned from ", {
          tag: "code",
          attrs: {},
          children: ["m.prop"]
        }, "."]
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
          children: ["settings"]
        }, ": Optional"]
      }, {
        tag: "ul",
        attrs: {},
        children: [{
          tag: "li",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["true"]
          }, " ", {
            tag: "em",
            attrs: {},
            children: ["(default true)"]
          }, ": Optional value for ", {
            tag: "code",
            attrs: {},
            children: ["true"]
          }, " state."]
        }, {
          tag: "li",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["false"]
          }, " ", {
            tag: "em",
            attrs: {},
            children: ["(default false)"]
          }, ": Optonal value for ", {
            tag: "code",
            attrs: {},
            children: ["false"]
          }, " state."]
        }]
      }]
    }]
  }, {
    tag: "h3",
    attrs: {
      id: "radio"
    },
    children: ["Radio"]
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
          children: ["prop"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(required)"]
        }, ": Getter and settre returned from ", {
          tag: "code",
          attrs: {},
          children: ["m.prop"]
        }, "."]
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
          children: ["value"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(required)"]
        }, ": Value to assign to ", {
          tag: "code",
          attrs: {},
          children: ["prop(value)"]
        }, " when the button is checked."]
      }]
    }]
  }]
};
demo.small = 'm.ui.configCheckbox, m.ui.configRadio';
demo.files = {
  'demo.jsx': "// START\nvar demo = {};\ndemo.controller = function() {\n  var ctrl = this;\n  ctrl.single = m.prop(0);\n  ctrl.checks = {\n    left: m.prop(false),\n    middle: m.prop(false),\n    right: m.prop(false)\n  };\n  ctrl.radio = m.prop('left');\n};\n\ndemo.view = function(ctrl) {\n  return INCLUDE('./template');\n};\n// END\n\ndemo.doc =  INCLUDE('./readme');\ndemo.small = 'm.ui.configCheckbox, m.ui.configRadio';\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx'),\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>\n  <div>\n    <h4>Single toggle</h4>\n    <pre>{ctrl.single()}</pre>\n    <button class=\"btn btn-primary\"\n      config={m.ui.configCheckbox(ctrl.single, {true: 1, false: 0})}>\n      Single Toggle\n    </button>\n  </div>\n  <br/>\n  <div>\n    <h4>Checkbox</h4>\n    <pre>{JSON.stringify(ctrl.checks)}</pre>\n    <div class=\"btn-group\">\n      <button class=\"btn btn-success\"\n        config={m.ui.configCheckbox(ctrl.checks.left)}>\n        Left\n      </button>\n      <button class=\"btn btn-success\"\n        config={m.ui.configCheckbox(ctrl.checks.middle)}>\n        Middle\n      </button>\n      <button class=\"btn btn-success\"\n        config={m.ui.configCheckbox(ctrl.checks.right)}>\n        Right\n      </button>\n    </div>\n  </div>\n  <br/>\n  <div>\n    <h4>Radio</h4>\n    <pre>{ctrl.radio()}</pre>\n    <div class=\"btn-group\">\n      <button class=\"btn btn-danger\"\n        config={m.ui.configRadio(ctrl.radio, 'left')}>\n        Left\n      </button>\n      <button class=\"btn btn-danger\"\n        config={m.ui.configRadio(ctrl.radio, 'middle')}>\n        Middle\n      </button>\n      <button class=\"btn btn-danger\"\n        config={m.ui.configRadio(ctrl.radio, 'right')}>\n        Right\n      </button>\n    </div>\n  </div>\n</div>\n",
};
module.exports = demo;
}); // buttons/docs/demo
