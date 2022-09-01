(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function selectLast(node, selector) {
    var nodes = node.querySelectorAll(selector);
    var length = nodes.length;
    return length ? nodes[length - 1] : null;
  } // NB: only supports vertical scrolling

  function scrollIfNecessary(node) {
    var parentDimensions = node.parentElement.getBoundingClientRect();
    var nodeDimensions = node.getBoundingClientRect();
    var parentTop = parentDimensions.top;
    var nodeTop = nodeDimensions.top;

    if (nodeTop + nodeDimensions.height > parentDimensions.top + parentDimensions.height) {
      // NB: uses boolean parameter because IE11 doesn't support object parameter
      node.scrollIntoView(false);
    } else if (nodeTop < parentTop) {
      // NB: uses boolean parameter because IE11 doesn't support object parameter
      node.scrollIntoView(true);
    }
  }

  /* eslint-env browser */
  // generates custom events
  // `emitter` is a DOM node
  // `options` is passed through to `CustomEvent` (cf.
  // https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#Values)
  function dispatchEvent(emitter, name, payload) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (payload) {
      options.detail = payload;
    }

    var ev = new CustomEvent(name, options);
    emitter.dispatchEvent(ev);
  } // generate a native DOM event (e.g. simulating a click interaction)

  // NB: not necessary when using ES6 spread syntax: `[...nodes].map(…)`
  function find(node, selector) {
    if (node.substr) {
      // for convenience
      var _ref = [node, selector];
      selector = _ref[0];
      node = _ref[1];
    }

    var nodes = node.querySelectorAll(selector);
    return toArray(nodes);
  }
  var slice = Array.prototype.slice;
  var toArray = function toArray(items) {
    return slice.call(items);
  };

  var CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  function nid() {
    var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9007199254740991;
    // ≙ `Number.MAX_SAFE_INTEGER`
    var i = Math.random() * max;
    return base62encode(Math.round(i));
  } // adapted from Base62.js

  function base62encode(_int) {
    var i = _int;
    var res = "";

    while (i > 0) {
      res = CHARSET[i % 62] + res;
      i = Math.floor(i / 62);
    }

    return _int === 0 ? CHARSET[0] : res;
  }

  // binds the specified `methods`, as identified by their names, to the given `ctx` object
  function bindMethodContext(ctx) {
    for (var _len = arguments.length, methods = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      methods[_key - 1] = arguments[_key];
    }

    methods.forEach(function (name) {
      ctx[name] = ctx[name].bind(ctx);
    });
  }

  var TAG$1 = "simplete-suggestions";
  var DEFAULTS$1 = {
    rootSelector: "simplete-form",
    itemSelector: "li",
    fieldSelector: "input[type=hidden]",
    resultSelector: "a"
  };
  var FOCUSSABLE_ELEMENTS = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1']";

  var SimpleteSuggestions = /*#__PURE__*/function (_HTMLElement) {
    _inherits(SimpleteSuggestions, _HTMLElement);

    var _super = _createSuper(SimpleteSuggestions);

    // NB: `self` only required due to document-register-element polyfill
    function SimpleteSuggestions(self) {
      var _this;

      _classCallCheck(this, SimpleteSuggestions);

      self = _this = _super.call(this, self);
      bindMethodContext(self, "onQuery", "onResults", "onCycle", "onConfirm", "onAbort");
      return _possibleConstructorReturn(_this, self);
    }

    _createClass(SimpleteSuggestions, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.setAttribute("role", "listbox");
        this.addEventListener("click", this.onSelect);
        this.nonLocalHandlers("+");
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.nonLocalHandlers("-");
      }
    }, {
      key: "onQuery",
      value: function onQuery(ev) {
        var detail = ev.detail;

        if (detail && detail.reset) {
          this.render("");
        } else {
          this.render(null, true);
        }
      }
    }, {
      key: "onResults",
      value: function onResults(ev) {
        var _this2 = this;

        // TODO: rename
        this.render(ev.detail.html); // determine and cache selectors

        var attribs = {
          itemSelector: "data-item-selector",
          fieldSelector: "data-field-selector",
          resultSelector: "data-result-selector"
        };
        Object.keys(attribs).forEach(function (prop) {
          var attr = attribs[prop]; // NB: parent node is used to work around `querySelector` limitation
          //     WRT immediate child elements -- XXX: not actually necessary?

          var container = _this2.parentNode.querySelector("".concat(TAG$1, " > [").concat(attr, "]"));

          var selector = container && container.getAttribute(attr);
          _this2[prop] = selector || DEFAULTS$1[prop];
        }); // add aria roles and remove focussable elements

        find(this, FOCUSSABLE_ELEMENTS).forEach(function (el) {
          return el.setAttribute("tabindex", "-1");
        });
        var items = find(this, this.itemSelector);
        items.forEach(function (el) {
          el.setAttribute("role", "option");
          el.id = el.id || "simplete-suggestion" + nid();
          el.setAttribute("aria-selected", "false");
        });

        if (this.getAttribute("status-field-selector")) {
          var statusField = this.root.querySelector(this.getAttribute("status-field-selector"));
          statusField.textContent = items.length;
        }
      }
    }, {
      key: "onCycle",
      value: function onCycle(ev) {
        var next = ev.detail.direction === "next";
        var selector = this.itemSelector;
        var currentItem = this.querySelector("".concat(selector, "[aria-selected=true]"));

        if (!currentItem) {
          // select edge item, if any
          currentItem = next ? // eslint-disable-next-line indent
          this.querySelector(selector) : selectLast(this, selector);
        } else {
          // select adjacent item or wrap around
          currentItem.removeAttribute("aria-selected");
          this.searchField.removeAttribute("aria-activedescendant");
          var items = find(this, selector);
          var index = items.indexOf(currentItem);

          if (next) {
            currentItem = items[index + 1] || items[0];
          } else {
            currentItem = index > 0 ? items[index - 1] : items[items.length - 1];
          }
        }

        if (currentItem) {
          currentItem.setAttribute("aria-selected", "true");
          this.searchField.setAttribute("aria-activedescendant", currentItem.id);
          this.selectItem(currentItem, true);
          scrollIfNecessary(currentItem);
        }
      }
    }, {
      key: "onConfirm",
      value: function onConfirm(ev) {
        var item = this.querySelector("".concat(this.itemSelector, "[aria-selected]"));
        var target = item.querySelector(this.fieldSelector) || item.querySelector(this.resultSelector);

        if (target) {
          target.click(); // XXX: hacky?
        }
      }
    }, {
      key: "onAbort",
      value: function onAbort(ev) {
        this.render("");
      }
    }, {
      key: "onSelect",
      value: function onSelect(ev) {
        var item = ev.target.closest(this.itemSelector);

        if (!item) {
          // not a result
          return;
        }

        var field = this.selectItem(item);

        if (field) {
          ev.preventDefault();
        } else {
          ev.target.click(); // XXX: hacky?
        }
      }
    }, {
      key: "selectItem",
      value: function selectItem(node, preview) {
        if (!preview) {
          node = node.cloneNode(true); // prevents IE 11 from discarding child elements

          this.render("");
        }

        var payload = {
          preview: preview
        };
        var field = node.querySelector(this.fieldSelector);

        if (field) {
          var name = field.name,
              value = field.value;
          Object.assign(payload, {
            name: name,
            value: value
          });
        } else if (node && node.textContent) {
          Object.assign(payload, {
            value: node.textContent.trim()
          });
        }

        dispatchEvent(this.root, "simplete-suggestion-selection", payload);
        return !!field;
      }
    }, {
      key: "render",
      value: function render(suggestions, pending) {
        if (pending) {
          this.setAttribute("aria-busy", "true");
        } else {
          this.removeAttribute("aria-busy");
        }

        if (suggestions || suggestions === "") {
          this.innerHTML = suggestions;
          this.searchField.setAttribute("aria-expanded", this.innerHTML.trim() !== "");
        } // NB: intentionally not erasing suggestions otherwise to avoid flickering

      }
    }, {
      key: "nonLocalHandlers",
      value: function nonLocalHandlers(op) {
        op = {
          "+": "addEventListener",
          "-": "removeEventListener"
        }[op];
        var root = this.root;
        root[op]("simplete-query", this.onQuery);
        root[op]("simplete-response", this.onResults);
        root[op]("simplete-nav", this.onCycle);
        root[op]("simplete-confirm", this.onConfirm);
        root[op]("simplete-abort", this.onAbort);
      }
    }, {
      key: "root",
      get: function get() {
        var selector = this.getAttribute("root-selector") || DEFAULTS$1.rootSelector;
        return this.closest(selector);
      }
    }, {
      key: "searchField",
      get: function get() {
        return document.querySelector("[aria-owns=\"".concat(this.id, "\"]"));
      }
    }]);

    return SimpleteSuggestions;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  /* eslint-env browser */
  // required due to insufficient browser support for `FormData`
  // NB: only supports a subset of form fields, notably excluding buttons and file inputs

  function serializeForm(form) {
    var selector = ["input", "textarea", "select"].map(function (tag) {
      return "".concat(tag, "[name]:not(:disabled)");
    }).join(", ");
    var radios = {};
    return find(form, selector).reduce(function (params, node) {
      var name = node.name;
      var value;

      switch (node.nodeName.toLowerCase()) {
        case "textarea":
          value = node.value;
          break;

        case "select":
          value = node.multiple ? find(node, "option:checked").map(function (opt) {
            return opt.value;
          }) : node.value;
          break;

        case "input":
          switch (node.type) {
            case "file":
              console.warn("ignoring unsupported file-input field");
              break;

            case "checkbox":
              if (node.checked) {
                value = node.value;
              }

              break;

            case "radio":
              if (!radios[name]) {
                var field = form.querySelector("input[type=radio][name=".concat(name, "]:checked"));
                value = field ? field.value : undefined;

                if (value) {
                  radios[name] = true;
                }
              }

              break;

            default:
              value = node.value;
              break;
          }

          break;
      }

      if (value !== undefined) {
        var values = value || [""];

        if (!values.pop) {
          values = [values];
        }

        values.forEach(function (value) {
          var param = [name, value].map(encodeURIComponent).join("=");
          params.push(param);
        });
      }

      return params;
    }, []).join("&");
  }

  // limits the rate of `fn` invocations
  // `delay` is the rate limit in milliseconds
  // `ctx` (optional) is the function's execution context (i.e. `this`)
  // `fn` is the respective function
  // adapted from StuffJS <https://github.com/bengillies/stuff-js>
  function debounce(delay, ctx, fn) {
    if (fn === undefined) {
      // shift arguments
      fn = ctx;
      ctx = null;
    }

    var timer;
    return function () {
      var args = arguments;

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      timer = setTimeout(function (_) {
        fn.apply(ctx, args);
        timer = null;
      }, delay);
    };
  }

  var TAG = "simplete-form";
  var DEFAULTS = {
    "search-field-selector": "input[type=search]",
    "query-delay": 200,
    // milliseconds
    "min-length": 1
  };
  var RESET = {}; // poor man's `Symbol`

  var SimpleteForm = /*#__PURE__*/function (_HTMLElement) {
    _inherits(SimpleteForm, _HTMLElement);

    var _super = _createSuper(SimpleteForm);

    // NB: `self` only required due to document-register-element polyfill
    function SimpleteForm(self) {
      var _this;

      _classCallCheck(this, SimpleteForm);

      self = _this = _super.call(this, self);
      bindMethodContext(self, "onInput", "onResponse");
      return _possibleConstructorReturn(_this, self);
    }

    _createClass(SimpleteForm, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        if (!this.querySelector(TAG$1)) {
          // guard against repeat initialization
          var results = document.createElement(TAG$1);
          this.appendChild(results);
        }

        var field = this.searchField;
        field.setAttribute("autocomplete", "off");
        this.addAriaRoles();
        var onQuery = debounce(this.queryDelay, this, this.onQuery);
        this.addEventListener("input", onQuery);
        this.addEventListener("change", onQuery);
        this.addEventListener("simplete-suggestion-selection", this.onSelect);
        field.addEventListener("keydown", this.onInput);
      }
    }, {
      key: "addAriaRoles",
      value: function addAriaRoles() {
        this.searchField.setAttribute("role", "combobox");
        this.searchField.setAttribute("aria-autocomplete", "list");
        this.searchField.setAttribute("aria-expanded", "false");
        this.suggestions.id = this.suggestions.id || "simplete-suggestions-" + nid();
        this.searchField.setAttribute("aria-owns", this.suggestions.id);
      }
    }, {
      key: "onQuery",
      value: function onQuery(ev) {
        var _this2 = this;

        this.query = this.searchField.value;
        var res = this.submit();

        if (res === RESET) {
          dispatchEvent(this, "simplete-query", {
            reset: true
          });
        } else if (res) {
          this.setAttribute("aria-busy", "true");
          res.then(this.onResponse)["catch"](function (err) {
            return void _this2.onResponse(null);
          });
          dispatchEvent(this, "simplete-query");
        }

        ev.stopPropagation();
      }
    }, {
      key: "onResponse",
      value: function onResponse(html) {
        this.removeAttribute("aria-busy");
        dispatchEvent(this, "simplete-response", {
          html: html
        }); // TODO: rename event and payload?
      }
    }, {
      key: "onInput",
      value: function onInput(ev) {
        // ignore potential keyboard shortcuts
        if (ev.ctrlKey || ev.altKey || ev.metaKey) {
          return;
        }

        switch (ev.code || ev.key || ev.keyCode) {
          case "Up":
          case "ArrowUp":
          case "Numpad8":
          case 38:
            // arrow up
            dispatchEvent(this, "simplete-nav", {
              direction: "prev"
            });
            break;

          case "Down":
          case "ArrowDown":
          case "Numpad2":
          case 40:
            // arrow down
            dispatchEvent(this, "simplete-nav", {
              direction: "next"
            });
            break;

          case "Enter":
          case 13:
            // Enter
            // suppress form submission (only) while navigating results -
            // otherwise let the browser's default behavior kick in
            if (this.navigating) {
              delete this.navigating;
              dispatchEvent(this, "simplete-confirm"); // TODO: rename?

              ev.preventDefault();
            }

            break;

          case "Esc":
          case "Escape":
          case 27:
            // Escape
            if (this.query) {
              // restore original (pre-preview) input
              this.searchField.value = this.query;
              delete this.navigating;
              dispatchEvent(this, "simplete-abort"); // TODO: rename?

              ev.preventDefault();
            }

            break;
        }
      }
    }, {
      key: "onSelect",
      value: function onSelect(ev) {
        var _ev$detail = ev.detail,
            value = _ev$detail.value,
            preview = _ev$detail.preview;

        if (preview) {
          this.navigating = true;
        }

        if (value) {
          this.searchField.value = value;
          this.payload = this.serialize();
        } // notify external observers


        if (value && !preview) {
          dispatchEvent(this, "simplete-selection", {
            value: value
          }, {
            bubbles: true
          });
        }
      }
    }, {
      key: "submit",
      value: function submit() {
        // guard against blank search terms
        // NB: if someone wanted to provide generic recommendations instead of
        //     aborting, they could override `#blank`
        if (this.blank) {
          delete this.payload;
          return RESET;
        } // ignore unless input matches threshold


        if (this.query.length < this.minLength) {
          return;
        } // guard against redundant requests


        var payload = this.serialize();

        if (payload === this.payload) {
          return;
        }

        this.payload = payload;
        var _this$formParams = this.formParams,
            uri = _this$formParams.uri,
            method = _this$formParams.method;
        var headers = {
          Accept: "text/html; fragment=true"
        }; // TODO: strip existing query string from URI, if any? should be invalid

        if (method === "GET") {
          return this.httpRequest(method, "".concat(uri, "?").concat(payload), headers);
        } else {
          headers["Content-Type"] = "application/x-www-form-urlencoded";
          return this.httpRequest(method, uri, headers, payload);
        }
      }
    }, {
      key: "serialize",
      value: function serialize() {
        // generate temporary form
        var form = document.createElement("form");
        [].forEach.call(this.children, function (node) {
          var clone = node.cloneNode(true);
          form.appendChild(clone);
        }); // exclude suggestions (which might also contain fields)

        var sug = form.querySelector("simplete-suggestions");
        sug.parentNode.removeChild(sug);
        return serializeForm(form);
      }
    }, {
      key: "httpRequest",
      value: function httpRequest(method, uri, headers, body) {
        var options = {
          method: method,
          credentials: this.cors ? "include" : "same-origin"
        };

        if (headers) {
          options.headers = headers;
        }

        if (body) {
          options.body = body;
        }

        return fetch(uri, options).then(function (res) {
          if (!res.ok) {
            throw new Error("unexpected response: ".concat(res.status));
          }

          return res.text();
        });
      }
    }, {
      key: "_parseInt",
      value: function _parseInt(attr) {
        var value = this.getAttribute(attr);
        return value ? parseInt(value, 10) : DEFAULTS[attr];
      }
    }, {
      key: "blank",
      get: function get() {
        return !this.searchField.value.trim();
      }
    }, {
      key: "searchField",
      get: function get() {
        // TODO: memoize, resetting cached value on blur?
        var attr = "search-field-selector";
        var selector = this.getAttribute(attr);
        return this.querySelector(selector || DEFAULTS[attr]);
      }
    }, {
      key: "formParams",
      get: function get() {
        var form;
        var uri = this.getAttribute("action");

        if (!uri) {
          form = this.form;
          uri = form.getAttribute("action");
        }

        var method = this.getAttribute("method");

        if (!method) {
          if (!form) {
            form = this.form;
          }

          method = form.method || "GET";
        }

        return {
          uri: uri,
          method: method.toUpperCase()
        };
      }
    }, {
      key: "form",
      get: function get() {
        return this.closest("form");
      }
    }, {
      key: "queryDelay",
      get: function get() {
        return this._parseInt("query-delay");
      }
    }, {
      key: "minLength",
      get: function get() {
        return this._parseInt("min-length");
      }
    }, {
      key: "cors",
      get: function get() {
        return this.hasAttribute("cors");
      }
    }, {
      key: "suggestions",
      get: function get() {
        return this.querySelector(TAG$1);
      }
    }]);

    return SimpleteForm;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  /* eslint-env browser */
  customElements.define(TAG, SimpleteForm);
  customElements.define(TAG$1, SimpleteSuggestions);

  function html2dom(html) {
    let parser = new DOMParser();
    return parser.parseFromString(html, "text/html").body;
  }

  class CustomSimplete extends SimpleteForm {
    connectedCallback() {
      super.connectedCallback();

      let indexLink = document.getElementById("index-link");
      fetch(indexLink.href)
        .then(response => response.text())
        .then(html => {
          this.possibilities = [];
          let results = [].slice.call(html2dom(html).querySelectorAll("li"));

          results.forEach(result => {
            let words = result.textContent.trim().replaceAll("\"", "").toLowerCase().split(" ");
            words.forEach(word => {
              if (!this.possibilities.includes(word)) {
                this.possibilities.push(word);
              }
            });
          });
        });
    }

    // NB: partially duplicates `SimpleteForm#onQuery()` and `SimpleteForm#submit()`
    onQuery(ev) {
      this.query = this.searchField.value;

      // guard against blank search terms
      // NB: if someone wanted to provide generic recommendations instead of
      //     aborting, they could override `#blank`
      if (this.blank) {
        delete this.payload;
        dispatchEvent(this, "simplete-query", { reset: true });
        return;
      }
      // ignore unless input matches threshold
      if (this.query.length < this.minLength) {
        return;
      }

      let results = this.possibilities.filter(p => p.includes(this.query.toLowerCase()));
      let htmlResult = results.length > 0 ?  `<ul aria-label="${results.length} Search Suggestions">` + results.map(r => `<li>
        <a href="./results.html?q=${r}">${r.split(this.query).join(`<mark>${this.query}</mark>`)}</a>
      </li>`).join("") + "</ul>" : "";

      dispatchEvent(this, "simplete-response", {
        html: htmlResult
      });

      ev.stopPropagation();
    }
  }

  customElements.define("custom-simplete", CustomSimplete);
})();
