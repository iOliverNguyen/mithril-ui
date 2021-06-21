
define('section/section', function(require, module, exports) {

/**
  config: {
    desc: template,
    files: [string],
    name: string,
    title: string,
    id: string,
    controller: function(),
    view: function(ctrl)
  }
*/
var tabs = require('section/tabs');
var code = require('section/code');

var start = '// START';
var end = '// END';
var r = new RegExp(start + '([\\s\\S]*?)' + end);

module.exports = function(config) {

  function extract(v) {
    v = v.replace(/\/\*\* \@jsx m \*\//g, '')
      .replace(/\n[\t ]*\n[\t ]*\n/g, '\n\n');
    var matches = r.exec(v);
    return matches ? matches[1].trim() : v;
  }

  function controller() {
    var codes = [];
    for (var name in config.files) {
      codes.push({
        class: 'code',
        label: name,
        module: code(extract(config.files[name]))
      });
    }

    this.demo = m.u.init(config);
    this.tabs1 = m.u.init(tabs(codes));

    m.request({
      method: 'GET',
      url: config.compiledUrl,
      deserialize: function(v) {
        return v;
      }
    })
      .then(function(data) {
        this.tabs2 = m.u.init(tabs([{
          class: 'code',
          label: 'Compiled JS',
          module: code(extract(data))
        }]));
      }.bind(this));
  }

  function view(ctrl) {
    return {
      tag: "section",
      attrs: {
        id: config.name
      },
      children: [{
        tag: "h1",
        attrs: {},
        children: [
          config.title, " ", {
            tag: "small",
            attrs: {},
            children: ["(", config.small, ")"]
          }
        ]
      }, {
        tag: "div",
        attrs: {
          class: "row"
        },
        children: [{
          tag: "div",
          attrs: {
            class: "col-md-6 demo"
          },
          children: [
            ctrl.demo.$view()
          ]
        }, {
          tag: "div",
          attrs: {
            class: "col-md-6 doc"
          },
          children: [
            config.doc
          ]
        }]
      }, {
        tag: "div",
        attrs: {
          class: "row"
        },
        children: [{
          tag: "div",
          attrs: {
            class: "col-md-6 code"
          },
          children: [
            ctrl.tabs1.$view()
          ]
        }, {
          tag: "div",
          attrs: {
            class: "col-md-6 code"
          },
          children: [
            ctrl.tabs2 ? ctrl.tabs2.$view() : ''
          ]
        }]
      }]
    };
  }

  return {
    controller: controller,
    view: view
  };
};
}); // section/section
