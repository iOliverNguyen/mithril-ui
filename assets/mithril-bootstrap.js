;(function(m) {

var u = m.u = {};
var ui = m.ui = {};

var shift = Array.prototype.shift;
var unshift = Array.prototype.unshift;
var slice = Array.prototype.slice;

u.eachFunc = function() {
  var funcs = arguments;
  return function() {
    for (var i=0; i < funcs.length; i++) {
      funcs[i].apply(this, arguments);
    }
  };
};

u.init = function($module, initObj) {

  // NOTE: should we use inheritance or directly modify controller instance

  var ctrl = initObj || {};
  var obj = ctrl;
  // var obj = Object.create(ctrl);

  $module.controller.apply(ctrl, slice.call(arguments, 2));
  obj.$module = $module;
  obj.$view = $module.view.bind({}, ctrl);
  return obj;
};

u.mute = function(cb) {
  return function(e) {
    e.preventDefault();
    if (cb) return cb(e);
  };
};

u.silence = u.mute;

u.exec = function(expr) {
  var args = slice.call(arguments, 1);
  if (typeof expr === 'function') return expr.apply(this, args);
  return expr;
};

u.save = function(expr, value) {
  if (typeof expr === 'function') return expr(value);
  return expr;
};

u.prop = function(store) {
  if (typeof store === 'function') return store;
  var p = function() {
    if (arguments.length) store = arguments[0];
    return store;
  };
  p.toJSON = function() { return store; };
  return p;
};

u.bind = function(fn, context) {
  var args = arguments;
  return function() {
    var a = slice.call(args, 2).concat(slice.call(arguments, 0));
    return fn.apply(context, a);
  };
};

u.truth = function(value, valueTrue, valueFalse) {
  return value === valueTrue? true: value === valueFalse? false: !!value;
};

function min(a, b) {
  return a < b? a : b;
}

function max(a, b) {
  return a < b? b : a;
}

function def(a, d) {
  return a !== undefined? a : d;
}

ui.accordion = function(options) {

  options = options || {};

  function controller() {
    var ctrl = this;
    ctrl.group = (options.group||[]).map(function(g) {
      var o = {
        heading: u.prop(g.heading||''),
        com: u.init(g.module),
        open: u.prop(g.open||false),
        disabled: u.prop(g.disabled||false),
        animating: u.prop(false),
        animation: function(element, isInit) {
          if (!isInit) element.addEventListener('transitionend',
            function() {
              o.animating(false);
              if (o.open()) element.style.height = 'auto';
              else element.classList.add('collapse');
              element.classList.remove('collapsing');
            });

          if (!o.animating() && !o.open()) element.classList.add('collapse');
          else element.classList.remove('collapse');

          if (o.animating()) {
            element.classList.add('collapsing');

            var height;
            if (o.open()) {
              element.style.height = 'auto';
              height = element.getBoundingClientRect().height;
              element.style.height = '0';
              setTimeout(function() {
                element.style.height = height + 'px';
              }, 0);

            } else {
              element.style.height = 'auto';
              height = element.getBoundingClientRect().height;
              element.style.height = height + 'px';
              setTimeout(function() {
                element.style.height = '0';
              }, 0);
            }
          }

        }.bind(o)
      };

      return o;
    });

    ctrl.closeOthers = u.prop(options.closeOthers||false);

    ctrl.toggle = function(index) {
      var g = ctrl.group[index];
      if (!g) throw new Error('index out of range');

      if (g.disabled()) return;
      g.open(!g.open());
      g.animating(true);

      if (g.open() && ctrl.closeOthers()) {
        for (var i=0; i < ctrl.group.length; i++) {
          var other = ctrl.group[i];
          if (other !== g) {
            if (other.open()) other.animating(true);
            other.open(false);
          }
        }
      }
    };
  }

  function view(ctrl) {
    var rows = ctrl.group.map(function(g,i) {
      return {tag: "div", attrs: {class:"panel panel-default"}, children: [
  {tag: "div", attrs: {class:"panel-heading"}, children: [
    {tag: "h4", attrs: {class:"panel-title"}, children: [
      {tag: "a", attrs: {class:"accordion-toggle", onclick:u.mute(u.bind(ctrl.toggle, ctrl, i))}, children: [
        {tag: "span", attrs: {class:g.disabled()?'text-muted':''}, children: [g.heading()
        ]}
      ]}
    ]}
  ]}, 
  {tag: "div", attrs: {config:g.animation}, children: [
    {tag: "div", attrs: {class:"panel-body"}, children: [
      {tag: "span", attrs: {}, children: [
      g.com.$view()
      ]}
    ]}
  ]}
]};
    });

    return {tag: "div", attrs: {class:"panel-group"}, children: [rows]};
  }

  return {
    controller: controller,
    view: view
  };
};

ui.renderAlert = function(options) {
  options = options || {};
  var type = u.exec(options.type) || 'warning';
  var msg = u.exec(options.msg) || '';

  return {tag: "div", attrs: {class:"alert alert-" + type + (options.close? " alert-dismissable": "")}, children: [
    
      options.close?
      {tag: "button", attrs: {class:"close", onclick:options.close}, children: [
        {tag: "span", attrs: {"aria-hidden":"true"}, children: ["×"]}, 
        {tag: "span", attrs: {class:"sr-only"}, children: ["Close"]}
      ]}:
      [], 
    
    {tag: "div", attrs: {}, children: [msg]}
  ]};
};

ui.configCheckbox = function(prop, options) {
  options = options || {};
  prop = u.prop(prop);
  var valueTrue = u.prop(options.true === undefined? true: options.true);
  var valueFalse = u.prop(options.false === undefined? false: options.false);

  return function(element, isInit) {
    var truth = u.truth(prop(), valueTrue(), valueFalse());

    if (truth) element.classList.add('active');
    else element.classList.remove('active');

    if (!isInit) {
      element.addEventListener('click', function(e) {
        var truth = u.truth(prop(), valueTrue(), valueFalse());
        prop(!truth?valueTrue():valueFalse());
        m.redraw();
      });
    }
  };
};

ui.configRadio = function(prop, value) {
  prop = u.prop(prop);
  value = u.prop(value);

  return function(element, isInit) {
    if (prop() === value()) element.classList.add('active');
    else element.classList.remove('active');

    if (!isInit) {
      element.addEventListener('click', function(e) {
        prop(value());
        m.redraw();
      });
    }
  };
};

ui.carousel = function(options) {

  function controller() {

  }

  function view(ctrl) {
    return {tag: "div", attrs: {}, children: ["12345"]};
  }

  return {
    controller: controller,
    view: view
  };
};

ui.collapse = function(options) {
  options = options||{};
  function controller() {
    var ctrl = this;
    ctrl.content = u.init(options.content);
    ctrl.open = u.prop(false);
    ctrl.disabled = u.prop(options.disabled || false);
    ctrl.animating = u.prop(false);

    ctrl.toggle = function() {
      if (ctrl.disabled()) return;

      ctrl.open(!ctrl.open());
      ctrl.animating(true);
    };

    ctrl.animation = function(element, isInit) {
      if (!isInit) element.addEventListener('transitionend',
        function() {
          ctrl.animating(false);
          if (ctrl.open()) element.style.height = 'auto';
          else element.classList.add('collapse');
          element.classList.remove('collapsing');
        });

      if (!ctrl.animating() && !ctrl.open()) element.classList.add('collapse');
      else element.classList.remove('collapse');

      if (ctrl.animating()) {
        element.classList.add('collapsing');

        var height;
        if (ctrl.open()) {
          element.style.height = 'auto';
          height = element.getBoundingClientRect().height;
          element.style.height = '0';
          setTimeout(function() {
            element.style.height = height + 'px';
          }, 0);

        } else {
          element.style.height = 'auto';
          height = element.getBoundingClientRect().height;
          element.style.height = height + 'px';
          setTimeout(function() {
            element.style.height = '0';
          }, 0);
        }
      }
    };
  }

  function view(ctrl) {
    return {tag: "div", attrs: {config:ctrl.animation}, children: [
	ctrl.content.$view()
]};
  }

  return {
    controller: controller,
    view: view
  };
};

var datepickerList = [];

document.addEventListener('click', function() {
	for (var i in datepickerList) {
		datepickerList[i].opening(false);
	}
	m.redraw();
});

ui.datepicker = function(options) {

	options = options || {};
	var type = options.type || 'inline';

	var msADay = 86400000;
	var monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function controller() {
  	var ctrl = this;
  	ctrl.date = u.prop(options.date || new Date());
		ctrl.month = m.prop(ctrl.date().getMonth());
		ctrl.year = m.prop(ctrl.date().getFullYear());

		ctrl.opening = (function(store) {
			return function() {
				if (window.event) window.event.stopPropagation();
				if (arguments.length) store = arguments[0];
				return store;
			};
		})(false);

		ctrl.setDate = function(newDate) {
			ctrl.date(new Date(newDate));
			ctrl.month(ctrl.date().getMonth());
			ctrl.year(ctrl.date().getFullYear());
		};

		datepickerList.push(ctrl);
		ctrl.onunload = function() {
      var index = datepickerList.indexOf(ctrl);
      if (index > -1) {
        datepickerList.splice(index, 1);
      }
    };
  }

  function getWeek(date) {
    var Jan_1st = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date-Jan_1st)/msADay) + Jan_1st.getDay()) / 7);
	}

	function normalize(date) {
		date = new Date(date);
		return new Date(date.getTime() - date.getTime() % msADay);
	}

	var header = [];
	header.push({tag: "th", attrs: {}});
	dayNames.forEach(function(d) {
		header.push({tag: "th", attrs: {class:"text-center"}, children: [{tag: "small", attrs: {}, children: [d]}]});
	});
	header = {tag: "tr", attrs: {}, children: [header]};

  function view(ctrl) {

		function changeMonth(delta) {
			return function(e) {
				var month = ctrl.month() + delta;
				ctrl.month((month+12) % 12);
				ctrl.year(ctrl.year() + Math.floor(month / 12));
			};
		}

		function toggle() {
			ctrl.opening(!ctrl.opening());
		}

		var date = normalize(ctrl.date());
		var month = ctrl.month();
		var year = ctrl.year();

		var today = normalize(new Date());
		var firstDay = new Date(year, month, 1);
		var startDate = new Date(firstDay.getTime() - firstDay.getDay()*msADay);

		var rows = [header];
		var title = monthNames[month] + ' ' + year;

		var d = normalize(startDate);
		for (var r = 0; r < 6; r++) {
			var cols = [
				{tag: "td", attrs: {class:"text-center h6"}, children: [
					{tag: "em", attrs: {}, children: [getWeek(d)]}
				]}
			];

			for (var i = 0; i < 7; i++) {
				var disabled = d < today;
				var active = d.getTime()===date.getTime();

				cols.push(
					{tag: "td", attrs: {}, children: [
						{tag: "button", attrs: {type:"button", style:"width:100%;", 
							class:"btn btn-default btn-sm" + (active?' btn-info active': ''), 
							disabled:disabled?'disabled':'', 
							onclick:u.bind(ctrl.setDate, ctrl, d)}, children: [
							{tag: "span", attrs: {class:d.getMonth() !== month? 'text-muted': ''}, children: [
								d.getDate()]}
						]}
					]}
				);

				d = new Date(d.getTime() + msADay);
			}
			rows.push({tag: "tr", attrs: {}, children: [cols]});
		}

		var picker = {tag: "table", attrs: {tabindex:"0"}, children: [
  {tag: "thead", attrs: {}, children: [
    {tag: "tr", attrs: {}, children: [
      {tag: "th", attrs: {}, children: [
        {tag: "button", attrs: {type:"button", class:"btn btn-default btn-sm pull-left", onclick:changeMonth(-1), tabindex:"-1"}, children: [
          {tag: "i", attrs: {class:"glyphicon glyphicon-chevron-left"}}]}
      ]}, 
      {tag: "th", attrs: {colspan:"6"}, children: [
        {tag: "button", attrs: {type:"button", class:"btn btn-default btn-sm", tabindex:"-1", style:"width:100%;"}, children: [
          {tag: "strong", attrs: {class:"ng-binding"}, children: [title]}]}
        ]}, 
      {tag: "th", attrs: {}, children: [
        {tag: "button", attrs: {type:"button", class:"btn btn-default btn-sm pull-right", onclick:changeMonth(1), tabindex:"-1"}, children: [
          {tag: "i", attrs: {class:"glyphicon glyphicon-chevron-right"}}]}
      ]}
    ]}, 
    {tag: "tr", attrs: {}, children: [
      {tag: "th", attrs: {"ng-show":"showWeeks", class:"text-center"}}
    ]}
  ]}, 
  {tag: "tbody", attrs: {}, children: [
    rows
  ]}
]};

		return type === 'inline'?
			{tag: "div", attrs: {class:"well well-sm"}, children: [
				picker
			]}:
			ctrl.opening()?
				{tag: "ul", attrs: {class:"dropdown-menu", style:{display:'block', left:0}}, children: [
					{tag: "li", attrs: {}, children: [picker]}
				]}:
				[];
  }

  return {
    controller: controller,
    view: view
  };
};

