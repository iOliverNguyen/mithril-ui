
define('typeahead/docs/demo', function(require, module, exports) {

/** @jsx m */
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
      return m("div", [
        m("img", {
          src: item.flag
        }), " ",
        item.name
      ]);
    }
  }));
};

demo.view = function(ctrl) {
  return m("div", [
    ctrl.typeahead.$view(), m("br"),
    m("pre", [
      "Selected: ", JSON.stringify(ctrl.selectedItem(), null, '  ')
    ])
  ]);
};
// END

demo.doc = m("div", [
  m("p", ["Typeahead is a Mithril version of ", m("a", {
    href: "http://getbootstrap.com/2.3.2/javascript.html#typeahead"
  }, ["Bootstrap v2's typeahead plugin"]), "."]),
  m("h3", {
    id: "settings"
  }, ["Settings"]),
  m("ul", [
    m("li", [m("p", [m("code", ["list"]), " ", m("em", ["(required)"]), ": Source array."])]),
    m("li", [m("p", [m("code", ["selectedItem"]), " ", m("em", ["(default undefined)"]), ": Current selected item or undefine."])]),
    m("li", [m("p", [m("code", ["label"]), " ", m("em", [m("code", ["function(item) string"])]), ": Return string representation of each item for processing filter and displaying."])]),
    m("li", [m("p", [m("code", ["template"]), " ", m("em", [m("code", ["function(item) virtualDOM"])]), ": Custom template for list item."])]),
    m("li", [m("p", [m("code", ["onselect"]), " ", m("em", [m("code", ["function(item)"])]), ": Listen to user select event."])])
  ])
]);
module.exports = demo;
}); // typeahead/docs/demo
