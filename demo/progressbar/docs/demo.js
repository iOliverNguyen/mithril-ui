
define('progressbar/docs/demo', function(require, module, exports) {

// START
var demo = {};
demo.controller = function() {
  var ctrl = this;
  ctrl.max = m.prop(200);
  ctrl.dynamic = m.prop(0);
  ctrl.type = m.prop('');

  ctrl.random = function() {
    var value = Math.floor((Math.random() * 100) + 1);

    var type;
    if (value < 25) type = 'success';
    else if (value < 50) type = 'info';
    else if (value < 75) type = 'warning';
    else type = 'danger';

    ctrl.showWarning = (type === 'danger' || type === 'warning');

    ctrl.dynamic(value);
    ctrl.type(type);
  };

  ctrl.randomStacked = function() {
    ctrl.stacked = [];
    var types = ['success', 'info', 'warning', 'danger'];

    for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
      var index = Math.floor((Math.random() * 4));
      ctrl.stacked.push({
        value: Math.floor((Math.random() * 30) + 1),
        type: types[index]
      });
    }
  };

  ctrl.random();
  ctrl.randomStacked();
};

demo.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {},
    children: [{
        tag: "h3",
        attrs: {},
        children: ["Static"]
      }, {
        tag: "div",
        attrs: {
          class: "row"
        },
        children: [{
          tag: "div",
          attrs: {
            class: "col-sm-4"
          },
          children: [{
            tag: "div",
            attrs: {
              class: "progress ",
              value: "55"
            },
            children: [{
              tag: "div",
              attrs: {
                class: "progress-bar",
                style: "width: 55%;"
              }
            }]
          }]
        }, {
          tag: "div",
          attrs: {
            class: "col-sm-4"
          },
          children: [{
            tag: "div",
            attrs: {
              class: "progress-striped progress ",
              value: "22",
              type: "warning"
            },
            children: [{
              tag: "div",
              attrs: {
                class: "progress-bar progress-bar-warning",
                style: "width: 22%;"
              },
              children: [{
                tag: "span",
                attrs: {},
                children: ["22%"]
              }]
            }]
          }]
        }, {
          tag: "div",
          attrs: {
            class: "col-sm-4"
          },
          children: [{
            tag: "div",
            attrs: {
              class: "progress-striped active progress ",
              max: "200",
              value: "166",
              type: "danger"
            },
            children: [{
              tag: "div",
              attrs: {
                class: "progress-bar progress-bar-danger",
                style: "width: 166%"
              },
              children: [{
                tag: "i",
                attrs: {},
                children: ["166 / 200"]
              }]
            }]
          }]
        }]
      },

      {
        tag: "hr",
        attrs: {}
      }, {
        tag: "h3",
        attrs: {},
        children: ["Dynamic", {
          tag: "button",
          attrs: {
            class: "btn btn-sm btn-primary",
            onclick: ctrl.random
          },
          children: [
            "Randomize"
          ]
        }]
      }, {
        tag: "div",
        attrs: {
          class: "progress",
          max: "max",
          value: "dynamic"
        },
        children: [{
          tag: "div",
          attrs: {
            class: "progress-bar",
            style: "width: 9.5%;"
          },
          children: [{
            tag: "span",
            attrs: {
              style: "color:black; white-space:nowrap;"
            },
            children: [
              ctrl.dynamic(), " / ", ctrl.max()
            ]
          }]
        }]
      },

      {
        tag: "small",
        attrs: {},
        children: [{
          tag: "em",
          attrs: {},
          children: ["No animation"]
        }]
      }, {
        tag: "div",
        attrs: {
          class: "progress",
          animate: "false",
          value: "dynamic",
          type: "success"
        },
        children: [{
          tag: "div",
          attrs: {
            class: "progress-bar progress-bar-success",
            style: "transition: none; -webkit-transition: none; width: 19%;"
          },
          children: [{
            tag: "b",
            attrs: {},
            children: ["19%"]
          }]
        }]
      },

      {
        tag: "small",
        attrs: {},
        children: [{
          tag: "em",
          attrs: {},
          children: ["Object (changes type based on value)"]
        }]
      }, {
        tag: "div",
        attrs: {
          class: "progress-striped active progress ",
          value: "dynamic",
          type: "success"
        },
        children: [{
          tag: "div",
          attrs: {
            class: "progress-bar progress-bar-success",
            style: "width: 19%;"
          },
          children: [{
            tag: "span",
            attrs: {},
            children: ["success"]
          }, {
            tag: "i",
            attrs: {},
            children: ["!!! Watch out !!!"]
          }]
        }]
      },

      {
        tag: "hr",
        attrs: {}
      }, {
        tag: "h3",
        attrs: {},
        children: ["Stacked", {
          tag: "button",
          attrs: {
            class: "btn btn-sm btn-primary"
          },
          children: [
            "Randomize"
          ]
        }]
      }, {
        tag: "div",
        attrs: {
          class: "progress"
        },
        children: [{
          tag: "div",
          attrs: {
            class: "progress-bar progress-bar-danger",
            value: "bar.value",
            type: "danger",
            style: "width: 25%;"
          },
          children: [{
            tag: "span",
            attrs: {},
            children: ["25%"]
          }]
        }, {
          tag: "div",
          attrs: {
            class: "progress-bar  progress-bar-success",
            value: "bar.value",
            type: "success",
            style: "width: 29%;"
          },
          children: [{
            tag: "span",
            attrs: {},
            children: ["29%"]
          }]
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
    children: ["Progressbar is an awesome component"]
  }, {
    tag: "h2",
    attrs: {
      id: "settings"
    },
    children: ["Settings"]
  }]
};
demo.files = {
  'demo.jsx': "// START\nvar demo = {};\ndemo.controller = function() {\n  var ctrl = this;\n  ctrl.max = m.prop(200);\n  ctrl.dynamic = m.prop(0);\n  ctrl.type = m.prop('');\n\n  ctrl.random = function() {\n    var value = Math.floor((Math.random() * 100) + 1);\n\n    var type;\n    if (value < 25) type = 'success';\n    else if (value < 50) type = 'info';\n    else if (value < 75) type = 'warning';\n    else type = 'danger';\n\n    ctrl.showWarning = (type === 'danger' || type === 'warning');\n\n    ctrl.dynamic(value);\n    ctrl.type(type);\n  };\n\n  ctrl.randomStacked = function() {\n    ctrl.stacked = [];\n    var types = ['success', 'info', 'warning', 'danger'];\n\n    for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {\n      var index = Math.floor((Math.random() * 4));\n      ctrl.stacked.push({\n        value: Math.floor((Math.random() * 30) + 1),\n        type: types[index]\n      });\n    }\n  };\n\n  ctrl.random();\n  ctrl.randomStacked();\n};\n\ndemo.view = function(ctrl) {\n  return INCLUDE('./template');\n};\n// END\n\ndemo.doc =  INCLUDE('./readme');\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx'),\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>\n  <h3>Static</h3>\n  <div class=\"row\">\n    <div class=\"col-sm-4\">\n      <div class=\"progress \" value=\"55\">\n        <div class=\"progress-bar\" style=\"width: 55%;\"></div>\n      </div>\n    </div>\n    <div class=\"col-sm-4\">\n      <div class=\"progress-striped progress \" value=\"22\" type=\"warning\">\n        <div class=\"progress-bar progress-bar-warning\" style=\"width: 22%;\">\n          <span>22%</span>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4\">\n      <div class=\"progress-striped active progress \" max=\"200\" value=\"166\" type=\"danger\">\n        <div class=\"progress-bar progress-bar-danger\" style=\"width: 166%\">\n          <i>166 / 200</i>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <hr/>\n  <h3>Dynamic\n    <button class=\"btn btn-sm btn-primary\" onclick={ctrl.random}>\n      Randomize</button>\n  </h3>\n  <div class=\"progress\" max=\"max\" value=\"dynamic\">\n    <div class=\"progress-bar\" style=\"width: 9.5%;\">\n      <span style=\"color:black; white-space:nowrap;\">\n        {ctrl.dynamic()} / {ctrl.max()}\n      </span>\n    </div>\n  </div>\n\n  <small><em>No animation</em></small>\n  <div class=\"progress\" animate=\"false\" value=\"dynamic\" type=\"success\">\n    <div class=\"progress-bar progress-bar-success\"\n      style=\"transition: none; -webkit-transition: none; width: 19%;\">\n      <b>19%</b>\n    </div>\n  </div>\n\n  <small><em>Object (changes type based on value)</em></small>\n  <div class=\"progress-striped active progress \" value=\"dynamic\" type=\"success\">\n    <div class=\"progress-bar progress-bar-success\" style=\"width: 19%;\">\n      <span>success</span>\n      <i>!!! Watch out !!!</i>\n    </div>\n  </div>\n\n  <hr/>\n  <h3>Stacked\n    <button class=\"btn btn-sm btn-primary\">\n      Randomize</button>\n  </h3>\n  <div class=\"progress\">\n    <div class=\"progress-bar progress-bar-danger\" value=\"bar.value\" type=\"danger\"\n      style=\"width: 25%;\">\n      <span>25%</span>\n    </div>\n    <div class=\"progress-bar  progress-bar-success\" value=\"bar.value\" type=\"success\"\n      style=\"width: 29%;\">\n      <span>29%</span>\n    </div>\n  </div>\n</div>\n",
};
module.exports = demo;
}); // progressbar/docs/demo