var dropdownList = [];

function dropdownSetOpen(element, opening) {
  if (opening()) {
    dropdownCloseAll();

    element.classList.add('open');
    dropdownList.push({
      element: element,
      opening: opening
    });

  } else {
    for (var i=0; i < dropdownList.length; i++) {
      if (dropdownList[i].element === element) {
        dropdownList[i].opening(false);
        dropdownList[i].element.classList.remove('open');
        dropdownList.splice(i, 1);
      }
    }
  }
}

function dropdownCloseAll(element) {
  for (var i in dropdownList) {
    if (dropdownList[i].element === element) continue;
    dropdownList[i].opening(false);
    dropdownList[i].element.classList.remove('open');
  }
  dropdownList = [];
}

document.addEventListener('click',function() {
  dropdownCloseAll();
});

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 27 ) dropdownCloseAll();
});

m.ui.configDropdown = function(opening) {
  return function(element, isInit) {
    if (!isInit) {
      var toggle = element.querySelector('.dropdown-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var opening = u.prop(opening || element.classList.contains('open'));
        opening(!opening());

        dropdownSetOpen(element, opening);
      });
    }

    dropdownSetOpen(element, u.prop(opening || element.classList.contains('open')));
  };
};

var modalZIndex = 1040;

ui.modal = function(options) {

	options = options || {};
	var size = u.exec(options.size) || '';

	function controller() {
		var ctrl = this;
		ctrl.com = u.init(options.module, {$modal: ctrl}, options.params);

		ctrl.opening = u.prop(options.hidden||false);

		modalZIndex += 10;
		ctrl.zIndex = m.prop(modalZIndex);

		var deferred = m.deferred();
		ctrl.result = deferred.promise;

		ctrl.open = function() {
			ctrl.opening(true);
			document.body.classList.add('modal-open');
			if (ctrl.com.onopen) ctrl.com.onopen(ctrl);
			if (options.onopen) options.onopen(ctrl);
			m.redraw();
		};

		ctrl.close = function(result) {
			ctrl.opening(false);
			document.body.classList.remove('modal-open');
			if (ctrl.com.onclose) ctrl.com.onclose(result);
			if (options.onclose) options.onclose(result);
			deferred.resolve(result);
			m.redraw();
		};

		ctrl.dismiss = function(reason) {
			ctrl.opening(false);
			document.body.classList.remove('modal-open');
			if (ctrl.com.onclose) ctrl.com.onclose(undefined, reason);
			if (options.onclose) options.onclose(undefined, reason);
			deferred.reject(reason);
			m.redraw();
		};

		setTimeout(ctrl.open, 0);
	}

	function view(ctrl) {
		// return <div>M</div>;
		return ctrl.opening()? [
{tag: "div", attrs: {class:"modal-backdrop fade in", style:{zIndex: ctrl.zIndex()}}},

{tag: "div", attrs: {class:"modal", style:{zIndex: ctrl.zIndex()+1, display: 'block'}}, children: [
  {tag: "div", attrs: {class:'modal-dialog' + (size? ' modal-' + size: '')}, children: [
    {tag: "div", attrs: {class:"modal-content"}, children: [
      {tag: "div", attrs: {class:"modal-body"}, children: [
        {tag: "div", attrs: {class:"modal-body-content"}, children: [
          ctrl.com.$view()
        ]}
      ]}
    ]}
  ]}
]}
]: [];
		// return INCLUDE('./modal.tpl');
	}

	return {
		controller: controller,
		view: view
	};
};


