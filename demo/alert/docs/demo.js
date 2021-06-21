
define('alert/docs/demo', function(require, module, exports) {

// START
var demo = {};
demo.controller = function() {
  var ctrl = this;
  ctrl.alerts = [{
    type: 'danger',
    msg: 'Oh! Change something and try again.'
  }, {
    type: 'success',
    msg: {
      tag: "span",
      attrs: {},
      children: ["Well done! Alert can also have ", {
        tag: "b",
        attrs: {},
        children: ["markup"]
      }, "."]
    }
  }];

  ctrl.addAlert = function() {
    ctrl.alerts.push({
      msg: 'This is sample alert.'
    });
  };

  ctrl.closeAlert = function(index) {
    ctrl.alerts.splice(index, 1);
  };
};

demo.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {},
    children: [

      ctrl.alerts.map(function(alert, index) {
        return m.ui.renderAlert({
          type: alert.type,
          close: m.u.bind(ctrl.closeAlert, ctrl, index),
          msg: alert.msg
        });
      }),

      {
        tag: "button",
        attrs: {
          class: "btn btn-default",
          onclick: ctrl.addAlert
        },
        children: [
          "Add alert"
        ]
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
    children: ["Alert is a Mithril-version of bootstrap's alert."]
  }, {
    tag: "h2",
    attrs: {
      id: "usage"
    },
    children: ["Usage"]
  }, {
    tag: "p",
    attrs: {},
    children: ["In view: ", {
      tag: "code",
      attrs: {},
      children: ["m.ui.renderAlert(settings)"]
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
          children: ["type"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(default 'warning')"]
        }, ": Optional type of alert. Allowed: ", {
          tag: "code",
          attrs: {},
          children: ["'primary'"]
        }, ", ", {
          tag: "code",
          attrs: {},
          children: ["'success'"]
        }, ", ", {
          tag: "code",
          attrs: {},
          children: ["'info'"]
        }, ", ", {
          tag: "code",
          attrs: {},
          children: ["'warning'"]
        }, ", ", {
          tag: "code",
          attrs: {},
          children: ["'danger'"]
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
          children: ["msg"]
        }, ": Alert message, may contain markup."]
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
          children: ["close"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["function()"]
          }]
        }, ": Optionally display close button."]
      }]
    }]
  }]
};
demo.small = 'm.ui.renderAlert';
demo.files = {
  'demo.jsx': "// START\nvar demo = {};\ndemo.controller = function() {\n  var ctrl = this;\n  ctrl.alerts = [\n    {type: 'danger', msg: 'Oh! Change something and try again.'},\n    {type: 'success', msg: <span>Well done! Alert can also have <b>markup</b>.</span>}\n  ];\n\n  ctrl.addAlert = function() {\n    ctrl.alerts.push({msg: 'This is sample alert.'});\n  };\n\n  ctrl.closeAlert = function(index) {\n    ctrl.alerts.splice(index, 1);\n  };\n};\n\ndemo.view = function(ctrl) {\n  return INCLUDE('./template');\n};\n// END\n\ndemo.doc = INCLUDE('./readme');\ndemo.small = 'm.ui.renderAlert';\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx')\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>\n  {\n    ctrl.alerts.map(function(alert, index) {\n      return m.ui.renderAlert({\n        type: alert.type,\n        close: m.u.bind(ctrl.closeAlert, ctrl, index),\n        msg: alert.msg\n      });\n    })\n  }\n  <button class=\"btn btn-default\" onclick={ctrl.addAlert}>\n    Add alert\n  </button>\n</div>\n"
};
module.exports = demo;
}); // alert/docs/demo
