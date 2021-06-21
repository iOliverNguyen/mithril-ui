
define('modal/docs/demo', function(require, module, exports) {

// START
var modal = {};
modal.controller = function(params) {
  var ctrl = this;
  ctrl.items = params.items;
  ctrl.selected = m.prop('item1');

  ctrl.ok = function() {
    ctrl.$modal.close(ctrl.selected());
  };

  ctrl.cancel = function() {
    ctrl.$modal.dismiss('Cancel');
  };
};

modal.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {},
    children: [{
      tag: "div",
      attrs: {
        class: "modal-header"
      },
      children: [{
        tag: "h3",
        attrs: {
          class: "modal-title"
        },
        children: ["I'm a modal!"]
      }]
    }, {
      tag: "div",
      attrs: {
        class: "modal-body"
      },
      children: [{
          tag: "ul",
          attrs: {},
          children: [

            ctrl.items.map(function(item) {
              return {
                tag: "li",
                attrs: {},
                children: [{
                  tag: "a",
                  attrs: {
                    onclick: m.u.bind(ctrl.selected, ctrl, item)
                  },
                  children: [item]
                }]
              };
            })

          ]
        },
        "Selected: ", {
          tag: "b",
          attrs: {},
          children: [ctrl.selected()]
        }
      ]
    }, {
      tag: "div",
      attrs: {
        class: "modal-footer"
      },
      children: [{
        tag: "button",
        attrs: {
          class: "btn btn-primary",
          onclick: ctrl.ok
        },
        children: ["OK"]
      }, {
        tag: "button",
        attrs: {
          class: "btn btn-warning",
          onclick: ctrl.cancel
        },
        children: ["Cancel"]
      }]
    }]
  };
};

var demo = {};
demo.controller = function() {
  var ctrl = this;
  ctrl.items = ['item1', 'item2', 'item3'];
  ctrl.selected = m.prop('');
  ctrl.openModal = function(size) {
    return function() {
      ctrl.modalInstance = m.u.init(m.ui.modal({
        size: size,
        params: {
          items: ctrl.items
        },
        module: modal
      }));

      ctrl.modalInstance.result.then(function(selectedItem) {
        ctrl.selected(selectedItem);
      }, function() {
        console.log('Modal dismissed');
      });
    };
  };
};

