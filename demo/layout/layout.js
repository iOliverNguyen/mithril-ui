
define('layout/layout', function(require, module, exports) {

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
      tabs.push({
        tag: "li",
        attrs: {
          class: isActive(tab.href)
        },
        children: [{
          tag: "a",
          attrs: {
            href: tab.href,
            config: m.route
          },
          children: [tab.label]
        }]
      });
    }

    function isActive(r) {
      return m.route() === r ? 'active' : '';
    }

    return {
      tag: "div",
      attrs: {
        class: "page"
      },
      children: [{
          tag: "header",
          attrs: {
            class: "navbar navbar-fixed-top navbar-default"
          },
          children: [{
            tag: "div",
            attrs: {
              class: "container"
            },
            children: [{
              tag: "div",
              attrs: {
                class: "navbar-header"
              },
              children: [{
                tag: "a",
                attrs: {
                  class: "navbar-brand"
                },
                children: ["Mithril Bootstrap"]
              }]
            }, {
              tag: "nav",
              attrs: {},
              children: [{
                tag: "ul",
                attrs: {
                  class: "nav navbar-nav"
                },
                children: [{
                  tag: "li",
                  attrs: {},
                  children: [{
                    tag: "a",
                    attrs: {
                      target: "_blank",
                      href: "https://github.com/olvrng/mithril-bootstrap"
                    },
                    children: ["GitHub"]
                  }]
                }]
              }, {
                tag: "ul",
                attrs: {
                  class: "nav navbar-nav navbar-right"
                },
                children: [{
                  tag: "li",
                  attrs: {},
                  children: [{
                    tag: "a",
                    attrs: {
                      target: "_blank",
                      href: "https://mithril.js.org"
                    },
                    children: ["Mithril"]
                  }]
                }]
              }]
            }]
          }]
        }, {
          tag: "div",
          attrs: {
            class: "navbar-space"
          }
        },

        {
          tag: "div",
          attrs: {
            class: "container main-page"
          },
          children: [
            ctrl.com.$view()
          ]
        },

        {
          tag: "footer",
          attrs: {},
          children: [{
            tag: "div",
            attrs: {
              class: "container"
            },
            children: [
              "Mithril-Bootstrap - ", {
                tag: "a",
                attrs: {
                  href: "https://github.com/olvrng/mithril-bootstrap/blob/master/LICENSE"
                },
                children: ["MIT License"]
              }
            ]
          }]
        }

      ]
    };
  }

  return {
    controller: controller,
    view: view
  };
}

module.exports = layout;
}); // layout/layout
