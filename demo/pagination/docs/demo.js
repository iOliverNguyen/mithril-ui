
define('pagination/docs/demo', function(require, module, exports) {

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
      return {
        tag: "tr",
        attrs: {},
        children: [{
          tag: "td",
          attrs: {},
          children: [size * page + i + 1]
        }, {
          tag: "td",
          attrs: {},
          children: [{
            tag: "img",
            attrs: {
              src: item.flag
            }
          }, " ", item.name]
        }]
      };
    });

  return {
    tag: "div",
    attrs: {},
    children: [{
      tag: "pre",
      attrs: {},
      children: [
        "Total: ", ctrl.totalItems(), {
          tag: "br",
          attrs: {}
        },
        "Page: ", page, "/", ctrl.pagination.numPages(), " (zero-based)"
      ]
    }, {
      tag: "div",
      attrs: {},
      children: [ctrl.pagination.$view()]
    }, {
      tag: "button",
      attrs: {
        class: "btn btn-info",
        onclick: function() {
          ctrl.pagination.setPage(10);
        }
      },
      children: [
        "Go to page 10"
      ]
    }, {
      tag: "table",
      attrs: {
        class: "table"
      },
      children: [{
        tag: "thead",
        attrs: {},
        children: [{
          tag: "tr",
          attrs: {},
          children: [{
            tag: "th",
            attrs: {
              class: "#"
            },
            children: ["#"]
          }, {
            tag: "th",
            attrs: {},
            children: ["Country"]
          }]
        }]
      }, {
        tag: "tbody",
        attrs: {},
        children: [
          rows
        ]
      }]
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
    children: ["Pagination is a Mithril component that takes care of paging."]
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
      children: ["m.ui.pagination(settings)"]
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
          children: ["currentPage"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(default 0)"]
        }, ": Current page number. First page is 0."]
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
          children: ["totalItems"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(default 0)"]
        }, ": Total number of items in all pages."]
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
          children: ["itemsPerPage"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(default 10)"]
        }, ": Number of items per page."]
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
          children: ["maxSize"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(default 5)"]
        }, ": Limit number for pagination size."]
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
          children: ["directionLinks"]
        }, {
          tag: "em",
          attrs: {},
          children: ["(default true)"]
        }, ": Whether to display Previous / Next buttons."]
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
          children: ["boundaryLinks"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(default false)"]
        }, ": Whether to display First / Last buttons."]
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
          children: ["previousText"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(default 'Previous')"]
        }, " : Text for Previous button."]
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
          children: ["nextText"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(default 'Next')"]
        }, " : Text for Next button."]
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
          children: ["firstText"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(default 'First')"]
        }, " : Text for First button."]
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
          children: ["lastText"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(default 'Last')"]
        }, " : Text for Last button."]
      }]
    }]
  }, {
    tag: "h3",
    attrs: {
      id: "methods"
    },
    children: ["Methods"]
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
          children: ["numPages()"]
        }, ": Total number of pages."]
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
          children: ["setPage(page)"]
        }, ": Set current page."]
      }]
    }]
  }]
};
demo.small = 'm.ui.pagination';
demo.files = {
  'demo.jsx': "// START\nvar demo = {};\ndemo.controller = function() {\n  this.countries = m.request({\n    method: 'GET',\n    url: 'countries.json'\n  });\n  this.totalItems = function() {\n    return this.countries()? this.countries().length : 0;\n  }.bind(this);\n\n  this.currentPage = m.prop(0);\n  this.itemsPerPage = m.prop(5);\n  this.maxSize = 7;\n  this.directionLinks = true;\n  this.boundaryLinks = true;\n  this.previousText = '<';\n  this.nextText = '>';\n\n  this.pagination = m.u.init(m.ui.pagination(this));\n};\n\ndemo.view = function(ctrl) {\n  var size = ctrl.itemsPerPage();\n  var page = ctrl.currentPage();\n  var rows = ctrl.countries()\n    .slice(size*page, size*(page+1))\n    .map(function(item, i) {\n      return <tr>\n        <td>{size*page + i + 1}</td>\n        <td><img src={item.flag}/>&nbsp;{item.name}</td>\n      </tr>;\n    });\n\n  return INCLUDE('./template');\n};\n// END\n\ndemo.doc =  INCLUDE('./readme');\ndemo.small = 'm.ui.pagination';\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx'),\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>\n  <pre>\n    Total: {ctrl.totalItems()}<br/>\n    Page: {page}/{ctrl.pagination.numPages()} (zero-based)\n  </pre>\n  <div>{ctrl.pagination.$view()}</div>\n  <button class=\"btn btn-info\"\n    onclick={function(){ ctrl.pagination.setPage(10); }}>\n    Go to page 10\n  </button>\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th class=\"#\">#</th>\n        <th>Country</th>\n      </tr>\n    </thead>\n    <tbody>\n      {rows}\n    </tbody>\n  </table>\n</div>\n",
};
module.exports = demo;
}); // pagination/docs/demo