ui.pagination = function(config) {

  config = config || {};

  function num(n, def) {
    if (typeof n !== 'number' || n < 0) n = def;
    return Math.ceil(n);
  }

  function controller() {
    this.currentPage = u.prop(config.currentPage || 0);
    this.totalItems = u.prop(config.totalItems || 0);
    this.itemsPerPage = u.prop(config.itemsPerPage || 10);
    this.maxSize = u.prop(config.maxSize || 5);

    this.directionLinks = u.prop(def(config.directionLinks, true));
    this.boundaryLinks = u.prop(def(config.boundaryLinks, false));

    this.previousText = u.prop(config.previousText || 'Previous');
    this.nextText = u.prop(config.nextText || 'Next');
    this.firstText = u.prop(config.firstText || 'First');
    this.lastText = u.prop(config.lastText || 'Last');

    this.numPages = function() {
      var itemsPerPage = num(this.itemsPerPage(), 10) || 10;
      return num(this.totalItems() / itemsPerPage, 0);
    };

    this.setPage = function(i) {
      if (i < 0) i = 0;
      if (i >= this.numPages()) i = this.numPages() - 1;
      this.currentPage(i);
    };
  }

  // Zero-based
  function view(ctrl) {
    var cells = [];
    var N = ctrl.numPages();
    var page = min(num(ctrl.currentPage(), 0), N-1);
    var maxSize = num(ctrl.maxSize(), 1000);
    var last = max(N-1, 0);
    var low = page - Math.floor(maxSize/2);
    var high = page + Math.ceil(maxSize/2);
    if (low < 0) { low = 0; high = min(low+maxSize, N); }
    else if (high > N) { high = N; low = max(high-maxSize, 0); }

    for (var i=low; i < high; i++) {
      cells.push(
        {tag: "li", attrs: {class:i===page? 'active':''}, children: [
          {tag: "a", attrs: {href:"#", onclick:u.mute(u.bind(ctrl.setPage, ctrl, i))}, children: [i+1]}
        ]}
      );
    }
    return {tag: "ul", attrs: {class:"pagination"}, children: [
  
    !ctrl.boundaryLinks()? null :
    {tag: "li", attrs: {class:page===0? 'disabled':''}, children: [
      {tag: "a", attrs: {href:"#", onclick:u.mute(u.bind(ctrl.setPage, ctrl, 0))}, children: [
        ctrl.firstText()
      ]}
    ]}, 
  
  
    !ctrl.directionLinks()? null :
    {tag: "li", attrs: {class:page===0? 'disabled':''}, children: [
      {tag: "a", attrs: {href:"#", onclick:u.mute(u.bind(ctrl.setPage, ctrl, page-1))}, children: [
        ctrl.previousText()
      ]}
    ]}, 
  
  cells, 
  
    !ctrl.directionLinks()? null :
    {tag: "li", attrs: {class:page===last? 'disabled':''}, children: [
      {tag: "a", attrs: {href:"#", onclick:u.mute(u.bind(ctrl.setPage, ctrl, page+1))}, children: [
        ctrl.nextText()
      ]}
    ]}, 
  
  
    !ctrl.boundaryLinks()? null :
    {tag: "li", attrs: {class:page===last? 'disabled':''}, children: [
      {tag: "a", attrs: {href:"#", onclick:u.mute(u.bind(ctrl.setPage, ctrl, last))}, children: [
        ctrl.lastText()
      ]}
    ]}
  
]};
  }

  return {
    controller: controller,
    view: view
  };
};

