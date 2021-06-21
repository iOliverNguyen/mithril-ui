
define('rating/docs/demo', function(require, module, exports) {

// START
var demo = {};
demo.controller = function() {
  this.rating = m.u.init(m.ui.rating({
    iconOff: {
      tag: "span",
      attrs: {
        class: "glyphicon glyphicon-ok-circle"
      }
    },
    iconOn: {
      tag: "span",
      attrs: {
        class: "glyphicon glyphicon-ok-sign"
      }
    },
    max: 10,
    rating: 7,
    hover: true,
    readOnly: false
  }));
};

demo.view = function(ctrl) {
  var clear = function() {
    ctrl.rating.clear();
  };

  var toggle = function() {
    ctrl.rating.readOnly(!ctrl.rating.readOnly());
  };
  return {
    tag: "div",
    attrs: {},
    children: [{
      tag: "div",
      attrs: {},
      children: [
        ctrl.rating.$view()
      ]
    }, {
      tag: "br",
      attrs: {}
    }, {
      tag: "div",
      attrs: {},
      children: [
        "Rating: ", {
          tag: "b",
          attrs: {},
          children: [ctrl.rating.rating()]
        }, " -" + ' ' +
        "Read only is ", {
          tag: "b",
          attrs: {},
          children: [ctrl.rating.readOnly()]
        }, " -" + ' ' +
        "Hovering over ", {
          tag: "b",
          attrs: {},
          children: [
            ctrl.rating.hovering() ? ctrl.rating.hovering() : 'none'
          ]
        }
      ]
    }, {
      tag: "br",
      attrs: {}
    }, {
      tag: "button",
      attrs: {
        class: "btn btn-danger",
        onclick: clear,
        disabled: ctrl.rating.readOnly() ? 'disabled' : ''
      },
      children: [
        "Clear"
      ]
    }, " ", {
      tag: "button",
      attrs: {
        class: "btn btn-default",
        onclick: toggle
      },
      children: [
        "Toggle Read Only"
      ]
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
    children: ["Rating directive that will take care of visualising a star rating bar."]
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
      children: ["m.ui.rating(settings)"]
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
          children: ["iconOff"]
        }, ": Unrated icon."]
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
          children: ["iconOn"]
        }, ": Rated icon."]
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
          children: ["max"]
        }, ": Rating scale (default: 5)."]
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
          children: ["rating"]
        }, ": Default rating (Default: 0)."]
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
          children: ["hover"]
        }, ": Hover or not."]
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
          children: ["readOnly"]
        }, ": Read only or not."]
      }]
    }]
  }]
};
demo.small = 'm.ui.rating';
demo.files = {
  'demo.jsx': "// START\nvar demo = {};\ndemo.controller = function() {\n  this.rating = m.u.init(m.ui.rating({\n    iconOff: <span class=\"glyphicon glyphicon-ok-circle\"></span>,\n    iconOn: <span class=\"glyphicon glyphicon-ok-sign\"></span>,\n    max: 10,\n    rating: 7,\n    hover: true,\n    readOnly: false\n  }));\n};\n\ndemo.view = function(ctrl) {\n  var clear = function() {\n    ctrl.rating.clear();\n  };\n\n  var toggle = function() {\n    ctrl.rating.readOnly(!ctrl.rating.readOnly());\n  };\n  return INCLUDE('./template');\n};\n// END\n\ndemo.doc =  INCLUDE('./readme');\ndemo.small = 'm.ui.rating';\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx'),\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>\n  <div>\n    {ctrl.rating.$view()}\n  </div>\n  <br/>\n  <div>\n    Rating: <b>{ctrl.rating.rating()}</b> -\n    Read only is <b>{ctrl.rating.readOnly()}</b> -\n    Hovering over <b>\n      {ctrl.rating.hovering()? ctrl.rating.hovering(): 'none'}\n    </b>\n  </div>\n  <br />\n  <button class=\"btn btn-danger\" onclick={clear}\n    disabled={ctrl.rating.readOnly()?'disabled':''} >\n    Clear\n  </button>&nbsp;\n  <button class=\"btn btn-default\" onclick={toggle}>\n    Toggle Read Only\n  </button>\n</div>\n",
};
module.exports = demo;
}); // rating/docs/demo
