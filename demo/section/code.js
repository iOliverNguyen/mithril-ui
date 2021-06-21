
define('section/code', function(require, module, exports) {

module.exports = function(code) {

  function controller() {

  }

  function view(ctrl) {
    function highlight(elem, isInit) {
      if (!isInit) {
        hljs.highlightBlock(elem);
      }
    }

    return {
      tag: "pre",
      attrs: {},
      children: [{
        tag: "code",
        attrs: {
          config: highlight
        },
        children: [
          code
        ]
      }]
    };
  }

  return {
    controller: controller,
    view: view
  };
};
}); // section/code