demo.view = function(ctrl) {
  return {
    tag: "div",
    attrs: {},
    children: [{
        tag: "button",
        attrs: {
          class: "btn btn-default",
          onclick: ctrl.openModal()
        },
        children: [
          "Open me!"
        ]
      }, " ", {
        tag: "button",
        attrs: {
          class: "btn btn-default",
          onclick: ctrl.openModal('lg')
        },
        children: [
          "Large modal"
        ]
      }, " ", {
        tag: "button",
        attrs: {
          class: "btn btn-default",
          onclick: ctrl.openModal('sm')
        },
        children: [
          "Small modal"
        ]
      },

      ctrl.selected() ? {
        tag: "div",
        attrs: {
          "ng-show": "selected"
        },
        children: [
          "Selection from a modal: ", ctrl.selected()
        ]
      } : [],

      {
        tag: "div",
        attrs: {},
        children: [
          ctrl.modalInstance ? ctrl.modalInstance.$view() : []
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
    children: ["Quickly create Bootstrap's modal in Mithril"]
  }, {
    tag: "p",
    attrs: {},
    children: [{
      tag: "strong",
      attrs: {},
      children: ["TODO"]
    }, ": animation, params, $modal, keyboard, backdrop"]
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
      children: ["m.ui.modal(settings)"]
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
          children: ["module"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: ["(required)"]
        }, ": Modal instance module."]
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
          children: ["size"]
        }, ": Optional size of modal window. Allowed: ", {
          tag: "code",
          attrs: {},
          children: ["'sm'"]
        }, " or ", {
          tag: "code",
          attrs: {},
          children: ["'lg'"]
        }, "."]
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
          children: ["params"]
        }, ": Optional params to pass to modal instance controller as ", {
          tag: "code",
          attrs: {},
          children: ["controller(params)"]
        }, "."]
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
          children: ["onopen"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["function(modalCtrl)"]
          }]
        }, ": Optional callback. If set, it will be called after the modal display and the modal instance callback runs."]
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
          children: ["onclose"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["function(result, reason)"]
          }]
        }, ": Optional callback. If set, it will be called after the modal close as ", {
          tag: "code",
          attrs: {},
          children: ["onclose(result)"]
        }, " or dismiss as ", {
          tag: "code",
          attrs: {},
          children: ["onclose(undefined, reason)"]
        }, "."]
      }]
    }]
  }, {
    tag: "h3",
    attrs: {
      id: "modal-properties-and-methods"
    },
    children: ["Modal Properties and Methods"]
  }, {
    tag: "p",
    attrs: {},
    children: ["These properties and methods are accessible from outside or via ", {
      tag: "code",
      attrs: {},
      children: ["this.$modal"]
    }, " inside modal instance controller."]
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
          children: ["result"]
        }, ": A promise that is resolved when a modal is closed and rejected when a modal is dismissed."]
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
          children: ["opening()"]
        }, ": Boolean value indicates that the modal is opening."]
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
          children: ["open()"]
        }, ": Display the modal. The modal is display by default so you usually do not need to call this method directly."]
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
          children: ["close(result)"]
        }, ": Close a modal and pass a result."]
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
          children: ["dismiss(reason)"]
        }, ": Dismiss a modal and pass a reason."]
      }]
    }]
  }, {
    tag: "h3",
    attrs: {
      id: "modal-instance"
    },
    children: ["Modal Instance"]
  }, {
    tag: "p",
    attrs: {},
    children: ["Modal instance controller are call with ", {
      tag: "code",
      attrs: {},
      children: ["controller(params)"]
    }, " where ", {
      tag: "code",
      attrs: {},
      children: ["params"]
    }, " is ", {
      tag: "code",
      attrs: {},
      children: ["settings.params"]
    }, "."]
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
          children: ["$modal"]
        }, ": Access the modal controller and its methods."]
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
          children: ["onopen"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["function(modalCtrl)"]
          }]
        }, ": If set, it will be called when the modal display and before ", {
          tag: "code",
          attrs: {},
          children: ["settings.onopen"]
        }, " is called."]
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
          children: ["onclose"]
        }, " ", {
          tag: "em",
          attrs: {},
          children: [{
            tag: "code",
            attrs: {},
            children: ["function(result, reason)"]
          }]
        }, ": If set, it will be called when the modal close as ", {
          tag: "code",
          attrs: {},
          children: ["onclose(result)"]
        }, " or dismiss as", {
          tag: "code",
          attrs: {},
          children: ["onclose(undefined, reason)"]
        }, "."]
      }]
    }]
  }]
};
demo.small = 'm.ui.modal';
demo.files = {
  'demo.jsx': "// START\nINCLUDE('./modal')\n\nvar demo = {};\ndemo.controller = function() {\n  var ctrl = this;\n  ctrl.items = ['item1', 'item2', 'item3'];\n  ctrl.selected = m.prop('');\n  ctrl.openModal = function(size) {\n    return function() {\n      ctrl.modalInstance = m.u.init(m.ui.modal({\n        size: size,\n        params: {\n          items: ctrl.items\n        },\n        module: modal\n      }));\n\n      ctrl.modalInstance.result.then(function(selectedItem) {\n        ctrl.selected(selectedItem);\n      }, function() {\n        console.log('Modal dismissed');\n      });\n    };\n  };\n};\n\ndemo.view = function(ctrl) {\n  return INCLUDE('./template');\n};\n// END\n\ndemo.doc =  INCLUDE('./readme');\ndemo.small = 'm.ui.modal';\ndemo.files = {\n  'demo.jsx': CONTENT('./demo.jsx'),\n  '_template.jsx': CONTENT('./_template.jsx'),\n  '_modal.jsx': CONTENT('./_modal.jsx'),\n  '_modal.tpl.jsx': CONTENT('./_modal.tpl.jsx')\n};\nmodule.exports = demo;\n",
  '_template.jsx': "<div>\n  <button class=\"btn btn-default\" onclick={ctrl.openModal()}>\n    Open me!</button>&nbsp;\n  <button class=\"btn btn-default\" onclick={ctrl.openModal('lg')}>\n    Large modal</button>&nbsp;\n  <button class=\"btn btn-default\" onclick={ctrl.openModal('sm')}>\n    Small modal</button>\n  {\n    ctrl.selected()?\n    <div ng-show=\"selected\">\n      Selection from a modal: {ctrl.selected()}\n    </div>: []\n  }\n  <div>\n  {ctrl.modalInstance? ctrl.modalInstance.$view() : []}\n  </div>\n</div>\n",
  '_modal.jsx': "var modal = {};\nmodal.controller = function(params) {\n  var ctrl = this;\n  ctrl.items = params.items;\n  ctrl.selected = m.prop('item1');\n\n  ctrl.ok = function() {\n    ctrl.$modal.close(ctrl.selected());\n  };\n\n  ctrl.cancel = function() {\n    ctrl.$modal.dismiss('Cancel');\n  };\n};\n\nmodal.view = function(ctrl) {\n  return INCLUDE('./modal.tpl');\n};\n",
  '_modal.tpl.jsx': "<div>\n  <div class=\"modal-header\">\n    <h3 class=\"modal-title\">I'm a modal!</h3>\n  </div>\n  <div class=\"modal-body\">\n    <ul>\n      {\n        ctrl.items.map(function(item) {\n          return <li>\n            <a onclick={m.u.bind(ctrl.selected, ctrl, item)}>{item}</a>\n          </li>;\n        })\n      }\n    </ul>\n    Selected: <b>{ctrl.selected()}</b>\n  </div>\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-primary\" onclick={ctrl.ok}>OK</button>\n    <button class=\"btn btn-warning\" onclick={ctrl.cancel}>Cancel</button>\n  </div>\n</div>\n"
};
module.exports = demo;
}); // modal/docs/demo
