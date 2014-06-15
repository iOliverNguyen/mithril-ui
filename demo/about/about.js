
define('about/about', function(require, module, exports) {

/** @jsx m */
exports.controller = function() {

};

exports.view = function(ctrl) {
  return m("div", {
    class: "about"
  }, [
    m("h2", ["About Mithril Bootstrap"]),
    m("p", [
      "Implementation of Bootstrap JavaScript components in Mithril.", m("br"),
      "For more information, browse ", m("a", {
        href: "https://github.com/olvrng/mithril-bootstrap"
      }, ["project page"]), " on GitHub."
    ])
  ]);
};
}); // about/about
