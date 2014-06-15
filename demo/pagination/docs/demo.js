
define('pagination/docs/demo', function(require, module, exports) {

/** @jsx m */
// START
var demo = {};
demo.controller = function() {
  this.countries = m.request({
    method: 'GET',
    url: 'countries.json'
  });
  this.totalItems = function() {
    return this.countries() ? this.countries().length : 0;
  }.bind(this);

  this.currentPage = m.prop(0);
  this.itemsPerPage = m.prop(5);
  this.maxSize = 7;
  this.directionLinks = true;
  this.boundaryLinks = true;
  this.previousText = '<';
  this.nextText = '>';

  this.pagination = m.u.init(m.ui.pagination(this));
};

demo.view = function(ctrl) {
  var size = ctrl.itemsPerPage();
  var page = ctrl.currentPage();
  var rows = ctrl.countries()
    .slice(size * page, size * (page + 1))
    .map(function(item, i) {
      return m("tr", [
        m("td", [size * page + i + 1]),
        m("td", [m("img", {
          src: item.flag
        }), " ", item.name])
      ]);
    });

  return m("div", [
    m("pre", [
      "Total: ", ctrl.totalItems(), m("br"),
      "Page: ", page, "/", ctrl.pagination.numPages(), " (zero-based)"
    ]),
    m("div", [ctrl.pagination.$view()]),
    m("button", {
      class: "btn btn-info",
      onclick: function() {
        ctrl.pagination.setPage(10);
      }
    }, [
      "Go to page 10"
    ]),
    m("table", {
      class: "table"
    }, [
      m("thead", [
        m("tr", [
          m("th", {
            class: "#"
          }, ["#"]),
          m("th", ["Country"])
        ])
      ]),
      m("tbody", [
        rows
      ])
    ])
  ]);
};
// END

demo.doc = m("div", [
  m("p", ["Pagination is a Mithril component that takes care of paging."]),
  m("h3", {
    id: "settings"
  }, ["Settings"]),
  m("ul", [
    m("li", [m("p", [m("code", ["currentPage"]), " ", m("em", ["(default 0)"]), ": Current page number. First page is 0."])]),
    m("li", [m("p", [m("code", ["totalItems"]), " ", m("em", ["(default 0)"]), ": Total number of items in all pages."])]),
    m("li", [m("p", [m("code", ["itemsPerPage"]), " ", m("em", ["(default 10)"]), ": Number of items per page."])]),
    m("li", [m("p", [m("code", ["maxSize"]), " ", m("em", ["(default 5)"]), ": Limit number for pagination size."])]),
    m("li", [m("p", [m("code", ["directionLinks"]), m("em", ["(default true)"]), ": Whether to display Previous / Next buttons."])]),
    m("li", [m("p", [m("code", ["boundaryLinks"]), " ", m("em", ["(default false)"]), ": Whether to display First / Last buttons."])]),
    m("li", [m("p", [m("code", ["previousText"]), " ", m("em", ["(default 'Previous')"]), " : Text for Previous button."])]),
    m("li", [m("p", [m("code", ["nextText"]), " ", m("em", ["(default 'Next')"]), " : Text for Next button."])]),
    m("li", [m("p", [m("code", ["firstText"]), " ", m("em", ["(default 'First')"]), " : Text for First button."])]),
    m("li", [m("p", [m("code", ["lastText"]), " ", m("em", ["(default 'Last')"]), " : Text for Last button."])])
  ]),
  m("h3", {
    id: "methods"
  }, ["Methods"]),
  m("ul", [
    m("li", [m("p", [m("code", ["numPages()"]), ": Total number of pages."])]),
    m("li", [m("p", [m("code", ["setPage(page)"]), ": Set current page."])])
  ])
]);
module.exports = demo;
}); // pagination/docs/demo
