
define('section/code', function(require, module, exports) {

/** @jsx m */
var start = '// START';
var end = '// END';
var r = new RegExp(start + '([\\s\\S]*)' + end);

module.exports = function(filepath) {

  function controller() {
    m.request({
      method: 'GET',
      url: filepath,
      deserialize: deserialize.bind(this)
    });

    function deserialize(v) {
      var matches = r.exec(v);
      this.code = matches ? matches[1].trim() : v;
    }
  }

  function view(ctrl) {
    function highlight(elem, isInit) {
      if (!isInit) {
        hljs.highlightBlock(elem);
      }
    }

    return m("pre", [
      m("code", {
        config: highlight
      }, [
        ctrl.code
      ])
    ]);
  }

  return {
    controller: controller,
    view: view
  };
};
}); // section/code