ui.rating = function(options) {

  options = options||{};

  function controller() {
    var ctrl = this;
    ctrl.iconOff = u.prop(options.iconOff||{tag: "span", attrs: {class:"glyphicon glyphicon-ok-circle"}});
    ctrl.iconOn = u.prop(options.iconOn||{tag: "span", attrs: {class:"glyphicon glyphicon-ok-sign"}});
    ctrl.max = u.prop(options.max||5);
    ctrl.rating = u.prop(options.rating||0);
    ctrl.hovering = u.prop(options.rating||undefined);
    ctrl.hover = u.prop(options.hover||false);
    ctrl.readOnly = u.prop(options.readOnly||false);

    ctrl.list = u.prop([]);
    for (var i = 0; i < ctrl.max(); i++) {
      var element = {};
      element.index = i;
      if (i < ctrl.rating()) {
        element.icon = ctrl.iconOn();
      } else {
        element.icon = ctrl.iconOff();
      }

      ctrl.list().push(element);
    }

    ctrl.setHovering = function(index) {
      ctrl.hovering(index + 1);
      ctrl.list = u.prop([]);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.hovering()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }
    };

    ctrl.setNotHovering = function() {
      ctrl.hovering(undefined);
      ctrl.list = u.prop([]);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.rating()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }
    };

    ctrl.setRating = function(index) {
      ctrl.rating(index + 1);
      ctrl.list = u.prop([]);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.rating()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }
      m.redraw();
    };

    ctrl.clear = function() {
      ctrl.list = u.prop([]);
      ctrl.rating(0);
      for (var i = 0; i < ctrl.max(); i++) {
        var element = {};
        element.index = i;
        if (i < ctrl.rating()) {
          element.icon = ctrl.iconOn();
        } else {
          element.icon = ctrl.iconOff();
        }

        ctrl.list().push(element);
      }

      m.redraw();
    };

  }

  function view(ctrl) {

    var rows = [];
    for (var i in ctrl.list()) {
      var attrs = {};

      if (!ctrl.readOnly()) {

        if (ctrl.hover()) {
          attrs.onmouseover= u.mute(u.bind(ctrl.setHovering, ctrl, ctrl.list()[i].index));
          attrs.onmouseout= u.mute(u.bind(ctrl.setNotHovering, ctrl, ctrl.list()[i].index));
        }

        attrs.onclick = u.mute(u.bind(ctrl.setRating, ctrl, ctrl.list()[i].index));
      }

      rows.push(
        m('span', attrs, [ctrl.list()[i].icon])
      );

    }
    return {tag: "div", attrs: {}, children: [rows]};
  }

  return {
    controller: controller,
    view: view
  };
};

