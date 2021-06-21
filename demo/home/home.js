
define('home/home', function(require, module, exports) {

var section = require('section/section');
var config = require('config');

var sections = config.components.map(function(name) {
  var demo = require(name + '/docs/demo');
  demo.name = name;
  demo.title = name[0].toUpperCase() + name.slice(1);
  demo.compiledUrl = 'demo/' + name + '/docs/demo.js';
  return m.u.init(section(demo));
});

exports.controller = function() {

};

exports.view = function(ctrl) {
  var sectionsView = sections.map(function(s) {
    return s.$view();
  });
  return {
    tag: "div",
    attrs: {
      class: "demo"
    },
    children: [{
        tag: "section",
        attrs: {},
        children: [{
          tag: "h1",
          attrs: {},
          children: ["Introduction"]
        }, {
          tag: "h2",
          attrs: {},
          children: ["Getting Started"]
        }, {
          tag: "p",
          attrs: {},
          children: [
            "Download ", {
              tag: "a",
              attrs: {
                href: "https://github.com/olvrng/mithril-bootstrap/blob/master/dist/mithril-bootstrap.js"
              },
              children: ["mithril-bootstrap"]
            }, " and include after ", {
              tag: "a",
              attrs: {
                href: "http://lhorie.github.io/mithril/"
              },
              children: ["mithril.js"]
            }, " script."
          ]
        }, {
          tag: "h2",
          attrs: {},
          children: ["Contributing"]
        }, {
          tag: "p",
          attrs: {},
          children: [
            "Read ", {
              tag: "a",
              attrs: {
                href: "https://github.com/olvrng/mithril-bootstrap/blob/master/contributing-guide.md"
              },
              children: ["contributing-guide.md"]
            }, "."
          ]
        }]
      },

      sectionsView
    ]
  };
};
}); // home/home
