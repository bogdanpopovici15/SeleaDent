/*!
 * typeahead.js 0.10.2
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

! function (a) {
    var b = {
        isMsie: function () {
            return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : !1
        },
        isBlankString: function (a) {
            return !a || /^\s*$/.test(a)
        },
        escapeRegExChars: function (a) {
            return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        },
        isString: function (a) {
            return "string" == typeof a
        },
        isNumber: function (a) {
            return "number" == typeof a
        },
        isArray: a.isArray,
        isFunction: a.isFunction,
        isObject: a.isPlainObject,
        isUndefined: function (a) {
            return "undefined" == typeof a
        },
        bind: a.proxy,
        each: function (b, c) {
            function d(a, b) {
                return c(b, a)
            }
            a.each(b, d)
        },
        map: a.map,
        filter: a.grep,
        every: function (b, c) {
            var d = !0;
            return b ? (a.each(b, function (a, e) {
                return (d = c.call(null, e, a, b)) ? void 0 : !1
            }), !!d) : d
        },
        some: function (b, c) {
            var d = !1;
            return b ? (a.each(b, function (a, e) {
                return (d = c.call(null, e, a, b)) ? !1 : void 0
            }), !!d) : d
        },
        mixin: a.extend,
        getUniqueId: function () {
            var a = 0;
            return function () {
                return a++
            }
        }(),
        templatify: function (b) {
            function c() {
                return String(b)
            }
            return a.isFunction(b) ? b : c
        },
        defer: function (a) {
            setTimeout(a, 0)
        },
        debounce: function (a, b, c) {
            var d, e;
            return function () {
                var f, g, h = this,
                    i = arguments;
                return f = function () {
                    d = null, c || (e = a.apply(h, i))
                }, g = c && !d, clearTimeout(d), d = setTimeout(f, b), g && (e = a.apply(h, i)), e
            }
        },
        throttle: function (a, b) {
            var c, d, e, f, g, h;
            return g = 0, h = function () {
                g = new Date, e = null, f = a.apply(c, d)
            },
                function () {
                    var i = new Date,
                        j = b - (i - g);
                    return c = this, d = arguments, 0 >= j ? (clearTimeout(e), e = null, g = i, f = a.apply(c, d)) : e || (e = setTimeout(h, j)), f
                }
        },
        noop: function () { }
    }, c = "0.10.2",
        d = function () {
            function a(a) {
                return a.split(/\s+/)
            }

            function b(a) {
                return a.split(/\W+/)
            }

            function c(a) {
                return function (b) {
                    return function (c) {
                        return a(c[b])
                    }
                }
            }
            return {
                nonword: b,
                whitespace: a,
                obj: {
                    nonword: c(b),
                    whitespace: c(a)
                }
            }
        }(),
        e = function () {
            function a(a) {
                this.maxSize = a || 100, this.size = 0, this.hash = {}, this.list = new c
            }

            function c() {
                this.head = this.tail = null
            }

            function d(a, b) {
                this.key = a, this.val = b, this.prev = this.next = null
            }
            return b.mixin(a.prototype, {
                set: function (a, b) {
                    var c, e = this.list.tail;
                    this.size >= this.maxSize && (this.list.remove(e), delete this.hash[e.key]), (c = this.hash[a]) ? (c.val = b, this.list.moveToFront(c)) : (c = new d(a, b), this.list.add(c), this.hash[a] = c, this.size++)
                },
                get: function (a) {
                    var b = this.hash[a];
                    return b ? (this.list.moveToFront(b), b.val) : void 0
                }
            }), b.mixin(c.prototype, {
                add: function (a) {
                    this.head && (a.next = this.head, this.head.prev = a), this.head = a, this.tail = this.tail || a
                },
                remove: function (a) {
                    a.prev ? a.prev.next = a.next : this.head = a.next, a.next ? a.next.prev = a.prev : this.tail = a.prev
                },
                moveToFront: function (a) {
                    this.remove(a), this.add(a)
                }
            }), a
        }(),
        f = function () {
            function a(a) {
                this.prefix = ["__", a, "__"].join(""), this.ttlKey = "__ttl__", this.keyMatcher = new RegExp("^" + this.prefix)
            }

            function c() {
                return (new Date).getTime()
            }

            function d(a) {
                return JSON.stringify(b.isUndefined(a) ? null : a)
            }

            function e(a) {
                return JSON.parse(a)
            }
            var f, g;
            try {
                f = window.localStorage, f.setItem("~~~", "!"), f.removeItem("~~~")
            } catch (h) {
                f = null
            }
            return g = f && window.JSON ? {
                _prefix: function (a) {
                    return this.prefix + a
                },
                _ttlKey: function (a) {
                    return this._prefix(a) + this.ttlKey
                },
                get: function (a) {
                    return this.isExpired(a) && this.remove(a), e(f.getItem(this._prefix(a)))
                },
                set: function (a, e, g) {
                    return b.isNumber(g) ? f.setItem(this._ttlKey(a), d(c() + g)) : f.removeItem(this._ttlKey(a)), f.setItem(this._prefix(a), d(e))
                },
                remove: function (a) {
                    return f.removeItem(this._ttlKey(a)), f.removeItem(this._prefix(a)), this
                },
                clear: function () {
                    var a, b, c = [],
                        d = f.length;
                    for (a = 0; d > a; a++) (b = f.key(a)).match(this.keyMatcher) && c.push(b.replace(this.keyMatcher, ""));
                    for (a = c.length; a--;) this.remove(c[a]);
                    return this
                },
                isExpired: function (a) {
                    var d = e(f.getItem(this._ttlKey(a)));
                    return b.isNumber(d) && c() > d ? !0 : !1
                }
            } : {
                    get: b.noop,
                    set: b.noop,
                    remove: b.noop,
                    clear: b.noop,
                    isExpired: b.noop
                }, b.mixin(a.prototype, g), a
        }(),
        g = function () {
            function c(b) {
                b = b || {}, this._send = b.transport ? d(b.transport) : a.ajax, this._get = b.rateLimiter ? b.rateLimiter(this._get) : this._get
            }

            function d(c) {
                return function (d, e) {
                    function f(a) {
                        b.defer(function () {
                            h.resolve(a)
                        })
                    }

                    function g(a) {
                        b.defer(function () {
                            h.reject(a)
                        })
                    }
                    var h = a.Deferred();
                    return c(d, e, f, g), h
                }
            }
            var f = 0,
                g = {}, h = 6,
                i = new e(10);
            return c.setMaxPendingRequests = function (a) {
                h = a
            }, c.resetCache = function () {
                i = new e(10)
            }, b.mixin(c.prototype, {
                _get: function (a, b, c) {
                    function d(b) {
                        c && c(null, b), i.set(a, b)
                    }

                    function e() {
                        c && c(!0)
                    }

                    function j() {
                        f-- , delete g[a], l.onDeckRequestArgs && (l._get.apply(l, l.onDeckRequestArgs), l.onDeckRequestArgs = null)
                    }
                    var k, l = this;
                    (k = g[a]) ? k.done(d).fail(e) : h > f ? (f++ , g[a] = this._send(a, b).done(d).fail(e).always(j)) : this.onDeckRequestArgs = [].slice.call(arguments, 0)
                },
                get: function (a, c, d) {
                    var e;
                    return b.isFunction(c) && (d = c, c = {}), (e = i.get(a)) ? b.defer(function () {
                        d && d(null, e)
                    }) : this._get(a, c, d), !!e
                }
            }), c
        }(),
        h = function () {
            function c(b) {
                b = b || {}, b.datumTokenizer && b.queryTokenizer || a.error("datumTokenizer and queryTokenizer are both required"), this.datumTokenizer = b.datumTokenizer, this.queryTokenizer = b.queryTokenizer, this.reset()
            }

            function d(a) {
                return a = b.filter(a, function (a) {
                    return !!a
                }), a = b.map(a, function (a) {
                    return a.toLowerCase()
                })
            }

            function e() {
                return {
                    ids: [],
                    children: {}
                }
            }

            function f(a) {
                for (var b = {}, c = [], d = 0; d < a.length; d++) b[a[d]] || (b[a[d]] = !0, c.push(a[d]));
                return c
            }

            function g(a, b) {
                function c(a, b) {
                    return a - b
                }
                var d = 0,
                    e = 0,
                    f = [];
                for (a = a.sort(c), b = b.sort(c); d < a.length && e < b.length;) a[d] < b[e] ? d++ : a[d] > b[e] ? e++ : (f.push(a[d]), d++ , e++);
                return f
            }
            return b.mixin(c.prototype, {
                bootstrap: function (a) {
                    this.datums = a.datums, this.trie = a.trie
                },
                add: function (a) {
                    var c = this;
                    a = b.isArray(a) ? a : [a], b.each(a, function (a) {
                        var f, g;
                        f = c.datums.push(a) - 1, g = d(c.datumTokenizer(a)), b.each(g, function (a) {
                            var b, d, g;
                            for (b = c.trie, d = a.split(""); g = d.shift();) b = b.children[g] || (b.children[g] = e()), b.ids.push(f)
                        })
                    })
                },
                get: function (a) {
                    var c, e, h = this;
                    return c = d(this.queryTokenizer(a)), b.each(c, function (a) {
                        var b, c, d, f;
                        if (e && 0 === e.length) return !1;
                        for (b = h.trie, c = a.split(""); b && (d = c.shift());) b = b.children[d];
                        return b && 0 === c.length ? (f = b.ids.slice(0), void (e = e ? g(e, f) : f)) : (e = [], !1)
                    }), e ? b.map(f(e), function (a) {
                        return h.datums[a]
                    }) : []
                },
                reset: function () {
                    this.datums = [], this.trie = e()
                },
                serialize: function () {
                    return {
                        datums: this.datums,
                        trie: this.trie
                    }
                }
            }), c
        }(),
        i = function () {
            function d(a) {
                return a.local || null
            }

            function e(d) {
                var e, f;
                return f = {
                    url: null,
                    thumbprint: "",
                    ttl: 864e5,
                    filter: null,
                    ajax: {}
                }, (e = d.prefetch || null) && (e = b.isString(e) ? {
                    url: e
                } : e, e = b.mixin(f, e), e.thumbprint = c + e.thumbprint, e.ajax.type = e.ajax.type || "GET", e.ajax.dataType = e.ajax.dataType || "json", !e.url && a.error("prefetch requires url to be set")), e
            }

            function f(c) {
                function d(a) {
                    return function (c) {
                        return b.debounce(c, a)
                    }
                }

                function e(a) {
                    return function (c) {
                        return b.throttle(c, a)
                    }
                }
                var f, g;
                return g = {
                    url: null,
                    wildcard: "%QUERY",
                    replace: null,
                    rateLimitBy: "debounce",
                    rateLimitWait: 300,
                    send: null,
                    filter: null,
                    ajax: {}
                }, (f = c.remote || null) && (f = b.isString(f) ? {
                    url: f
                } : f, f = b.mixin(g, f), f.rateLimiter = /^throttle$/i.test(f.rateLimitBy) ? e(f.rateLimitWait) : d(f.rateLimitWait), f.ajax.type = f.ajax.type || "GET", f.ajax.dataType = f.ajax.dataType || "json", delete f.rateLimitBy, delete f.rateLimitWait, !f.url && a.error("remote requires url to be set")), f
            }
            return {
                local: d,
                prefetch: e,
                remote: f
            }
        }();
    ! function (c) {
        function e(b) {
            b && (b.local || b.prefetch || b.remote) || a.error("one of local, prefetch, or remote is required"), this.limit = b.limit || 5, this.sorter = j(b.sorter), this.dupDetector = b.dupDetector || k, this.local = i.local(b), this.prefetch = i.prefetch(b), this.remote = i.remote(b), this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url : null, this.index = new h({
                datumTokenizer: b.datumTokenizer,
                queryTokenizer: b.queryTokenizer
            }), this.storage = this.cacheKey ? new f(this.cacheKey) : null
        }

        function j(a) {
            function c(b) {
                return b.sort(a)
            }

            function d(a) {
                return a
            }
            return b.isFunction(a) ? c : d
        }

        function k() {
            return !1
        }
        var l, m;
        return l = c.Bloodhound, m = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        }, c.Bloodhound = e, e.noConflict = function () {
            return c.Bloodhound = l, e
        }, e.tokenizers = d, b.mixin(e.prototype, {
            _loadPrefetch: function (b) {
                function c(a) {
                    f.clear(), f.add(b.filter ? b.filter(a) : a), f._saveToStorage(f.index.serialize(), b.thumbprint, b.ttl)
                }
                var d, e, f = this;
                return (d = this._readFromStorage(b.thumbprint)) ? (this.index.bootstrap(d), e = a.Deferred().resolve()) : e = a.ajax(b.url, b.ajax).done(c), e
            },
            _getFromRemote: function (a, b) {
                function c(a, c) {
                    b(a ? [] : f.remote.filter ? f.remote.filter(c) : c)
                }
                var d, e, f = this;
                return a = a || "", e = encodeURIComponent(a), d = this.remote.replace ? this.remote.replace(this.remote.url, a) : this.remote.url.replace(this.remote.wildcard, e), this.transport.get(d, this.remote.ajax, c)
            },
            _saveToStorage: function (a, b, c) {
                this.storage && (this.storage.set(m.data, a, c), this.storage.set(m.protocol, location.protocol, c), this.storage.set(m.thumbprint, b, c))
            },
            _readFromStorage: function (a) {
                var b, c = {};
                return this.storage && (c.data = this.storage.get(m.data), c.protocol = this.storage.get(m.protocol), c.thumbprint = this.storage.get(m.thumbprint)), b = c.thumbprint !== a || c.protocol !== location.protocol, c.data && !b ? c.data : null
            },
            _initialize: function () {
                function c() {
                    e.add(b.isFunction(f) ? f() : f)
                }
                var d, e = this,
                    f = this.local;
                return d = this.prefetch ? this._loadPrefetch(this.prefetch) : a.Deferred().resolve(), f && d.done(c), this.transport = this.remote ? new g(this.remote) : null, this.initPromise = d.promise()
            },
            initialize: function (a) {
                return !this.initPromise || a ? this._initialize() : this.initPromise
            },
            add: function (a) {
                this.index.add(a)
            },
            get: function (a, c) {
                function d(a) {
                    var d = f.slice(0);
                    b.each(a, function (a) {
                        var c;
                        return c = b.some(d, function (b) {
                            return e.dupDetector(a, b)
                        }), !c && d.push(a), d.length < e.limit
                    }), c && c(e.sorter(d))
                }
                var e = this,
                    f = [],
                    g = !1;
                f = this.index.get(a), f = this.sorter(f).slice(0, this.limit), f.length < this.limit && this.transport && (g = this._getFromRemote(a, d)), g || (f.length > 0 || !this.transport) && c && c(f)
            },
            clear: function () {
                this.index.reset()
            },
            clearPrefetchCache: function () {
                this.storage && this.storage.clear()
            },
            clearRemoteCache: function () {
                this.transport && g.resetCache()
            },
            ttAdapter: function () {
                return b.bind(this.get, this)
            }
        }), e
    }(this);
    var j = {
        wrapper: '<span class="twitter-typeahead"></span>',
        dropdown: '<span class="tt-dropdown-menu"></span>',
        dataset: '<div class="tt-dataset tt-dataset-%CLASS%"></div>',
        suggestions: '<span class="tt-suggestions"></span>',
        suggestion: '<div class="tt-suggestion"></div>'
    }, k = {
        wrapper: {
            position: "relative",
            display: "block"
        },
        hint: {
            position: "absolute",
            top: "0",
            left: "0",
            borderColor: "transparent",
            boxShadow: "none"
        },
        input: {
            position: "relative",
            verticalAlign: "top",
            backgroundColor: "transparent"
        },
        inputWithNoHint: {
            position: "relative",
            verticalAlign: "top"
        },
        dropdown: {
            position: "absolute",
            top: "100%",
            left: "0",
            zIndex: "100",
            display: "none"
        },
        suggestions: {
            display: "block"
        },
        suggestion: {
            whiteSpace: "nowrap",
            cursor: "pointer"
        },
        suggestionChild: {
            whiteSpace: "normal"
        },
        ltr: {
            left: "0",
            right: "auto"
        },
        rtl: {
            left: "auto",
            right: " 0"
        }
    };
    b.isMsie() && b.mixin(k.input, {
        backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
    }), b.isMsie() && b.isMsie() <= 7 && b.mixin(k.input, {
        marginTop: "-1px"
    });
    var l = function () {
        function c(b) {
            b && b.el || a.error("EventBus initialized without el"), this.$el = a(b.el)
        }
        var d = "typeahead:";
        return b.mixin(c.prototype, {
            trigger: function (a) {
                var b = [].slice.call(arguments, 1);
                this.$el.trigger(d + a, b)
            }
        }), c
    }(),
        m = function () {
            function a(a, b, c, d) {
                var e;
                if (!c) return this;
                for (b = b.split(i), c = d ? h(c, d) : c, this._callbacks = this._callbacks || {}; e = b.shift();) this._callbacks[e] = this._callbacks[e] || {
                    sync: [],
                    async: []
                }, this._callbacks[e][a].push(c);
                return this
            }

            function b(b, c, d) {
                return a.call(this, "async", b, c, d)
            }

            function c(b, c, d) {
                return a.call(this, "sync", b, c, d)
            }

            function d(a) {
                var b;
                if (!this._callbacks) return this;
                for (a = a.split(i); b = a.shift();) delete this._callbacks[b];
                return this
            }

            function e(a) {
                var b, c, d, e, g;
                if (!this._callbacks) return this;
                for (a = a.split(i), d = [].slice.call(arguments, 1);
                    (b = a.shift()) && (c = this._callbacks[b]);) e = f(c.sync, this, [b].concat(d)), g = f(c.async, this, [b].concat(d)), e() && j(g);
                return this
            }

            function f(a, b, c) {
                function d() {
                    for (var d, e = 0; !d && e < a.length; e += 1) d = a[e].apply(b, c) === !1;
                    return !d
                }
                return d
            }

            function g() {
                var a;
                return a = window.setImmediate ? function (a) {
                    setImmediate(function () {
                        a()
                    })
                } : function (a) {
                    setTimeout(function () {
                        a()
                    }, 0)
                }
            }

            function h(a, b) {
                return a.bind ? a.bind(b) : function () {
                    a.apply(b, [].slice.call(arguments, 0))
                }
            }
            var i = /\s+/,
                j = g();
            return {
                onSync: c,
                onAsync: b,
                off: d,
                trigger: e
            }
        }(),
        n = function (a) {
            function c(a, c, d) {
                for (var e, f = [], g = 0; g < a.length; g++) f.push(b.escapeRegExChars(a[g]));
                return e = d ? "\\b(" + f.join("|") + ")\\b" : "(" + f.join("|") + ")", c ? new RegExp(e) : new RegExp(e, "i")
            }
            var d = {
                node: null,
                pattern: null,
                tagName: "strong",
                className: null,
                wordsOnly: !1,
                caseSensitive: !1
            };
            return function (e) {
                function f(b) {
                    var c, d;
                    return (c = h.exec(b.data)) && (wrapperNode = a.createElement(e.tagName), e.className && (wrapperNode.className = e.className), d = b.splitText(c.index), d.splitText(c[0].length), wrapperNode.appendChild(d.cloneNode(!0)), b.parentNode.replaceChild(wrapperNode, d)), !!c
                }

                function g(a, b) {
                    for (var c, d = 3, e = 0; e < a.childNodes.length; e++) c = a.childNodes[e], c.nodeType === d ? e += b(c) ? 1 : 0 : g(c, b)
                }
                var h;
                e = b.mixin({}, d, e), e.node && e.pattern && (e.pattern = b.isArray(e.pattern) ? e.pattern : [e.pattern], h = c(e.pattern, e.caseSensitive, e.wordsOnly), g(e.node, f))
            }
        }(window.document),
        o = function () {
            function c(c) {
                var e, f, h, i, j = this;
                c = c || {}, c.input || a.error("input is missing"), e = b.bind(this._onBlur, this), f = b.bind(this._onFocus, this), h = b.bind(this._onKeydown, this), i = b.bind(this._onInput, this), this.$hint = a(c.hint), this.$input = a(c.input).on("blur.tt", e).on("focus.tt", f).on("keydown.tt", h), 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = b.noop), b.isMsie() ? this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function (a) {
                    g[a.which || a.keyCode] || b.defer(b.bind(j._onInput, j, a))
                }) : this.$input.on("input.tt", i), this.query = this.$input.val(), this.$overflowHelper = d(this.$input)
            }

            function d(b) {
                return a('<pre aria-hidden="true"></pre>').css({
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontFamily: b.css("font-family"),
                    fontSize: b.css("font-size"),
                    fontStyle: b.css("font-style"),
                    fontVariant: b.css("font-variant"),
                    fontWeight: b.css("font-weight"),
                    wordSpacing: b.css("word-spacing"),
                    letterSpacing: b.css("letter-spacing"),
                    textIndent: b.css("text-indent"),
                    textRendering: b.css("text-rendering"),
                    textTransform: b.css("text-transform")
                }).insertAfter(b)
            }

            function e(a, b) {
                return c.normalizeQuery(a) === c.normalizeQuery(b)
            }

            function f(a) {
                return a.altKey || a.ctrlKey || a.metaKey || a.shiftKey
            }
            var g;
            return g = {
                9: "tab",
                27: "esc",
                37: "left",
                39: "right",
                13: "enter",
                38: "up",
                40: "down"
            }, c.normalizeQuery = function (a) {
                return (a || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
            }, b.mixin(c.prototype, m, {
                _onBlur: function () {
                    this.resetInputValue(), this.trigger("blurred")
                },
                _onFocus: function () {
                    this.trigger("focused")
                },
                _onKeydown: function (a) {
                    var b = g[a.which || a.keyCode];
                    this._managePreventDefault(b, a), b && this._shouldTrigger(b, a) && this.trigger(b + "Keyed", a)
                },
                _onInput: function () {
                    this._checkInputValue()
                },
                _managePreventDefault: function (a, b) {
                    var c, d, e;
                    switch (a) {
                        case "tab":
                            d = this.getHint(), e = this.getInputValue(), c = d && d !== e && !f(b);
                            break;
                        case "up":
                        case "down":
                            c = !f(b);
                            break;
                        default:
                            c = !1
                    }
                    c && b.preventDefault()
                },
                _shouldTrigger: function (a, b) {
                    var c;
                    switch (a) {
                        case "tab":
                            c = !f(b);
                            break;
                        default:
                            c = !0
                    }
                    return c
                },
                _checkInputValue: function () {
                    var a, b, c;
                    a = this.getInputValue(), b = e(a, this.query), c = b ? this.query.length !== a.length : !1, b ? c && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query = a)
                },
                focus: function () {
                    this.$input.focus()
                },
                blur: function () {
                    this.$input.blur()
                },
                getQuery: function () {
                    return this.query
                },
                setQuery: function (a) {
                    this.query = a
                },
                getInputValue: function () {
                    return this.$input.val()
                },
                setInputValue: function (a, b) {
                    this.$input.val(a), b ? this.clearHint() : this._checkInputValue()
                },
                resetInputValue: function () {
                    this.setInputValue(this.query, !0)
                },
                getHint: function () {
                    return this.$hint.val()
                },
                setHint: function (a) {
                    this.$hint.val(a)
                },
                clearHint: function () {
                    this.setHint("")
                },
                clearHintIfInvalid: function () {
                    var a, b, c, d;
                    a = this.getInputValue(), b = this.getHint(), c = a !== b && 0 === b.indexOf(a), d = "" !== a && c && !this.hasOverflow(), !d && this.clearHint()
                },
                getLanguageDirection: function () {
                    return (this.$input.css("direction") || "ltr").toLowerCase()
                },
                hasOverflow: function () {
                    var a = this.$input.width() - 2;
                    return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= a
                },
                isCursorAtEnd: function () {
                    var a, c, d;
                    return a = this.$input.val().length, c = this.$input[0].selectionStart, b.isNumber(c) ? c === a : document.selection ? (d = document.selection.createRange(), d.moveStart("character", -a), a === d.text.length) : !0
                },
                destroy: function () {
                    this.$hint.off(".tt"), this.$input.off(".tt"), this.$hint = this.$input = this.$overflowHelper = null
                }
            }), c
        }(),
        p = function () {
            function c(c) {
                c = c || {}, c.templates = c.templates || {}, c.source || a.error("missing source"), c.name && !f(c.name) && a.error("invalid dataset name: " + c.name), this.query = null, this.highlight = !!c.highlight, this.name = c.name || b.getUniqueId(), this.source = c.source, this.displayFn = d(c.display || c.displayKey), this.templates = e(c.templates, this.displayFn), this.$el = a(j.dataset.replace("%CLASS%", this.name))
            }

            function d(a) {
                function c(b) {
                    return b[a]
                }
                return a = a || "value", b.isFunction(a) ? a : c
            }

            function e(a, c) {
                function d(a) {
                    return "<p>" + c(a) + "</p>"
                }
                return {
                    empty: a.empty && b.templatify(a.empty),
                    header: a.header && b.templatify(a.header),
                    footer: a.footer && b.templatify(a.footer),
                    suggestion: a.suggestion || d
                }
            }

            function f(a) {
                return /^[_a-zA-Z0-9-]+$/.test(a)
            }
            var g = "ttDataset",
                h = "ttValue",
                i = "ttDatum";
            return c.extractDatasetName = function (b) {
                return a(b).data(g)
            }, c.extractValue = function (b) {
                return a(b).data(h)
            }, c.extractDatum = function (b) {
                return a(b).data(i)
            }, b.mixin(c.prototype, m, {
                _render: function (c, d) {
                    function e() {
                        return p.templates.empty({
                            query: c,
                            isEmpty: !0
                        })
                    }

                    function f() {
                        function e(b) {
                            var c;
                            return c = a(j.suggestion).append(p.templates.suggestion(b)).data(g, p.name).data(h, p.displayFn(b)).data(i, b), c.children().each(function () {
                                a(this).css(k.suggestionChild)
                            }), c
                        }
                        var f, l;
                        return f = a(j.suggestions).css(k.suggestions), l = b.map(d, e), f.append.apply(f, l), p.highlight && n({
                            node: f[0],
                            pattern: c
                        }), f
                    }

                    function l() {
                        return p.templates.header({
                            query: c,
                            isEmpty: !o
                        })
                    }

                    function m() {
                        return p.templates.footer({
                            query: c,
                            isEmpty: !o
                        })
                    }
                    if (this.$el) {
                        var o, p = this;
                        this.$el.empty(), o = d && d.length, !o && this.templates.empty ? this.$el.html(e()).prepend(p.templates.header ? l() : null).append(p.templates.footer ? m() : null) : o && this.$el.html(f()).prepend(p.templates.header ? l() : null).append(p.templates.footer ? m() : null), this.trigger("rendered")
                    }
                },
                getRoot: function () {
                    return this.$el
                },
                update: function (a) {
                    function b(b) {
                        c.canceled || a !== c.query || c._render(a, b)
                    }
                    var c = this;
                    this.query = a, this.canceled = !1, this.source(a, b)
                },
                cancel: function () {
                    this.canceled = !0
                },
                clear: function () {
                    this.cancel(), this.$el.empty(), this.trigger("rendered")
                },
                isEmpty: function () {
                    return this.$el.is(":empty")
                },
                destroy: function () {
                    this.$el = null
                }
            }), c
        }(),
        q = function () {
            function c(c) {
                var e, f, g, h = this;
                c = c || {}, c.menu || a.error("menu is required"), this.isOpen = !1, this.isEmpty = !0, this.datasets = b.map(c.datasets, d), e = b.bind(this._onSuggestionClick, this), f = b.bind(this._onSuggestionMouseEnter, this), g = b.bind(this._onSuggestionMouseLeave, this), this.$menu = a(c.menu).on("click.tt", ".tt-suggestion", e).on("mouseenter.tt", ".tt-suggestion", f).on("mouseleave.tt", ".tt-suggestion", g), b.each(this.datasets, function (a) {
                    h.$menu.append(a.getRoot()), a.onSync("rendered", h._onRendered, h)
                })
            }

            function d(a) {
                return new p(a)
            }
            return b.mixin(c.prototype, m, {
                _onSuggestionClick: function (b) {
                    this.trigger("suggestionClicked", a(b.currentTarget))
                },
                _onSuggestionMouseEnter: function (b) {
                    this._removeCursor(), this._setCursor(a(b.currentTarget), !0)
                },
                _onSuggestionMouseLeave: function () {
                    this._removeCursor()
                },
                _onRendered: function () {
                    function a(a) {
                        return a.isEmpty()
                    }
                    this.isEmpty = b.every(this.datasets, a), this.isEmpty ? this._hide() : this.isOpen && this._show(), this.trigger("datasetRendered")
                },
                _hide: function () {
                    this.$menu.hide()
                },
                _show: function () {
                    this.$menu.css("display", "block")
                },
                _getSuggestions: function () {
                    return this.$menu.find(".tt-suggestion")
                },
                _getCursor: function () {
                    return this.$menu.find(".tt-cursor").first()
                },
                _setCursor: function (a, b) {
                    a.first().addClass("tt-cursor"), !b && this.trigger("cursorMoved")
                },
                _removeCursor: function () {
                    this._getCursor().removeClass("tt-cursor")
                },
                _moveCursor: function (a) {
                    var b, c, d, e;
                    if (this.isOpen) {
                        if (c = this._getCursor(), b = this._getSuggestions(), this._removeCursor(), d = b.index(c) + a, d = (d + 1) % (b.length + 1) - 1, -1 === d) return void this.trigger("cursorRemoved"); -1 > d && (d = b.length - 1), this._setCursor(e = b.eq(d)), this._ensureVisible(e)
                    }
                },
                _ensureVisible: function (a) {
                    var b, c, d, e;
                    b = a.position().top, c = b + a.outerHeight(!0), d = this.$menu.scrollTop(), e = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10), 0 > b ? this.$menu.scrollTop(d + b) : c > e && this.$menu.scrollTop(d + (c - e))
                },
                close: function () {
                    this.isOpen && (this.isOpen = !1, this._removeCursor(), this._hide(), this.trigger("closed"))
                },
                open: function () {
                    this.isOpen || (this.isOpen = !0, !this.isEmpty && this._show(), this.trigger("opened"))
                },
                setLanguageDirection: function (a) {
                    this.$menu.css("ltr" === a ? k.ltr : k.rtl)
                },
                moveCursorUp: function () {
                    this._moveCursor(-1)
                },
                moveCursorDown: function () {
                    this._moveCursor(1)
                },
                getDatumForSuggestion: function (a) {
                    var b = null;
                    return a.length && (b = {
                        raw: p.extractDatum(a),
                        value: p.extractValue(a),
                        datasetName: p.extractDatasetName(a)
                    }), b
                },
                getDatumForCursor: function () {
                    return this.getDatumForSuggestion(this._getCursor().first())
                },
                getDatumForTopSuggestion: function () {
                    return this.getDatumForSuggestion(this._getSuggestions().first())
                },
                update: function (a) {
                    function c(b) {
                        b.update(a)
                    }
                    b.each(this.datasets, c)
                },
                empty: function () {
                    function a(a) {
                        a.clear()
                    }
                    b.each(this.datasets, a), this.isEmpty = !0
                },
                isVisible: function () {
                    return this.isOpen && !this.isEmpty
                },
                destroy: function () {
                    function a(a) {
                        a.destroy()
                    }
                    this.$menu.off(".tt"), this.$menu = null, b.each(this.datasets, a)
                }
            }), c
        }(),
        r = function () {
            function c(c) {
                var e, f, g;
                c = c || {}, c.input || a.error("missing input"), this.isActivated = !1, this.autoselect = !!c.autoselect, this.minLength = b.isNumber(c.minLength) ? c.minLength : 1, this.$node = d(c.input, c.withHint), e = this.$node.find(".tt-dropdown-menu"), f = this.$node.find(".tt-input"), g = this.$node.find(".tt-hint"), f.on("blur.tt", function (a) {
                    var c, d, g;
                    c = document.activeElement, d = e.is(c), g = e.has(c).length > 0, b.isMsie() && (d || g) && (a.preventDefault(), a.stopImmediatePropagation(), b.defer(function () {
                        f.focus()
                    }))
                }), e.on("mousedown.tt", function (a) {
                    a.preventDefault()
                }), this.eventBus = c.eventBus || new l({
                    el: f
                }), this.dropdown = new q({
                    menu: e,
                    datasets: c.datasets
                }).onSync("suggestionClicked", this._onSuggestionClicked, this).onSync("cursorMoved", this._onCursorMoved, this).onSync("cursorRemoved", this._onCursorRemoved, this).onSync("opened", this._onOpened, this).onSync("closed", this._onClosed, this).onAsync("datasetRendered", this._onDatasetRendered, this), this.input = new o({
                    input: f,
                    hint: g
                }).onSync("focused", this._onFocused, this).onSync("blurred", this._onBlurred, this).onSync("enterKeyed", this._onEnterKeyed, this).onSync("tabKeyed", this._onTabKeyed, this).onSync("escKeyed", this._onEscKeyed, this).onSync("upKeyed", this._onUpKeyed, this).onSync("downKeyed", this._onDownKeyed, this).onSync("leftKeyed", this._onLeftKeyed, this).onSync("rightKeyed", this._onRightKeyed, this).onSync("queryChanged", this._onQueryChanged, this).onSync("whitespaceChanged", this._onWhitespaceChanged, this), this._setLanguageDirection()
            }

            function d(b, c) {
                var d, f, h, i;
                d = a(b), f = a(j.wrapper).css(k.wrapper), h = a(j.dropdown).css(k.dropdown), i = d.clone().css(k.hint).css(e(d)), i.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder").prop("disabled", !0).attr({
                    autocomplete: "off",
                    spellcheck: "false"
                }), d.data(g, {
                    dir: d.attr("dir"),
                    autocomplete: d.attr("autocomplete"),
                    spellcheck: d.attr("spellcheck"),
                    style: d.attr("style")
                }), d.addClass("tt-input").attr({
                    autocomplete: "off",
                    spellcheck: !1
                }).css(c ? k.input : k.inputWithNoHint);
                try {
                    !d.attr("dir") && d.attr("dir", "auto")
                } catch (l) { }
                return d.wrap(f).parent().prepend(c ? i : null).append(h)
            }

            function e(a) {
                return {
                    backgroundAttachment: a.css("background-attachment"),
                    backgroundClip: a.css("background-clip"),
                    backgroundColor: a.css("background-color"),
                    backgroundImage: a.css("background-image"),
                    backgroundOrigin: a.css("background-origin"),
                    backgroundPosition: a.css("background-position"),
                    backgroundRepeat: a.css("background-repeat"),
                    backgroundSize: a.css("background-size")
                }
            }

            function f(a) {
                var c = a.find(".tt-input");
                b.each(c.data(g), function (a, d) {
                    b.isUndefined(a) ? c.removeAttr(d) : c.attr(d, a)
                }), c.detach().removeData(g).removeClass("tt-input").insertAfter(a), a.remove()
            }
            var g = "ttAttrs";
            return b.mixin(c.prototype, {
                _onSuggestionClicked: function (a, b) {
                    var c;
                    (c = this.dropdown.getDatumForSuggestion(b)) && this._select(c)
                },
                _onCursorMoved: function () {
                    var a = this.dropdown.getDatumForCursor();
                    this.input.setInputValue(a.value, !0), this.eventBus.trigger("cursorchanged", a.raw, a.datasetName)
                },
                _onCursorRemoved: function () {
                    this.input.resetInputValue(), this._updateHint()
                },
                _onDatasetRendered: function () {
                    this._updateHint()
                },
                _onOpened: function () {
                    this._updateHint(), this.eventBus.trigger("opened")
                },
                _onClosed: function () {
                    this.input.clearHint(), this.eventBus.trigger("closed")
                },
                _onFocused: function () {
                    this.isActivated = !0, this.dropdown.open()
                },
                _onBlurred: function () {
                    this.isActivated = !1, this.dropdown.empty(), this.dropdown.close()
                },
                _onEnterKeyed: function (a, b) {
                    var c, d;
                    c = this.dropdown.getDatumForCursor(), d = this.dropdown.getDatumForTopSuggestion(), c ? (this._select(c), b.preventDefault()) : this.autoselect && d && (this._select(d), b.preventDefault())
                },
                _onTabKeyed: function (a, b) {
                    var c;
                    (c = this.dropdown.getDatumForCursor()) ? (this._select(c), b.preventDefault()) : this._autocomplete(!0)
                },
                _onEscKeyed: function () {
                    this.dropdown.close(), this.input.resetInputValue()
                },
                _onUpKeyed: function () {
                    var a = this.input.getQuery();
                    this.dropdown.isEmpty && a.length >= this.minLength ? this.dropdown.update(a) : this.dropdown.moveCursorUp(), this.dropdown.open()
                },
                _onDownKeyed: function () {
                    var a = this.input.getQuery();
                    this.dropdown.isEmpty && a.length >= this.minLength ? this.dropdown.update(a) : this.dropdown.moveCursorDown(), this.dropdown.open()
                },
                _onLeftKeyed: function () {
                    "rtl" === this.dir && this._autocomplete()
                },
                _onRightKeyed: function () {
                    "ltr" === this.dir && this._autocomplete()
                },
                _onQueryChanged: function (a, b) {
                    this.input.clearHintIfInvalid(), b.length >= this.minLength ? this.dropdown.update(b) : this.dropdown.empty(), this.dropdown.open(), this._setLanguageDirection()
                },
                _onWhitespaceChanged: function () {
                    this._updateHint(), this.dropdown.open()
                },
                _setLanguageDirection: function () {
                    var a;
                    this.dir !== (a = this.input.getLanguageDirection()) && (this.dir = a, this.$node.css("direction", a), this.dropdown.setLanguageDirection(a))
                },
                _updateHint: function () {
                    var a, c, d, e, f, g;
                    a = this.dropdown.getDatumForTopSuggestion(), a && this.dropdown.isVisible() && !this.input.hasOverflow() ? (c = this.input.getInputValue(), d = o.normalizeQuery(c), e = b.escapeRegExChars(d), f = new RegExp("^(?:" + e + ")(.+$)", "i"), g = f.exec(a.value), g ? this.input.setHint(c + g[1]) : this.input.clearHint()) : this.input.clearHint()
                },
                _autocomplete: function (a) {
                    var b, c, d, e;
                    b = this.input.getHint(), c = this.input.getQuery(), d = a || this.input.isCursorAtEnd(), b && c !== b && d && (e = this.dropdown.getDatumForTopSuggestion(), e && this.input.setInputValue(e.value), this.eventBus.trigger("autocompleted", e.raw, e.datasetName))
                },
                _select: function (a) {
                    this.input.setQuery(a.value), this.input.setInputValue(a.value, !0), this._setLanguageDirection(), this.eventBus.trigger("selected", a.raw, a.datasetName), this.dropdown.close(), b.defer(b.bind(this.dropdown.empty, this.dropdown))
                },
                open: function () {
                    this.dropdown.open()
                },
                close: function () {
                    this.dropdown.close()
                },
                setVal: function (a) {
                    this.isActivated ? this.input.setInputValue(a) : (this.input.setQuery(a), this.input.setInputValue(a, !0)), this._setLanguageDirection()
                },
                getVal: function () {
                    return this.input.getQuery()
                },
                destroy: function () {
                    this.input.destroy(), this.dropdown.destroy(), f(this.$node), this.$node = null
                }
            }), c
        }();
    ! function () {
        var c, d, e;
        c = a.fn.typeahead, d = "ttTypeahead", e = {
            initialize: function (c, e) {
                function f() {
                    var f, g, h = a(this);
                    b.each(e, function (a) {
                        a.highlight = !!c.highlight
                    }), g = new r({
                        input: h,
                        eventBus: f = new l({
                            el: h
                        }),
                        withHint: b.isUndefined(c.hint) ? !0 : !!c.hint,
                        minLength: c.minLength,
                        autoselect: c.autoselect,
                        datasets: e
                    }), h.data(d, g)
                }
                return e = b.isArray(e) ? e : [].slice.call(arguments, 1), c = c || {}, this.each(f)
            },
            open: function () {
                function b() {
                    var b, c = a(this);
                    (b = c.data(d)) && b.open()
                }
                return this.each(b)
            },
            close: function () {
                function b() {
                    var b, c = a(this);
                    (b = c.data(d)) && b.close()
                }
                return this.each(b)
            },
            val: function (b) {
                function c() {
                    var c, e = a(this);
                    (c = e.data(d)) && c.setVal(b)
                }

                function e(a) {
                    var b, c;
                    return (b = a.data(d)) && (c = b.getVal()), c
                }
                return arguments.length ? this.each(c) : e(this.first())
            },
            destroy: function () {
                function b() {
                    var b, c = a(this);
                    (b = c.data(d)) && (b.destroy(), c.removeData(d))
                }
                return this.each(b)
            }
        }, a.fn.typeahead = function (a) {
            return e[a] ? e[a].apply(this, [].slice.call(arguments, 1)) : e.initialize.apply(this, arguments)
        }, a.fn.typeahead.noConflict = function () {
            return a.fn.typeahead = c, this
        }
    }()
}(window.jQuery);