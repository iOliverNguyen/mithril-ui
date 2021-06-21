
define('typeahead/docs/demo', function(require, module, exports) {

// START
var demo = {};
demo.controller = function() {
  this.countries = m.request({
    method: 'GET',
    url: 'countries.json'
  });
  this.selectedItem = m.prop(undefined);
  this.typeahead = m.u.init(m.ui.typeahead({
    list: this.countries,
    onselect: this.selectedItem,
    label: function(item) {
      return item.name;
    },
    template: function(item) {
      return {
        tag: "div",
        attrs: {},
        children: [{
            tag: "img",
            attrs: {
              src: item.flag
            }
          }, " ",
          item.name
        ]
      };
    }
  }));
};

demo.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {},
    children: [
      ctrl.typeahead.$view(), {
        tag: "br",
        attrs: {}
      }, {
        tag: "pre",
        attrs: {},
        children: [
          "Selected: ", JSON.stringify(ctrl.selectedItem(), null, '  ')
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
    children: ["Typeahead is a Mithril version of ", {
      tag: "a",
      attrs: {
        href: "http://getbootstrap.com/2.3.2/javascript.html#typeahead"
      },
      children: ["Bootstrap v2's typeahead plugin"]
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
      children: ["m.ui.typeahead(settings)"]
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
          children: ["list"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(required)"]
        }, ": Source array."]
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
          children: ["selectedItem"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(default undefined)"]
        }, ": Current selected item or undefine."]
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
          children: ["label"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["function(item) string"]
          }]
        }, ": Return string representation of each item for processing filter and displaying."]
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
          children: ["template"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["function(item) virtualDOM"]
          }]
        }, ": Custom template for list item."]
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
          children: ["onselect"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["function(item)"]
          }]
        }, ": Listen to user select event."]
      }]
    }]
  }]
};
demo.small = 'm.ui.typeahead';
demo.files = {
  'demo.jsx': "// START\nvar demo = {};\ndemo.controller = function() {\n  this.countries = m.request({\n    method: 'GET',\n    url: 'countries.json'\n  });\n  this.selectedItem = m.prop(undefined);\n  this.typeahead = m.u.init(m.ui.typeahead({\n    list: this.countries,\n    onselect: this.selectedItem,\n    label: function(item) {\n      return item.name;\n    },\n    template: function(item) {\n      return <div>\n        <img src={item.flag}/>&nbsp;\n        {item.name}\n      </div>;\n    }\n  }));\n};\n\ndemo.view = function(ctrl) {\n  return INCLUDE('./template');\n};\n// END\n\ndemo.doc =  INCLUDE('./readme');\ndemo.small = 'm.ui.typeahead';\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx'),\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>\n  {ctrl.typeahead.$view()}<br/>\n  <pre>\n    Selected: {JSON.stringify(ctrl.selectedItem(), null, '  ')}\n  </pre>\n</div>\n",
};
module.exports = demo;
}); // typeahead/docs/demo
