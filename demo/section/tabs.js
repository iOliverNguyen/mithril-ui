
define('section/tabs', function(require, module, exports) {

/** @jsx m */
module.exports = function(config) {

  function controller() {
    this.index = m.prop(0);

    this.coms = config.map(function(c) {
      return m.u.init(c.module);
    });

    this.current = function() {
      return this.coms[this.index()];
    };
  }

  function view(ctrl) {
    var tabs = [],
      panes = [];
    config.forEach(function(c, i) {
      var extraClass = c.class || '';
      var active = ctrl.index() === i ? ' active' : '';
      tabs.push(
        m("li", {
          class: extraClass + active
        }, [
          m("a", {
            href: "#",
            onclick: m.u.mute(m.u.bind(ctrl.index, ctrl, i))
          }, [
            config[i].label
          ])
        ])
      );
      panes.push(
        m("div", {
          class: extraClass + " tab-pane" + active
        }, [
          ctrl.coms[i].$view()
        ])
      );
    });
    return m("div", [
      m("ul", {
        class: "nav nav-tabs"
      }, [
        tabs
      ]),
      m("div", {
        class: "tab-content"
      }, [
        panes
      ])
    ]);
  }

  return {
    controller: controller,
    view: view
  };
};
}); // section/tabs
