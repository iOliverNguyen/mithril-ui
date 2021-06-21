
define('section/tabs', function(require, module, exports) {

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
      tabs.push({
        tag: "li",
        attrs: {
          class: extraClass + active
        },
        children: [{
          tag: "a",
          attrs: {
            href: "#",
            onclick: m.u.mute(m.u.bind(ctrl.index, ctrl, i))
          },
          children: [
            config[i].label
          ]
        }]
      });
      panes.push({
        tag: "div",
        attrs: {
          class: extraClass + " tab-pane" + active
        },
        children: [
          ctrl.coms[i].$view()
        ]
      });
    });
    return {
      tag: "div",
      attrs: {},
      children: [{
        tag: "ul",
        attrs: {
          class: "nav nav-tabs"
        },
        children: [
          tabs
        ]
      }, {
        tag: "div",
        attrs: {
          class: "tab-content"
        },
        children: [
          panes
        ]
      }]
    };
  }

  return {
    controller: controller,
    view: view
  };
};
}); // section/tabs
