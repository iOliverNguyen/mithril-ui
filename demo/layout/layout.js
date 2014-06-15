
define('layout/layout', function(require, module, exports) {

/** @jsx m */
var u = m.u;

function layout($module) {

  function controller() {
    this.com = u.init($module);
    this.tabs = [{
      href: '/',
      label: 'Home'
    }];
  }

  function view(ctrl) {
    var tabs = [];
    for (var i = 0; i < ctrl.tabs.length; i++) {
      var tab = ctrl.tabs[i];
      tabs.push(
        m("li", {
          class: isActive(tab.href)
        }, [
          m("a", {
            href: tab.href,
            config: m.route
          }, [tab.label])
        ])
      );
    }

    function isActive(r) {
      return m.route() === r ? 'active' : '';
    }

    return m("div", {
      class: "page"
    }, [
      /** @jsx m */
      m("header", {
        class: "navbar navbar-fixed-top navbar-default"
      }, [
        m("div", {
          class: "container"
        }, [
          m("div", {
            class: "navbar-header"
          }, [
            m("a", {
              class: "navbar-brand"
            }, ["Mithril Bootstrap"])
          ]),
          m("nav", [
            m("ul", {
              class: "nav navbar-nav"
            }, [
              m("li", [m("a", {
                target: "_blank",
                href: "https://github.com/olvrng/mithril-bootstrap"
              }, ["GitHub"])])
            ]),
            m("ul", {
              class: "nav navbar-nav navbar-right"
            }, [
              m("li", [m("a", {
                target: "_blank",
                href: "http://lhorie.github.io/mithril/"
              }, ["Mithril"])])
            ])
          ])
        ])
      ]),
      m("div", {
        class: "navbar-space"
      }),

      m("div", {
        class: "container main-page"
      }, [
        ctrl.com.$view()
      ]),

      /** @jsx m */
      m("footer", [
        m("div", {
          class: "container"
        }, [
          "Mithril-Bootstrap - ",
          m("a", {
            href: "https://github.com/olvrng/mithril-bootstrap/blob/master/LICENSE"
          }, ["MIT License"])
        ])
      ])

    ]);
  }

  return {
    controller: controller,
    view: view
  };
}

module.exports = layout;
}); // layout/layout