ui.tabs = function tabs(configs) {

  function controller() {
    this.index = m.prop(0);

    this.coms = [];
    for (var i=0; i < configs.length; i++) {
      this.coms.push(u.init(configs[i].module));
    }

    this.current = function() {
      return this.coms[this.index()];
    };
  }

  function view(ctrl) {
    var coms = ctrl.coms, tabs = [], panes = [], i;
    for (i=0; i < coms.length; i++) {
      tabs.push(
        {tag: "li", attrs: {class:isActive(i)}, children: [
          {tag: "a", attrs: {href:"#", onclick:u.silence(ctrl.index.bind(ctrl,i))}, children: [configs[i].label]}
        ]}
      );
    }
    for (i=0; i < coms.length; i++) {
      panes.push(
        {tag: "div", attrs: {class:'tab-pane ' + isActive(i)}, children: [
          coms[i].$view()
        ]}
      );
    }

    function isActive(i) {
      return ctrl.index() === i? 'active' : '';
    }
    return {tag: "div", attrs: {}, children: [
  {tag: "ul", attrs: {class:"nav nav-tabs"}, children: [
    tabs
  ]}, 
  {tag: "div", attrs: {class:"tab-content"}, children: [
    panes
  ]}
]};
  }

  return {
    controller: controller,
    view: view
  };
};

