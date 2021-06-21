
define('dropdown/docs/demo', function(require, module, exports) {

// START
var demo = {};
demo.controller = function() {
  var ctrl = this;

  ctrl.items = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];

  ctrl.isOpen = m.prop(false);
  ctrl.isDisabled = m.prop(false);

  ctrl.toggleDropdown = function(e) {
    e.preventDefault();
    e.stopPropagation();
    ctrl.isOpen(!ctrl.isOpen());
  };

  ctrl.disableDropdown = function() {
    ctrl.isDisabled(!ctrl.isDisabled());
  };
};

demo.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {},
    children: [{
        tag: "span",
        attrs: {
          class: "dropdown",
          config: m.ui.configDropdown()
        },
        children: [{
          tag: "a",
          attrs: {
            href: "#",
            class: "dropdown-toggle"
          },
          children: [
            "Click me for a dropdown, yo!"
          ]
        }, {
          tag: "ul",
          attrs: {
            class: "dropdown-menu"
          },
          children: [{
            tag: "li",
            attrs: {},
            children: [

              ctrl.items.map(function(choice) {
                return {
                  tag: "a",
                  attrs: {
                    href: true
                  },
                  children: [choice]
                };
              })

            ]
          }]
        }]
      }, " ",

      {
        tag: "div",
        attrs: {
          class: "btn-group",
          config: m.ui.configDropdown(ctrl.isOpen)
        },
        children: [{
          tag: "button",
          attrs: {
            type: "button",
            class: "btn btn-primary dropdown-toggle",
            disabled: ctrl.isDisabled()
          },
          children: [
            "Button dropdown ", {
              tag: "span",
              attrs: {
                class: "caret"
              }
            }
          ]
        }, {
          tag: "ul",
          attrs: {
            class: "dropdown-menu"
          },
          children: [{
            tag: "li",
            attrs: {},
            children: [{
              tag: "a",
              attrs: {
                href: "#"
              },
              children: ["Action"]
            }]
          }, {
            tag: "li",
            attrs: {},
            children: [{
              tag: "a",
              attrs: {
                href: "#"
              },
              children: ["Another action"]
            }]
          }, {
            tag: "li",
            attrs: {},
            children: [{
              tag: "a",
              attrs: {
                href: "#"
              },
              children: ["Something else here"]
            }]
          }, {
            tag: "li",
            attrs: {
              class: "divider"
            }
          }, {
            tag: "li",
            attrs: {},
            children: [{
              tag: "a",
              attrs: {
                href: "#"
              },
              children: ["Separated link"]
            }]
          }]
        }]
      }, " ",

      {
        tag: "div",
        attrs: {
          class: "btn-group",
          config: m.ui.configDropdown()
        },
        children: [{
          tag: "button",
          attrs: {
            type: "button",
            class: "btn btn-danger"
          },
          children: ["Action"]
        }, {
          tag: "button",
          attrs: {
            type: "button",
            class: "btn btn-danger dropdown-toggle"
          },
          children: [{
            tag: "span",
            attrs: {
              class: "caret"
            }
          }, {
            tag: "span",
            attrs: {
              class: "sr-only"
            },
            children: ["Split button!"]
          }]
        }, {
          tag: "ul",
          attrs: {
            class: "dropdown-menu",
            role: "menu"
          },
          children: [{
            tag: "li",
            attrs: {},
            children: [{
              tag: "a",
              attrs: {
                href: "#"
              },
              children: ["Action"]
            }]
          }, {
            tag: "li",
            attrs: {},
            children: [{
              tag: "a",
              attrs: {
                href: "#"
              },
              children: ["Another action"]
            }]
          }, {
            tag: "li",
            attrs: {},
            children: [{
              tag: "a",
              attrs: {
                href: "#"
              },
              children: ["Something else here"]
            }]
          }, {
            tag: "li",
            attrs: {
              class: "divider"
            }
          }, {
            tag: "li",
            attrs: {},
            children: [{
              tag: "a",
              attrs: {
                href: "#"
              },
              children: ["Separated link"]
            }]
          }]
        }]
      },

      {
        tag: "hr",
        attrs: {}
      }, {
        tag: "p",
        attrs: {},
        children: [{
          tag: "button",
          attrs: {
            class: "btn btn-default",
            onclick: ctrl.toggleDropdown
          },
          children: [
            "Toggle dropdown button"
          ]
        }, " ", {
          tag: "button",
          attrs: {
            class: "btn btn-warning",
            onclick: ctrl.disableDropdown
          },
          children: [
            "Enable/Disable"
          ]
        }]
      }
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
    children: ["Dropdown is a simple component which will toggle a dropdown menu on click or programmatically."]
  }, {
    tag: "h2",
    attrs: {
      id: "usage"
    },
    children: ["Usage"]
  }, {
    tag: "p",
    attrs: {},
    children: ["In config: ", {
      tag: "code",
      attrs: {},
      children: ["m.ui.configDropdown(isOpen)"]
    }]
  }, {
    tag: "ul",
    attrs: {},
    children: [{
      tag: "li",
      attrs: {},
      children: [{
        tag: "code",
        attrs: {},
        children: ["isOpen"]
      }, " ", {
        tag: "em",
        attrs: {},
        children: ["(default false)"]
      }, ": Optional open state."]
    }]
  }]
};
demo.small = 'm.ui.configDropdown';
demo.files = {
  'demo.jsx': "// START\nvar demo = {};\ndemo.controller = function() {\n  var ctrl = this;\n\n  ctrl.items = [\n    'The first choice!',\n    'And another choice for you.',\n    'but wait! A third!'\n  ];\n\n  ctrl.isOpen = m.prop(false);\n  ctrl.isDisabled = m.prop(false);\n\n  ctrl.toggleDropdown = function(e) {\n    e.preventDefault();\n    e.stopPropagation();\n    ctrl.isOpen(!ctrl.isOpen());\n  };\n\n  ctrl.disableDropdown = function() {\n    ctrl.isDisabled(!ctrl.isDisabled());\n  };\n};\n\ndemo.view = function(ctrl) {\n  return INCLUDE('./template');\n};\n// END\n\ndemo.doc =  INCLUDE('./readme');\ndemo.small = 'm.ui.configDropdown';\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx'),\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>\n  <span class=\"dropdown\" config={m.ui.configDropdown()}>\n    <a href=\"#\" class=\"dropdown-toggle\">\n      Click me for a dropdown, yo!\n    </a>\n    <ul class=\"dropdown-menu\">\n      <li>\n      {\n        ctrl.items.map(function(choice) {\n          return <a href>{choice}</a>;\n        })\n      }\n      </li>\n    </ul>\n  </span>&nbsp;\n\n  <div class=\"btn-group\" config={m.ui.configDropdown(ctrl.isOpen)}>\n    <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" disabled={ctrl.isDisabled()}>\n      Button dropdown <span class=\"caret\"></span>\n    </button>\n    <ul class=\"dropdown-menu\">\n      <li><a href=\"#\">Action</a></li>\n      <li><a href=\"#\">Another action</a></li>\n      <li><a href=\"#\">Something else here</a></li>\n      <li class=\"divider\"></li>\n      <li><a href=\"#\">Separated link</a></li>\n    </ul>\n  </div>&nbsp;\n\n  <div class=\"btn-group\" config={m.ui.configDropdown()}>\n    <button type=\"button\" class=\"btn btn-danger\">Action</button>\n    <button type=\"button\" class=\"btn btn-danger dropdown-toggle\">\n      <span class=\"caret\"></span>\n      <span class=\"sr-only\">Split button!</span>\n    </button>\n    <ul class=\"dropdown-menu\" role=\"menu\">\n      <li><a href=\"#\">Action</a></li>\n      <li><a href=\"#\">Another action</a></li>\n      <li><a href=\"#\">Something else here</a></li>\n      <li class=\"divider\"></li>\n      <li><a href=\"#\">Separated link</a></li>\n    </ul>\n  </div>\n\n  <hr/>\n  <p>\n    <button class=\"btn btn-default\" onclick={ctrl.toggleDropdown}>\n      Toggle dropdown button</button>&nbsp;\n    <button class=\"btn btn-warning\" onclick={ctrl.disableDropdown}>\n      Enable/Disable</button>\n  </p>\n</div>\n",
};
module.exports = demo;
}); // dropdown/docs/demo
