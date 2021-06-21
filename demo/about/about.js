
define('about/about', function(require, module, exports) {

exports.controller = function() {

};

exports.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {
      class: "about"
    },
    children: [{
      tag: "h2",
      attrs: {},
      children: ["About Mithril Bootstrap"]
    }, {
      tag: "p",
      attrs: {},
      children: [
        "Implementation of Bootstrap JavaScript components in Mithril.", {
          tag: "br",
          attrs: {}
        },
        "For more information, browse ", {
          tag: "a",
          attrs: {
            href: "https://github.com/olvrng/mithril-bootstrap"
          },
          children: ["project page"]
        }, " on GitHub."
      ]
    }]
  };
};
}); // about/about