ui.timepicker = function() {

  function controller() {

  }

  function view(ctrl) {
    return {tag: "div", attrs: {}, children: ["TODO"]};
  }

  return {
    controller: controller,
    view: view
  };
};

var typeaheadList = [];

document.addEventListener('click',function(event) {
  for (var i in typeaheadList)  {
    typeaheadList[i].xlist = u.prop([]);
    typeaheadList[i].highlight = m.prop(0);
  }
  m.redraw();
});


document.addEventListener('keydown', function(event) {
  if (event.keyCode === 27 ) {
    for (var i in typeaheadList) {
      typeaheadList[i].xlist = u.prop([]);
      typeaheadList[i].highlight = m.prop(0);
    }
    m.redraw();
  }
});

ui.typeahead = function(options) {
  var eventKeys = {
    down: 40,
    left: 37,
    right: 39,
    up: 38,
    enter: 13
  };

  options = options || {};

  function isEmpty(a) {
    return a === undefined || a === null;
  }

  function controller() {
    var ctrl = this;
    typeaheadList.push(this);
    this.list = u.prop(options.list || []);
    this.xlist = u.prop([]);
    this.selected = m.prop(undefined);
    this.highlight = m.prop(0);
    this.text = m.prop("");
    this.maxItems = u.prop(options.maxItems || 5);

    this.label = function(item) {
      if (isEmpty(item)) return '';
      return options.label? options.label(item) : item;
    };

    this.template = options.template || this.label;

    this.change = function(text) {
      ctrl.select(undefined);
      ctrl.text(text);
      ctrl.highlight(0);
      if (text === "") return ctrl.xlist([]);

      text = text.toLowerCase();
      var i, max = ctrl.maxItems();
      var list = ctrl.list(), xlist = [];
      for (i=0; i < list.length; i++) {
        if (ctrl.label(list[i]).toLowerCase().indexOf(text) === 0) {
          xlist.push(list[i]);
          if (xlist.length >= max) return ctrl.xlist(xlist);
        }
      }
      for (i=0; i < list.length; i++) {
        if (ctrl.label(list[i]).toLowerCase().indexOf(text) > 0) {
          xlist.push(list[i]);
          if (xlist.length >= max) return ctrl.xlist(xlist);
        }
      }
      ctrl.xlist(xlist);
    };

    this.select = function(index) {
      if (index !== undefined) {
        if (index >= ctrl.list().length) index = ctrl.list().length-1;
        if (index < 0) index = 0;
        index = ctrl.list().indexOf(ctrl.xlist()[index]);
      }
      ctrl.xlist([]);
      ctrl.selected(index);
      ctrl.text(ctrl.label(ctrl.currentItem()));
      if (options.onselect) options.onselect(ctrl.currentItem());
    };

    this.currentItem = function() {
      var s = ctrl.selected();
      if (isEmpty(s)) return;
      return ctrl.list()[s];
    };

    this.onunload = function() {
      var index = typeaheadList.indexOf(this);
      if (index > -1) {
        dropdownList.splice(index, 1)
      }
    };
  }

  function view(ctrl){
    var xlist = ctrl.xlist();
    var rows = xlist.map(function(item, i) {
      return {tag: "li", attrs: {class:i===ctrl.highlight()? 'active':''}, children: [
        {tag: "a", attrs: {href:"#", onclick:u.mute(u.bind(ctrl.select, ctrl, i))}, children: [
          ctrl.template(xlist[i])]}
        ]};
    });

    var dropdown = xlist.length === 0? [] :
      {tag: "ul", attrs: {class:"dropdown-menu", style:"display: block; top: 100%"}, children: [
        rows
      ]};

    function onkeydown(e) {
      var code = e.keyCode;
      if (code === eventKeys.down) {
        e.preventDefault();
        ctrl.highlight(ctrl.highlight()+1);
        if (ctrl.highlight() >= ctrl.xlist().length) ctrl.highlight(0);
      } else if (code === eventKeys.up) {
        e.preventDefault();
        ctrl.highlight(ctrl.highlight()-1);
        if (ctrl.highlight() < 0) ctrl.highlight(ctrl.xlist().length-1);
      } else if (code === eventKeys.enter) {
        e.preventDefault();
        ctrl.select(ctrl.highlight());
      }
    }

    return {tag: "div", attrs: {style:{position: 'relative'}}, children: [
    {tag: "input", attrs: {type:"text", class:"form-control", oninput:m.withAttr("value", ctrl.change), 
    value:ctrl.text(), onkeydown:onkeydown}}, 
    dropdown
]};
  }

  return {
    controller: controller,
    view: view,
  };
};

})(Mithril);
