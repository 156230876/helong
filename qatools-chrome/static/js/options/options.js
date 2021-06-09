/*! ngTable v0.8.3 by Vitalii Savchuk(esvit666@gmail.com) - https://github.com/esvit/ng-table - New BSD License */

!function (a, b) {
    "use strict"; //"严格模式"（strict mode）。顾名思义，这种模式使得Javascript在更严格的条件下运行。
    return "function" == typeof define && define.amd ? void define(["angular"], function (a) {
        return b(a)
    }) : b(a)
}(window.angular || null, function (angular) {
    /**
     * AngularJS技术AngularJS[1]  诞生于2009年，由Misko Hevery 等人创建，
     * 后为Google所收购。是一款优秀的前端JS框架，已经被用于Google的多款产品当中。
     * AngularJS有着诸多特性，最为核心的是：MVVM、模块化、自动化双向数据绑定、语义化标签、依赖注入等等。
    */
    "use strict";
    var app = angular.module("ngTable", []);
    return function () {
        function b(b) {
            function c(b, c) {
                var f = b.charAt(0).toUpperCase() + b.substring(1), g = {};
                return g["on" + f] = d(b), g["publish" + f] = e(b), angular.extend(c, g)
            }

            function d(c) {
                return function (d) {
                    var e = angular.identity, g = b;
                    if (2 === arguments.length ? angular.isFunction(arguments[1].$new) ? g = arguments[1] : e = arguments[1] : arguments.length > 2 && (g = arguments[1], e = arguments[2]), angular.isObject(e)) {
                        var h = e;
                        e = function (a) {
                            return a === h
                        }
                    }
                    return g.$on("ngTable:" + c, function (a, b) {
                        if (!b.isNullInstance) {
                            var c = f(arguments, 2), g = [b].concat(c);
                            e.apply(this, g) && d.apply(this, g)
                        }
                    })
                }
            }

            function e(a) {
                return function () {
                    var c = ["ngTable:" + a].concat(Array.prototype.slice.call(arguments));
                    b.$broadcast.apply(b, c)
                }
            }

            function f(a, b) {
                return Array.prototype.slice.call(a, null == b ? 1 : b)
            }

            var g = {};
            return g = c("afterCreated", g), g = c("afterReloadData", g), g = c("datasetChanged", g), g = c("pagesChanged", g)
        }

        angular.module("ngTable").factory("ngTableEventsChannel", b), b.$inject = ["$rootScope"]
    }(), function () {
        function b() {
            function b() {
                c()
            }

            function c() {
                f = g
            }

            function d(b) {
                var c = angular.extend({}, f, b);
                c.aliasUrls = angular.extend({}, f.aliasUrls, b.aliasUrls), f = c
            }

            function e() {
                function b(a, b) {
                    return -1 !== a.indexOf("/") ? a : e.getUrlForAlias(a, b)
                }

                function c(a) {
                    return f.aliasUrls[a] || f.defaultBaseUrl + a + f.defaultExt
                }

                var d, e = {config: d, getTemplateUrl: b, getUrlForAlias: c};
                return Object.defineProperty(e, "config", {
                    get: function () {
                        return d = d || angular.copy(f)
                    }, enumerable: !0
                }), e
            }

            var f, g = {defaultBaseUrl: "ng-table/filters/", defaultExt: ".html", aliasUrls: {}};
            this.$get = e, this.resetConfigs = c, this.setConfig = d, b(), e.$inject = []
        }

        angular.module("ngTable").provider("ngTableFilterConfig", b), b.$inject = []
    }(), function () {
        function b() {
            function a(a) {
                function c(c, d) {
                    if (null == c)return [];
                    var e = d.hasFilter() ? a(b.filterFilterName)(c, d.filter(!0)) : c, f = d.orderBy(), g = f.length ? a(b.sortingFilterName)(e, f) : e, h = g.slice((d.page() - 1) * d.count(), d.page() * d.count());
                    return d.total(g.length), h
                }

                return c
            }

            var b = this;
            b.$get = a, b.filterFilterName = "filter", b.sortingFilterName = "orderBy", a.$inject = ["$filter"]
        }

        angular.module("ngTable").provider("ngTableDefaultGetData", b), b.$inject = []
    }(), function () {
        function b(a) {
            function b(b) {
                return function () {
                    var c = a.defer(), d = b.apply(this, [c].concat(Array.prototype.slice.call(arguments)));
                    return d || (d = c.promise), d
                }
            }

            return b
        }

        angular.module("ngTable").factory("ngTableGetDataBcShim", b), b.$inject = ["$q"]
    }(), app.value("ngTableDefaults", {
        params: {},
        settings: {}
    }), app.factory("NgTableParams", ["$q", "$log", "ngTableDefaults", "ngTableGetDataBcShim", "ngTableDefaultGetData", "ngTableEventsChannel", function (b, c, d, e, f, g) {
        var h = function (a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        }, i = function (i, j) {
            function k() {
                var a = s.getDataFnAdaptor(s.getData);
                return b.when(a.call(s, o))
            }

            function l() {
                var a = s.getGroupsFnAdaptor(s.getGroups);
                return b.when(a.call(s, s.groupBy, o))
            }

            function m(a) {
                var c = s.interceptors || [];
                return c.reduce(function (a, c) {
                    var d = c.response && c.response.bind(c) || b.when, e = c.responseError && c.responseError.bind(c) || b.reject;
                    return a.then(function (a) {
                        return d(a, o)
                    }, function (a) {
                        return e(a, o)
                    })
                }, a())
            }

            "boolean" == typeof i && (this.isNullInstance = !0);
            var n, o = this, p = !1, q = function () {
                s.debugMode && c.debug && c.debug.apply(this, arguments)
            };
            this.data = [], this.parameters = function (b, c) {
                if (c = c || !1, angular.isDefined(b)) {
                    for (var d in b) {
                        var e = b[d];
                        if (c && d.indexOf("[") >= 0) {
                            for (var f = d.split(/\[(.*)\]/).reverse(), g = "", i = 0, j = f.length; j > i; i++) {
                                var k = f[i];
                                if ("" !== k) {
                                    var l = e;
                                    e = {}, e[g = k] = h(l) ? parseFloat(l) : l
                                }
                            }
                            "sorting" === g && (r[g] = {}), r[g] = angular.extend(r[g] || {}, e[g])
                        } else r[d] = h(b[d]) ? parseFloat(b[d]) : b[d]
                    }
                    return q("ngTable: set parameters", r), this
                }
                return r
            }, this.settings = function (b) {
                if (angular.isDefined(b)) {
                    angular.isArray(b.data) && (b.total = b.data.length), b.getData && b.getData.length > 1 && (b.getDataFnAdaptor = e), b.getGroups && b.getGroups.length > 2 && (b.getGroupsFnAdaptor = e);
                    var c = s.data;
                    s = angular.extend(s, b);
                    var d = b.hasOwnProperty("data") && b.data != c;
                    return d && (p && this.page(1), p = !1, g.publishDatasetChanged(this, b.data, c)), q("ngTable: set settings", s), this
                }
                return s
            }, this.page = function (b) {
                return angular.isDefined(b) ? this.parameters({page: b}) : r.page
            }, this.total = function (b) {
                return angular.isDefined(b) ? this.settings({total: b}) : s.total
            }, this.count = function (b) {
                return angular.isDefined(b) ? this.parameters({count: b, page: 1}) : r.count
            }, this.filter = function (b) {
                if (angular.isDefined(b) && angular.isObject(b))return this.parameters({filter: b, page: 1});
                if (b === !0) {
                    for (var c = Object.keys(r.filter), d = {}, e = 0; e < c.length; e++) {
                        var f = r.filter[c[e]];
                        null != f && "" !== f && (d[c[e]] = f)
                    }
                    return d
                }
                return r.filter
            }, this.sorting = function (b) {
                if (2 == arguments.length) {
                    var c = {};
                    return c[b] = arguments[1], this.parameters({sorting: c}), this
                }
                return angular.isDefined(b) ? this.parameters({sorting: b}) : r.sorting
            }, this.isSortBy = function (b, c) {
                return void 0 !== c ? angular.isDefined(r.sorting[b]) && r.sorting[b] == c : angular.isDefined(r.sorting[b])
            }, this.orderBy = function () {
                var a = [];
                for (var b in r.sorting)a.push(("asc" === r.sorting[b] ? "+" : "-") + b);
                return a
            }, this.getData = function (a) {
                return f(this.data, a)
            }, this.getGroups = function (b) {
                return k().then(function (c) {
                    var d = {};
                    angular.forEach(c, function (c) {
                        var e = angular.isFunction(b) ? b(c) : c[b];
                        d[e] = d[e] || {data: []}, d[e].value = e, d[e].data.push(c)
                    });
                    var e = [];
                    for (var f in d)e.push(d[f]);
                    return q("ngTable: refresh groups", e), e
                })
            }, this.generatePagesArray = function (a, b, c, d) {
                arguments.length || (a = this.page(), b = this.total(), c = this.count());
                var e, f, g, h, i;
                if (d = d && 6 > d ? 6 : d, i = [], h = Math.ceil(b / c), h > 1) {
                    i.push({type: "prev", number: Math.max(1, a - 1), active: a > 1}), i.push({
                        type: "first",
                        number: 1,
                        active: a > 1,
                        current: 1 === a
                    }), f = Math.round((s.paginationMaxBlocks - s.paginationMinBlocks) / 2), g = Math.max(2, a - f), e = Math.min(h - 1, a + 2 * f - (a - g)), g = Math.max(2, g - (2 * f - (e - g)));
                    for (var j = g; e >= j;)i.push(j === g && 2 !== j || j === e && j !== h - 1 ? {
                        type: "more",
                        active: !1
                    } : {type: "page", number: j, active: a !== j, current: a === j}), j++;
                    i.push({type: "last", number: h, active: a !== h, current: a === h}), i.push({
                        type: "next",
                        number: Math.min(h, a + 1),
                        active: h > a
                    })
                }
                return i
            }, this.isDataReloadRequired = function () {
                return !p || !angular.equals(r, n)
            }, this.hasFilter = function () {
                return Object.keys(this.filter(!0)).length > 0
            }, this.hasFilterChanges = function () {
                return !angular.equals(r && r.filter, n && n.filter)
            }, this.url = function (b) {
                b = b || !1;
                var c = b ? [] : {};
                for (var d in r)if (r.hasOwnProperty(d)) {
                    var e = r[d], f = encodeURIComponent(d);
                    if ("object" == typeof e) {
                        for (var g in e)if (!angular.isUndefined(e[g]) && "" !== e[g]) {
                            var h = f + "[" + encodeURIComponent(g) + "]";
                            b ? c.push(h + "=" + e[g]) : c[h] = e[g]
                        }
                    } else angular.isFunction(e) || angular.isUndefined(e) || "" === e || (b ? c.push(f + "=" + encodeURIComponent(e)) : c[f] = encodeURIComponent(e))
                }
                return c
            }, this.reload = function () {
                var c = this, d = null;
                s.$loading = !0, n = angular.copy(r), p = !0, d = m(s.groupBy ? l : k), q("ngTable: reload data");
                var e = c.data;
                return d.then(function (a) {
                    return s.$loading = !1, c.data = a, g.publishAfterReloadData(c, a, e), c.reloadPages(), s.$scope && s.$scope.$emit("ngTableAfterReloadData"), a
                })["catch"](function (a) {
                    return n = null, p = !1, b.reject(a)
                })
            }, this.reloadPages = function () {
                var b;
                return function () {
                    var c = b, d = o.generatePagesArray(o.page(), o.total(), o.count());
                    angular.equals(c, d) || (b = d, g.publishPagesChanged(this, d, c))
                }
            }();
            var r = {page: 1, count: 1, filter: {}, sorting: {}, group: {}, groupBy: null};
            angular.extend(r, d.params);
            var s = {
                $scope: null,
                $loading: !1,
                data: null,
                total: 0,
                defaultSort: "desc",
                filterDelay: 750,
                counts: [10, 25, 50, 100],
                interceptors: [],
                paginationMaxBlocks: 11,
                paginationMinBlocks: 5,
                sortingIndicator: "span",
                getDataFnAdaptor: angular.identity,
                getGroupsFnAdaptor: angular.identity,
                getGroups: this.getGroups,
                getData: this.getData
            };
            return this.settings(d.settings), this.settings(j), this.parameters(i, !0), g.publishAfterCreated(this), this
        };
        return i
    }]), app.factory("ngTableParams", ["NgTableParams", function (a) {
        return a
    }]), function () {
        function b(a, b) {
            a.config = b
        }

        angular.module("ngTable").controller("ngTableFilterRowController", b), b.$inject = ["$scope", "ngTableFilterConfig"]
    }(), function () {
        function b(a) {
            function b(b, c) {
                var d = b.sortable && b.sortable();
                if (d) {
                    var e = a.params.settings().defaultSort, f = "asc" === e ? "desc" : "asc", g = a.params.sorting() && a.params.sorting()[d] && a.params.sorting()[d] === e, h = c.ctrlKey || c.metaKey ? a.params.sorting() : {};
                    h[d] = g ? f : e, a.params.parameters({sorting: h})
                }
            }

            a.sortBy = b
        }

        angular.module("ngTable").controller("ngTableSorterRowController", b), b.$inject = ["$scope"]
    }(), app.controller("ngTableController", ["$scope", "NgTableParams", "$timeout", "$parse", "$compile", "$attrs", "$element", "ngTableColumn", "ngTableEventsChannel", function (b, c, d, e, f, g, h, i, j) {
        function k(a) {
            if (a) {
                b.params.settings().$scope = b;
                var c = b.params;
                if (c.hasFilterChanges()) {
                    var d = function () {
                        c.page(1), c.reload()
                    };
                    c.settings().filterDelay ? m(d, c.settings().filterDelay) : d()
                } else c.reload()
            }
        }

        function l() {
            function a(a, c) {
                a.settings().groupBy ? b.$groups = c : b.$data = c
            }

            function c(a, c) {
                b.pages = c
            }

            function d(a) {
                return b.params === a
            }

            j.onAfterReloadData(a, b, d), j.onPagesChanged(c, b, d)
        }

        b.$filterRow = {}, b.$loading = !1, b.hasOwnProperty("params") || (b.params = new c(!0)), b.params.settings().$scope = b;
        var m = function () {
            var a = 0;
            return function (b, c) {
                d.cancel(a), a = d(b, c)
            }
        }();
        b.$watch("params", function (a, b) {
            //监听消息队列，“params”一有改变即会加入到$watch队列里面并执行此function
            a !== b && a && a.reload()
        }, !1), b.$watch("params.isDataReloadRequired()", k), this.compileDirectiveTemplates = function () {
            if (!h.hasClass("ng-table")) {
                b.templates = {
                    header: g.templateHeader ? g.templateHeader : "ng-table/header.html",
                    pagination: g.templatePagination ? g.templatePagination : "ng-table/pager.html"
                }, h.addClass("ng-table");
                var c = null, d = !1;
                angular.forEach(h.children(), function (a) {
                    "THEAD" === a.tagName && (d = !0)
                }), d || (c = angular.element(document.createElement("thead")).attr("ng-include", "templates.header"), h.prepend(c));
                var e = angular.element(document.createElement("div")).attr({
                    "ng-table-pagination": "params",
                    "template-url": "templates.pagination"
                });
                h.after(e), c && f(c)(b), f(e)(b)
            }
        }, this.loadFilterData = function (c) {
            angular.forEach(c, function (c) {
                var d;
                return d = c.filterData(b, {$column: c}), d ? angular.isObject(d) && angular.isObject(d.promise) ? (delete c.filterData, d.promise.then(function (b) {
                    angular.isArray(b) || angular.isFunction(b) || angular.isObject(b) ? angular.isArray(b) && b.unshift({
                        title: "",
                        id: ""
                    }) : b = [], c.data = b
                })) : c.data = d : void delete c.filterData
            })
        }, this.buildColumns = function (a) {
            return a.map(function (a) {
                return i.buildColumn(a, b)
            })
        }, this.parseNgTableDynamicExpr = function (a) {
            if (!a || a.indexOf(" with ") > -1) {
                var b = a.split(/\s+with\s+/);
                return {tableParams: b[0], columns: b[1]}
            }
            throw new Error("Parse error (expected example: ng-table-dynamic='tableParams with cols')")
        }, this.setupBindingsToInternalScope = function (c) {
            var d = e(c);
            b.$watch(d, function (c) {
                angular.isUndefined(c) || (b.paramsModel = d, b.params = c)
            }, !1), g.showFilter && b.$parent.$watch(g.showFilter, function (a) {
                b.show_filter = a
            }), g.disableFilter && b.$parent.$watch(g.disableFilter, function (a) {
                b.$filterRow.disabled = a
            })
        }, l()
    }]), app.factory("ngTableColumn", [function () {
        function b(b, d) {
            var e = Object.create(b);
            for (var f in c)void 0 === e[f] && (e[f] = c[f]), angular.isFunction(e[f]) || !function (a) {
                e[a] = function () {
                    return b[a]
                }
            }(f), function (a) {
                var c = e[a];
                e[a] = function () {
                    return 0 === arguments.length ? c.call(b, d) : c.apply(b, arguments)
                }
            }(f);
            return e
        }

        var c = {
            "class": function () {
                return ""
            }, filter: function () {
                return !1
            }, filterData: angular.noop, headerTemplateURL: function () {
                return !1
            }, headerTitle: function () {
                return ""
            }, sortable: function () {
                return !1
            }, show: function () {
                return !0
            }, title: function () {
                return ""
            }, titleAlt: function () {
                return ""
            }
        };
        return {buildColumn: b}
    }]), app.directive("ngTable", ["$q", "$parse", function (b, c) {
        return {
            restrict: "A", priority: 1001, scope: !0, controller: "ngTableController", compile: function (b) {
                var d = [], e = 0, f = null;
                return angular.forEach(angular.element(b.find("tr")), function (b) {
                    b = angular.element(b), b.hasClass("ng-table-group") || f || (f = b)
                }), f ? (angular.forEach(f.find("td"), function (b) {
                    var f = angular.element(b);
                    if (!f.attr("ignore-cell") || "true" !== f.attr("ignore-cell")) {
                        var g = function (a) {
                            return f.attr("x-data-" + a) || f.attr("data-" + a) || f.attr(a)
                        }, h = function (b) {
                            var e = g(b);
                            return e ? function (b, f) {
                                return c(e)(b, angular.extend(f || {}, {$columns: d}))
                            } : void 0
                        }, i = g("title-alt") || g("title");
                        i && f.attr("data-title-text", "{{" + i + "}}"), d.push({
                            id: e++,
                            title: h("title"),
                            titleAlt: h("title-alt"),
                            headerTitle: h("header-title"),
                            sortable: h("sortable"),
                            "class": h("header-class"),
                            filter: h("filter"),
                            headerTemplateURL: h("header"),
                            filterData: h("filter-data"),
                            show: f.attr("ng-if") ? function (a) {
                                return c(f.attr("ng-if"))(a)
                            } : void 0
                        })
                    }
                }), function (a, b, c, e) {
                    a.$columns = d = e.buildColumns(d), e.setupBindingsToInternalScope(c.ngTable), e.loadFilterData(d), e.compileDirectiveTemplates()
                }) : void 0
            }
        }
    }]), app.directive("ngTableDynamic", ["$parse", function () {
        return {
            restrict: "A", priority: 1001, scope: !0, controller: "ngTableController", compile: function (b) {
                var c;
                return angular.forEach(angular.element(b.find("tr")), function (b) {
                    b = angular.element(b), b.hasClass("ng-table-group") || c || (c = b)
                }), c ? (angular.forEach(c.find("td"), function (b) {
                    var c = angular.element(b), d = function (a) {
                        return c.attr("x-data-" + a) || c.attr("data-" + a) || c.attr(a)
                    }, e = d("title");
                    e || c.attr("data-title-text", "{{$columns[$index].titleAlt(this) || $columns[$index].title(this)}}");
                    var f = c.attr("ng-if");
                    f || c.attr("ng-if", "$columns[$index].show(this)")
                }), function (a, b, c, d) {
                    var e = d.parseNgTableDynamicExpr(c.ngTableDynamic);
                    d.setupBindingsToInternalScope(e.tableParams), d.compileDirectiveTemplates(), a.$watchCollection(e.columns, function (b) {
                        a.$columns = d.buildColumns(b), d.loadFilterData(a.$columns)
                    })
                }) : void 0
            }
        }
    }]), function () {
        function b() {
            var a = {
                restrict: "E",
                replace: !0,
                templateUrl: "ng-table/filterRow.html",
                scope: !0,
                controller: "ngTableFilterRowController"
            };
            return a
        }

        angular.module("ngTable").directive("ngTableFilterRow", b), b.$inject = []
    }(), function () {
        function b() {
            var a = {
                restrict: "E",
                replace: !0,
                templateUrl: "ng-table/sorterRow.html",
                scope: !0,
                controller: "ngTableSorterRowController"
            };
            return a
        }

        angular.module("ngTable").directive("ngTableSorterRow", b), b.$inject = []
    }(), app.directive("ngTablePagination", ["$compile", "ngTableEventsChannel", function (b, c) {
        return {
            restrict: "A",
            scope: {params: "=ngTablePagination", templateUrl: "="},
            replace: !1,
            link: function (d, e) {
                c.onAfterReloadData(function (a) {
                    d.pages = a.generatePagesArray()
                }, d, function (a) {
                    return a === d.params
                }), d.$watch("templateUrl", function (c) {
                    if (!angular.isUndefined(c)) {
                        var f = angular.element(document.createElement("div"));
                        f.attr({"ng-include": "templateUrl"}), e.append(f), b(f)(d)
                    }
                })
            }
        }
    }]), angular.module("ngTable").run(["$templateCache", function (a) {
        a.put("ng-table/filterRow.html", '<tr ng-show="show_filter" class="ng-table-filters"> <th data-title-text="{{$column.titleAlt(this) || $column.title(this)}}" ng-repeat="$column in $columns" ng-if="$column.show(this)" class="filter"> <div ng-repeat="(name, filter) in $column.filter(this)"> <div ng-include="config.getTemplateUrl(filter)"></div> </div> </th> </tr> '), a.put("ng-table/filters/number.html", '<input type="number" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control"/> '), a.put("ng-table/filters/select-multiple.html", '<select ng-options="data.id as data.title for data in $column.data" ng-disabled="$filterRow.disabled" multiple ng-multiple="true" ng-model="params.filter()[name]" class="filter filter-select-multiple form-control" name="{{name}}"> </select> '), a.put("ng-table/filters/select.html", '<select ng-options="data.id as data.title for data in $column.data" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="filter filter-select form-control" name="{{name}}"> <option style="display:none" value=""></option> </select> '), a.put("ng-table/filters/text.html", '<input type="text" name="{{name}}" ng-disabled="$filterRow.disabled" ng-model="params.filter()[name]" class="input-filter form-control"/> '), a.put("ng-table/header.html", "<ng-table-sorter-row></ng-table-sorter-row> <ng-table-filter-row></ng-table-filter-row> "), a.put("ng-table/pager.html", '<div class="ng-cloak ng-table-pager" ng-if="params.data.length"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active && !page.current, \'active\': page.current}" ng-repeat="page in pages" ng-switch="page.type"> <angular ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</angular> <angular ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></angular> <angular ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></angular> <angular ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</angular> <angular ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></angular> <angular ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</angular> </li> </ul> </div> '), a.put("ng-table/sorterRow.html", '<tr> <th title="{{$column.headerTitle(this)}}" ng-repeat="$column in $columns" ng-class="{ \'sortable\': $column.sortable(this), \'sort-asc\': params.sorting()[$column.sortable(this)]==\'asc\', \'sort-desc\': params.sorting()[$column.sortable(this)]==\'desc\' }" ng-click="sortBy($column, $event)" ng-if="$column.show(this)" ng-init="template=$column.headerTemplateURL(this)" class="header {{$column.class(this)}}"> <div ng-if="!template" class="ng-table-header" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'div\'}"> <span ng-bind="$column.title(this)" ng-class="{\'sort-indicator\': params.settings().sortingIndicator==\'span\'}"></span> </div> <div ng-if="template" ng-include="template"></div> </th> </tr> ')
    }]), app
});
//# sourceMappingURL=ng-table.min.js.map
/* Chosen v1.4.2 | (c) 2011-2015 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
* jQuery Chosen Plugin 是一个 jQuery 插件，用来将网页中的下拉框进行功能扩展和美化。可实现对下拉框的搜索，多个标签编辑等功能
* */
(function () {
    var a, AbstractChosen, Chosen, SelectParser, b, c = {}.hasOwnProperty, d = function (a, b) {
        function d() {
            this.constructor = a
        }

        for (var e in b)c.call(b, e) && (a[e] = b[e]);
        return d.prototype = b.prototype, a.prototype = new d, a.__super__ = b.prototype, a
    };
    SelectParser = function () {
        function SelectParser() {
            this.options_index = 0, this.parsed = []
        }

        return SelectParser.prototype.add_node = function (a) {
            return "OPTGROUP" === a.nodeName.toUpperCase() ? this.add_group(a) : this.add_option(a)
        }, SelectParser.prototype.add_group = function (a) {
            var b, c, d, e, f, g;
            for (b = this.parsed.length, this.parsed.push({
                array_index: b,
                group: !0,
                label: this.escapeExpression(a.label),
                title: a.title ? a.title : void 0,
                children: 0,
                disabled: a.disabled,
                classes: a.className
            }), f = a.childNodes, g = [], d = 0, e = f.length; e > d; d++)c = f[d], g.push(this.add_option(c, b, a.disabled));
            return g
        }, SelectParser.prototype.add_option = function (a, b, c) {
            return "OPTION" === a.nodeName.toUpperCase() ? ("" !== a.text ? (null != b && (this.parsed[b].children += 1), this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                value: a.value,
                text: a.text,
                html: a.innerHTML,
                title: a.title ? a.title : void 0,
                selected: a.selected,
                disabled: c === !0 ? c : a.disabled,
                group_array_index: b,
                group_label: null != b ? this.parsed[b].label : null,
                classes: a.className,
                style: a.style.cssText
            })) : this.parsed.push({
                array_index: this.parsed.length,
                options_index: this.options_index,
                empty: !0
            }), this.options_index += 1) : void 0
        }, SelectParser.prototype.escapeExpression = function (a) {
            var b, c;
            return null == a || a === !1 ? "" : /[\&\<\>\"\'\`]/.test(a) ? (b = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            }, c = /&(?!\w+;)|[\<\>\"\'\`]/g, a.replace(c, function (a) {
                return b[a] || "&amp;"
            })) : a
        }, SelectParser
    }(), SelectParser.select_to_array = function (a) {
        var b, c, d, e, f;
        for (c = new SelectParser, f = a.childNodes, d = 0, e = f.length; e > d; d++)b = f[d], c.add_node(b);
        return c.parsed
    }, AbstractChosen = function () {
        function AbstractChosen(a, b) {
            this.form_field = a, this.options = null != b ? b : {}, AbstractChosen.browser_is_supported() && (this.is_multiple = this.form_field.multiple, this.set_default_text(), this.set_default_values(), this.setup(), this.set_up_html(), this.register_observers(), this.on_ready())
        }

        return AbstractChosen.prototype.set_default_values = function () {
            var a = this;
            return this.click_test_action = function (b) {
                return a.test_active_click(b)
            }, this.activate_action = function (b) {
                return a.activate_field(b)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.allow_single_deselect = null != this.options.allow_single_deselect && null != this.form_field.options[0] && "" === this.form_field.options[0].text ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.enable_split_word_search = null != this.options.enable_split_word_search ? this.options.enable_split_word_search : !0, this.group_search = null != this.options.group_search ? this.options.group_search : !0, this.search_contains = this.options.search_contains || !1, this.single_backstroke_delete = null != this.options.single_backstroke_delete ? this.options.single_backstroke_delete : !0, this.max_selected_options = this.options.max_selected_options || 1 / 0, this.inherit_select_classes = this.options.inherit_select_classes || !1, this.display_selected_options = null != this.options.display_selected_options ? this.options.display_selected_options : !0, this.display_disabled_options = null != this.options.display_disabled_options ? this.options.display_disabled_options : !0, this.include_group_label_in_selected = this.options.include_group_label_in_selected || !1
        }, AbstractChosen.prototype.set_default_text = function () {
            return this.default_text = this.form_field.getAttribute("data-placeholder") ? this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text : this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text, this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text
        }, AbstractChosen.prototype.choice_label = function (a) {
            return this.include_group_label_in_selected && null != a.group_label ? "<b class='group-name'>" + a.group_label + "</b>" + a.html : a.html
        }, AbstractChosen.prototype.mouse_enter = function () {
            return this.mouse_on_container = !0
        }, AbstractChosen.prototype.mouse_leave = function () {
            return this.mouse_on_container = !1
        }, AbstractChosen.prototype.input_focus = function () {
            var a = this;
            if (this.is_multiple) {
                if (!this.active_field)return setTimeout(function () {
                    return a.container_mousedown()
                }, 50)
            } else if (!this.active_field)return this.activate_field()
        }, AbstractChosen.prototype.input_blur = function () {
            var a = this;
            return this.mouse_on_container ? void 0 : (this.active_field = !1, setTimeout(function () {
                return a.blur_test()
            }, 100))
        }, AbstractChosen.prototype.results_option_build = function (a) {
            var b, c, d, e, f;
            for (b = "", f = this.results_data, d = 0, e = f.length; e > d; d++)c = f[d], b += c.group ? this.result_add_group(c) : this.result_add_option(c), (null != a ? a.first : void 0) && (c.selected && this.is_multiple ? this.choice_build(c) : c.selected && !this.is_multiple && this.single_set_selected_text(this.choice_label(c)));
            return b
        }, AbstractChosen.prototype.result_add_option = function (a) {
            var b, c;
            return a.search_match && this.include_option_in_results(a) ? (b = [], a.disabled || a.selected && this.is_multiple || b.push("active-result"), !a.disabled || a.selected && this.is_multiple || b.push("disabled-result"), a.selected && b.push("result-selected"), null != a.group_array_index && b.push("group-option"), "" !== a.classes && b.push(a.classes), c = document.createElement("li"), c.className = b.join(" "), c.style.cssText = a.style, c.setAttribute("data-option-array-index", a.array_index), c.innerHTML = a.search_text, a.title && (c.title = a.title), this.outerHTML(c)) : ""
        }, AbstractChosen.prototype.result_add_group = function (a) {
            var b, c;
            return (a.search_match || a.group_match) && a.active_options > 0 ? (b = [], b.push("group-result"), a.classes && b.push(a.classes), c = document.createElement("li"), c.className = b.join(" "), c.innerHTML = a.search_text, a.title && (c.title = a.title), this.outerHTML(c)) : ""
        }, AbstractChosen.prototype.results_update_field = function () {
            return this.set_default_text(), this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.results_build(), this.results_showing ? this.winnow_results() : void 0
        }, AbstractChosen.prototype.reset_single_select_options = function () {
            var a, b, c, d, e;
            for (d = this.results_data, e = [], b = 0, c = d.length; c > b; b++)a = d[b], e.push(a.selected ? a.selected = !1 : void 0);
            return e
        }, AbstractChosen.prototype.results_toggle = function () {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, AbstractChosen.prototype.results_search = function () {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, AbstractChosen.prototype.winnow_results = function () {
            var a, b, c, d, e, f, g, h, i, j, k, l;
            for (this.no_results_clear(), d = 0, f = this.get_search_text(), a = f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), i = new RegExp(a, "i"), c = this.get_search_regex(a), l = this.results_data, j = 0, k = l.length; k > j; j++)b = l[j], b.search_match = !1, e = null, this.include_option_in_results(b) && (b.group && (b.group_match = !1, b.active_options = 0), null != b.group_array_index && this.results_data[b.group_array_index] && (e = this.results_data[b.group_array_index], 0 === e.active_options && e.search_match && (d += 1), e.active_options += 1), b.search_text = b.group ? b.label : b.html, (!b.group || this.group_search) && (b.search_match = this.search_string_match(b.search_text, c), b.search_match && !b.group && (d += 1), b.search_match ? (f.length && (g = b.search_text.search(i), h = b.search_text.substr(0, g + f.length) + "</em>" + b.search_text.substr(g + f.length), b.search_text = h.substr(0, g) + "<em>" + h.substr(g)), null != e && (e.group_match = !0)) : null != b.group_array_index && this.results_data[b.group_array_index].search_match && (b.search_match = !0)));
            return this.result_clear_highlight(), 1 > d && f.length ? (this.update_results_content(""), this.no_results(f)) : (this.update_results_content(this.results_option_build()), this.winnow_results_set_highlight())
        }, AbstractChosen.prototype.get_search_regex = function (a) {
            var b;
            return b = this.search_contains ? "" : "^", new RegExp(b + a, "i")
        }, AbstractChosen.prototype.search_string_match = function (a, b) {
            var c, d, e, f;
            if (b.test(a))return !0;
            if (this.enable_split_word_search && (a.indexOf(" ") >= 0 || 0 === a.indexOf("[")) && (d = a.replace(/\[|\]/g, "").split(" "), d.length))for (e = 0, f = d.length; f > e; e++)if (c = d[e], b.test(c))return !0
        }, AbstractChosen.prototype.choices_count = function () {
            var a, b, c, d;
            if (null != this.selected_option_count)return this.selected_option_count;
            for (this.selected_option_count = 0, d = this.form_field.options, b = 0, c = d.length; c > b; b++)a = d[b], a.selected && (this.selected_option_count += 1);
            return this.selected_option_count
        }, AbstractChosen.prototype.choices_click = function (a) {
            return a.preventDefault(), this.results_showing || this.is_disabled ? void 0 : this.results_show()
        }, AbstractChosen.prototype.keyup_checker = function (a) {
            var b, c;
            switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), b) {
                case 8:
                    if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0)return this.keydown_backstroke();
                    if (!this.pending_backstroke)return this.result_clear_highlight(), this.results_search();
                    break;
                case 13:
                    if (a.preventDefault(), this.results_showing)return this.result_select(a);
                    break;
                case 27:
                    return this.results_showing && this.results_hide(), !0;
                case 9:
                case 38:
                case 40:
                case 16:
                case 91:
                case 17:
                    break;
                default:
                    return this.results_search()
            }
        }, AbstractChosen.prototype.clipboard_event_checker = function () {
            var a = this;
            return setTimeout(function () {
                return a.results_search()
            }, 50)
        }, AbstractChosen.prototype.container_width = function () {
            return null != this.options.width ? this.options.width : "" + this.form_field.offsetWidth + "px"
        }, AbstractChosen.prototype.include_option_in_results = function (a) {
            return this.is_multiple && !this.display_selected_options && a.selected ? !1 : !this.display_disabled_options && a.disabled ? !1 : a.empty ? !1 : !0
        }, AbstractChosen.prototype.search_results_touchstart = function (a) {
            return this.touch_started = !0, this.search_results_mouseover(a)
        }, AbstractChosen.prototype.search_results_touchmove = function (a) {
            return this.touch_started = !1, this.search_results_mouseout(a)
        }, AbstractChosen.prototype.search_results_touchend = function (a) {
            return this.touch_started ? this.search_results_mouseup(a) : void 0
        }, AbstractChosen.prototype.outerHTML = function (a) {
            var b;
            return a.outerHTML ? a.outerHTML : (b = document.createElement("div"), b.appendChild(a), b.innerHTML)
        }, AbstractChosen.browser_is_supported = function () {
            return "Microsoft Internet Explorer" === window.navigator.appName ? document.documentMode >= 8 : /iP(od|hone)/i.test(window.navigator.userAgent) ? !1 : /Android/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent) ? !1 : !0
        }, AbstractChosen.default_multiple_text = "Select Some Options", AbstractChosen.default_single_text = "Select an Option", AbstractChosen.default_no_result_text = "No results match", AbstractChosen
    }(), a = jQuery, a.fn.extend({
        chosen: function (b) {
            return AbstractChosen.browser_is_supported() ? this.each(function () {
                var c, d;
                c = a(this), d = c.data("chosen"), "destroy" === b && d instanceof Chosen ? d.destroy() : d instanceof Chosen || c.data("chosen", new Chosen(this, b))
            }) : this
        }
    }), Chosen = function (c) {
        function Chosen() {
            return b = Chosen.__super__.constructor.apply(this, arguments)
        }

        return d(Chosen, c), Chosen.prototype.setup = function () {
            return this.form_field_jq = a(this.form_field), this.current_selectedIndex = this.form_field.selectedIndex, this.is_rtl = this.form_field_jq.hasClass("chosen-rtl")
        }, Chosen.prototype.set_up_html = function () {
            var b, c;
            return b = ["chosen-container"], b.push("chosen-container-" + (this.is_multiple ? "multi" : "single")), this.inherit_select_classes && this.form_field.className && b.push(this.form_field.className), this.is_rtl && b.push("chosen-rtl"), c = {
                "class": b.join(" "),
                style: "width: " + this.container_width() + ";",
                title: this.form_field.title
            }, this.form_field.id.length && (c.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"), this.container = a("<div />", c), this.container.html(this.is_multiple ? '<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>' : '<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'), this.form_field_jq.hide().after(this.container), this.dropdown = this.container.find("div.chosen-drop").first(), this.search_field = this.container.find("input").first(), this.search_results = this.container.find("ul.chosen-results").first(), this.search_field_scale(), this.search_no_results = this.container.find("li.no-results").first(), this.is_multiple ? (this.search_choices = this.container.find("ul.chosen-choices").first(), this.search_container = this.container.find("li.search-field").first()) : (this.search_container = this.container.find("div.chosen-search").first(), this.selected_item = this.container.find(".chosen-single").first()), this.results_build(), this.set_tab_index(), this.set_label_behavior()
        }, Chosen.prototype.on_ready = function () {
            return this.form_field_jq.trigger("chosen:ready", {chosen: this})
        }, Chosen.prototype.register_observers = function () {
            var a = this;
            return this.container.bind("touchstart.chosen", function (b) {
                return a.container_mousedown(b), b.preventDefault()
            }), this.container.bind("touchend.chosen", function (b) {
                return a.container_mouseup(b), b.preventDefault()
            }), this.container.bind("mousedown.chosen", function (b) {
                a.container_mousedown(b)
            }), this.container.bind("mouseup.chosen", function (b) {
                a.container_mouseup(b)
            }), this.container.bind("mouseenter.chosen", function (b) {
                a.mouse_enter(b)
            }), this.container.bind("mouseleave.chosen", function (b) {
                a.mouse_leave(b)
            }), this.search_results.bind("mouseup.chosen", function (b) {
                a.search_results_mouseup(b)
            }), this.search_results.bind("mouseover.chosen", function (b) {
                a.search_results_mouseover(b)
            }), this.search_results.bind("mouseout.chosen", function (b) {
                a.search_results_mouseout(b)
            }), this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen", function (b) {
                a.search_results_mousewheel(b)
            }), this.search_results.bind("touchstart.chosen", function (b) {
                a.search_results_touchstart(b)
            }), this.search_results.bind("touchmove.chosen", function (b) {
                a.search_results_touchmove(b)
            }), this.search_results.bind("touchend.chosen", function (b) {
                a.search_results_touchend(b)
            }), this.form_field_jq.bind("chosen:updated.chosen", function (b) {
                a.results_update_field(b)
            }), this.form_field_jq.bind("chosen:activate.chosen", function (b) {
                a.activate_field(b)
            }), this.form_field_jq.bind("chosen:open.chosen", function (b) {
                a.container_mousedown(b)
            }), this.form_field_jq.bind("chosen:close.chosen", function (b) {
                a.input_blur(b)
            }), this.search_field.bind("blur.chosen", function (b) {
                a.input_blur(b)
            }), this.search_field.bind("keyup.chosen", function (b) {
                a.keyup_checker(b)
            }), this.search_field.bind("keydown.chosen", function (b) {
                a.keydown_checker(b)
            }), this.search_field.bind("focus.chosen", function (b) {
                a.input_focus(b)
            }), this.search_field.bind("cut.chosen", function (b) {
                a.clipboard_event_checker(b)
            }), this.search_field.bind("paste.chosen", function (b) {
                a.clipboard_event_checker(b)
            }), this.is_multiple ? this.search_choices.bind("click.chosen", function (b) {
                a.choices_click(b)
            }) : this.container.bind("click.chosen", function (a) {
                a.preventDefault()
            })
        }, Chosen.prototype.destroy = function () {
            return a(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.search_field[0].tabIndex && (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex), this.container.remove(), this.form_field_jq.removeData("chosen"), this.form_field_jq.show()
        }, Chosen.prototype.search_field_disabled = function () {
            return this.is_disabled = this.form_field_jq[0].disabled, this.is_disabled ? (this.container.addClass("chosen-disabled"), this.search_field[0].disabled = !0, this.is_multiple || this.selected_item.unbind("focus.chosen", this.activate_action), this.close_field()) : (this.container.removeClass("chosen-disabled"), this.search_field[0].disabled = !1, this.is_multiple ? void 0 : this.selected_item.bind("focus.chosen", this.activate_action))
        }, Chosen.prototype.container_mousedown = function (b) {
            return this.is_disabled || (b && "mousedown" === b.type && !this.results_showing && b.preventDefault(), null != b && a(b.target).hasClass("search-choice-close")) ? void 0 : (this.active_field ? this.is_multiple || !b || a(b.target)[0] !== this.selected_item[0] && !a(b.target).parents("a.chosen-single").length || (b.preventDefault(), this.results_toggle()) : (this.is_multiple && this.search_field.val(""), a(this.container[0].ownerDocument).bind("click.chosen", this.click_test_action), this.results_show()), this.activate_field())
        }, Chosen.prototype.container_mouseup = function (a) {
            return "ABBR" !== a.target.nodeName || this.is_disabled ? void 0 : this.results_reset(a)
        }, Chosen.prototype.search_results_mousewheel = function (a) {
            var b;
            return a.originalEvent && (b = a.originalEvent.deltaY || -a.originalEvent.wheelDelta || a.originalEvent.detail), null != b ? (a.preventDefault(), "DOMMouseScroll" === a.type && (b = 40 * b), this.search_results.scrollTop(b + this.search_results.scrollTop())) : void 0
        }, Chosen.prototype.blur_test = function () {
            return !this.active_field && this.container.hasClass("chosen-container-active") ? this.close_field() : void 0
        }, Chosen.prototype.close_field = function () {
            return a(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action), this.active_field = !1, this.results_hide(), this.container.removeClass("chosen-container-active"), this.clear_backstroke(), this.show_search_field_default(), this.search_field_scale()
        }, Chosen.prototype.activate_field = function () {
            return this.container.addClass("chosen-container-active"), this.active_field = !0, this.search_field.val(this.search_field.val()), this.search_field.focus()
        }, Chosen.prototype.test_active_click = function (b) {
            var c;
            return c = a(b.target).closest(".chosen-container"), c.length && this.container[0] === c[0] ? this.active_field = !0 : this.close_field()
        }, Chosen.prototype.results_build = function () {
            return this.parsing = !0, this.selected_option_count = null, this.results_data = SelectParser.select_to_array(this.form_field), this.is_multiple ? this.search_choices.find("li.search-choice").remove() : this.is_multiple || (this.single_set_selected_text(), this.disable_search || this.form_field.options.length <= this.disable_search_threshold ? (this.search_field[0].readOnly = !0, this.container.addClass("chosen-container-single-nosearch")) : (this.search_field[0].readOnly = !1, this.container.removeClass("chosen-container-single-nosearch"))), this.update_results_content(this.results_option_build({first: !0})), this.search_field_disabled(), this.show_search_field_default(), this.search_field_scale(), this.parsing = !1
        }, Chosen.prototype.result_do_highlight = function (a) {
            var b, c, d, e, f;
            if (a.length) {
                if (this.result_clear_highlight(), this.result_highlight = a, this.result_highlight.addClass("highlighted"), d = parseInt(this.search_results.css("maxHeight"), 10), f = this.search_results.scrollTop(), e = d + f, c = this.result_highlight.position().top + this.search_results.scrollTop(), b = c + this.result_highlight.outerHeight(), b >= e)return this.search_results.scrollTop(b - d > 0 ? b - d : 0);
                if (f > c)return this.search_results.scrollTop(c)
            }
        }, Chosen.prototype.result_clear_highlight = function () {
            return this.result_highlight && this.result_highlight.removeClass("highlighted"), this.result_highlight = null
        }, Chosen.prototype.results_show = function () {
            return this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.container.addClass("chosen-with-drop"), this.results_showing = !0, this.search_field.focus(), this.search_field.val(this.search_field.val()), this.winnow_results(), this.form_field_jq.trigger("chosen:showing_dropdown", {chosen: this}))
        }, Chosen.prototype.update_results_content = function (a) {
            return this.search_results.html(a)
        }, Chosen.prototype.results_hide = function () {
            return this.results_showing && (this.result_clear_highlight(), this.container.removeClass("chosen-with-drop"), this.form_field_jq.trigger("chosen:hiding_dropdown", {chosen: this})), this.results_showing = !1
        }, Chosen.prototype.set_tab_index = function () {
            var a;
            return this.form_field.tabIndex ? (a = this.form_field.tabIndex, this.form_field.tabIndex = -1, this.search_field[0].tabIndex = a) : void 0
        }, Chosen.prototype.set_label_behavior = function () {
            var b = this;
            return this.form_field_label = this.form_field_jq.parents("label"), !this.form_field_label.length && this.form_field.id.length && (this.form_field_label = a("label[for='" + this.form_field.id + "']")), this.form_field_label.length > 0 ? this.form_field_label.bind("click.chosen", function (a) {
                return b.is_multiple ? b.container_mousedown(a) : b.activate_field()
            }) : void 0
        }, Chosen.prototype.show_search_field_default = function () {
            return this.is_multiple && this.choices_count() < 1 && !this.active_field ? (this.search_field.val(this.default_text), this.search_field.addClass("default")) : (this.search_field.val(""), this.search_field.removeClass("default"))
        }, Chosen.prototype.search_results_mouseup = function (b) {
            var c;
            return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c.length ? (this.result_highlight = c, this.result_select(b), this.search_field.focus()) : void 0
        }, Chosen.prototype.search_results_mouseover = function (b) {
            var c;
            return c = a(b.target).hasClass("active-result") ? a(b.target) : a(b.target).parents(".active-result").first(), c ? this.result_do_highlight(c) : void 0
        }, Chosen.prototype.search_results_mouseout = function (b) {
            return a(b.target).hasClass("active-result") ? this.result_clear_highlight() : void 0
        }, Chosen.prototype.choice_build = function (b) {
            var c, d, e = this;
            return c = a("<li />", {"class": "search-choice"}).html("<span>" + this.choice_label(b) + "</span>"), b.disabled ? c.addClass("search-choice-disabled") : (d = a("<a />", {
                "class": "search-choice-close",
                "data-option-array-index": b.array_index
            }), d.bind("click.chosen", function (a) {
                return e.choice_destroy_link_click(a)
            }), c.append(d)), this.search_container.before(c)
        }, Chosen.prototype.choice_destroy_link_click = function (b) {
            return b.preventDefault(), b.stopPropagation(), this.is_disabled ? void 0 : this.choice_destroy(a(b.target))
        }, Chosen.prototype.choice_destroy = function (a) {
            return this.result_deselect(a[0].getAttribute("data-option-array-index")) ? (this.show_search_field_default(), this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1 && this.results_hide(), a.parents("li").first().remove(), this.search_field_scale()) : void 0
        }, Chosen.prototype.results_reset = function () {
            return this.reset_single_select_options(), this.form_field.options[0].selected = !0, this.single_set_selected_text(), this.show_search_field_default(), this.results_reset_cleanup(), this.form_field_jq.trigger("change"), this.active_field ? this.results_hide() : void 0
        }, Chosen.prototype.results_reset_cleanup = function () {
            return this.current_selectedIndex = this.form_field.selectedIndex, this.selected_item.find("abbr").remove()
        }, Chosen.prototype.result_select = function (a) {
            var b, c;
            return this.result_highlight ? (b = this.result_highlight, this.result_clear_highlight(), this.is_multiple && this.max_selected_options <= this.choices_count() ? (this.form_field_jq.trigger("chosen:maxselected", {chosen: this}), !1) : (this.is_multiple ? b.removeClass("active-result") : this.reset_single_select_options(), b.addClass("result-selected"), c = this.results_data[b[0].getAttribute("data-option-array-index")], c.selected = !0, this.form_field.options[c.options_index].selected = !0, this.selected_option_count = null, this.is_multiple ? this.choice_build(c) : this.single_set_selected_text(this.choice_label(c)), (a.metaKey || a.ctrlKey) && this.is_multiple || this.results_hide(), this.search_field.val(""), (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) && this.form_field_jq.trigger("change", {selected: this.form_field.options[c.options_index].value}), this.current_selectedIndex = this.form_field.selectedIndex, a.preventDefault(), this.search_field_scale())) : void 0
        }, Chosen.prototype.single_set_selected_text = function (a) {
            return null == a && (a = this.default_text), a === this.default_text ? this.selected_item.addClass("chosen-default") : (this.single_deselect_control_build(), this.selected_item.removeClass("chosen-default")), this.selected_item.find("span").html(a)
        }, Chosen.prototype.result_deselect = function (a) {
            var b;
            return b = this.results_data[a], this.form_field.options[b.options_index].disabled ? !1 : (b.selected = !1, this.form_field.options[b.options_index].selected = !1, this.selected_option_count = null, this.result_clear_highlight(), this.results_showing && this.winnow_results(), this.form_field_jq.trigger("change", {deselected: this.form_field.options[b.options_index].value}), this.search_field_scale(), !0)
        }, Chosen.prototype.single_deselect_control_build = function () {
            return this.allow_single_deselect ? (this.selected_item.find("abbr").length || this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'), this.selected_item.addClass("chosen-single-with-deselect")) : void 0
        }, Chosen.prototype.get_search_text = function () {
            return a("<div/>").text(a.trim(this.search_field.val())).html()
        }, Chosen.prototype.winnow_results_set_highlight = function () {
            var a, b;
            return b = this.is_multiple ? [] : this.search_results.find(".result-selected.active-result"), a = b.length ? b.first() : this.search_results.find(".active-result").first(), null != a ? this.result_do_highlight(a) : void 0
        }, Chosen.prototype.no_results = function (b) {
            var c;
            return c = a('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>'), c.find("span").first().html(b), this.search_results.append(c), this.form_field_jq.trigger("chosen:no_results", {chosen: this})
        }, Chosen.prototype.no_results_clear = function () {
            return this.search_results.find(".no-results").remove()
        }, Chosen.prototype.keydown_arrow = function () {
            var a;
            return this.results_showing && this.result_highlight ? (a = this.result_highlight.nextAll("li.active-result").first()) ? this.result_do_highlight(a) : void 0 : this.results_show()
        }, Chosen.prototype.keyup_arrow = function () {
            var a;
            return this.results_showing || this.is_multiple ? this.result_highlight ? (a = this.result_highlight.prevAll("li.active-result"), a.length ? this.result_do_highlight(a.first()) : (this.choices_count() > 0 && this.results_hide(), this.result_clear_highlight())) : void 0 : this.results_show()
        }, Chosen.prototype.keydown_backstroke = function () {
            var a;
            return this.pending_backstroke ? (this.choice_destroy(this.pending_backstroke.find("a").first()), this.clear_backstroke()) : (a = this.search_container.siblings("li.search-choice").last(), a.length && !a.hasClass("search-choice-disabled") ? (this.pending_backstroke = a, this.single_backstroke_delete ? this.keydown_backstroke() : this.pending_backstroke.addClass("search-choice-focus")) : void 0)
        }, Chosen.prototype.clear_backstroke = function () {
            return this.pending_backstroke && this.pending_backstroke.removeClass("search-choice-focus"), this.pending_backstroke = null
        }, Chosen.prototype.keydown_checker = function (a) {
            var b, c;
            switch (b = null != (c = a.which) ? c : a.keyCode, this.search_field_scale(), 8 !== b && this.pending_backstroke && this.clear_backstroke(), b) {
                case 8:
                    this.backstroke_length = this.search_field.val().length;
                    break;
                case 9:
                    this.results_showing && !this.is_multiple && this.result_select(a), this.mouse_on_container = !1;
                    break;
                case 13:
                    this.results_showing && a.preventDefault();
                    break;
                case 32:
                    this.disable_search && a.preventDefault();
                    break;
                case 38:
                    a.preventDefault(), this.keyup_arrow();
                    break;
                case 40:
                    a.preventDefault(), this.keydown_arrow()
            }
        }, Chosen.prototype.search_field_scale = function () {
            var b, c, d, e, f, g, h, i, j;
            if (this.is_multiple) {
                for (d = 0, h = 0, f = "position:absolute; left: -1000px; top: -1000px; display:none;", g = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"], i = 0, j = g.length; j > i; i++)e = g[i], f += e + ":" + this.search_field.css(e) + ";";
                return b = a("<div />", {style: f}), b.text(this.search_field.val()), a("body").append(b), h = b.width() + 25, b.remove(), c = this.container.outerWidth(), h > c - 10 && (h = c - 10), this.search_field.css({width: h + "px"})
            }
        }, Chosen
    }(AbstractChosen)
}).call(this);

/** *
 * js-utils 2015-09-24
 * 模块工具类,用来初始化各模块视图、自定绑定事件以及其他辅助功能等
 * */
 var JU;
JU = JU || {}, JU.lsGet = function (key, defaultvalue) {
    var value;
    return null == defaultvalue && (defaultvalue = !1), value = localStorage.getItem(key), value ? JSON.parse(value) : defaultvalue
}, JU.lsSet = function (key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
};
var JU;
JU = JU || {}, JU.syncFetch = function (a, b) {
    var c;
    c = new XMLHttpRequest, c.open("GET", chrome.extension.getURL(a), !1), c.onreadystatechange = function () {
        return 4 === this.readyState && this.responseText ? b(this.responseText) : void 0
    };
    try {
        return c.send()
    } catch (d) {
    }
}, JU.I18n = function () {
    function a(a) {
        var b;
        this.locale = a, b = "/_locales/" + this.locale + "/messages.json", JU.syncFetch(b, function (a) {
            return function (b) {
                return a.l10nData = JSON.parse(b)
            }
        }(this))
    }

    return a.prototype.getMessage = function (a, b) {
        var c;
        return null == b && (b = ""), this.l10nData && a in this.l10nData && (c = this.l10nData[a], c.message) ? c.message.replace(/\$\$/g, "$") : b
    }, a
}(), JU.I18n2 = function () {
    function a(a) {
        this.dict = a
    }

    return a.prototype.getMessage = function (a, b) {
        return null == b && (b = a), a in this.dict ? this.dict[a] : b
    }, a
}();
/**
 * State-based routing for AngularJS
 * @version v0.2.15
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"), function (a, b, c) {
    "use strict";
    function d(a, b) {
        return N(new (N(function () {
        }, {prototype: a})), b)
    }

    function e(a) {
        return M(arguments, function (b) {
            b !== a && M(b, function (b, c) {
                a.hasOwnProperty(c) || (a[c] = b)
            })
        }), a
    }

    function f(a, b) {
        var c = [];
        for (var d in a.path) {
            if (a.path[d] !== b.path[d])break;
            c.push(a.path[d])
        }
        return c
    }

    function g(a) {
        if (Object.keys)return Object.keys(a);
        var b = [];
        return M(a, function (a, c) {
            b.push(c)
        }), b
    }

    function h(a, b) {
        if (Array.prototype.indexOf)return a.indexOf(b, Number(arguments[2]) || 0);
        var c = a.length >>> 0, d = Number(arguments[2]) || 0;
        for (d = 0 > d ? Math.ceil(d) : Math.floor(d), 0 > d && (d += c); c > d; d++)if (d in a && a[d] === b)return d;
        return -1
    }

    function i(a, b, c, d) {
        var e, i = f(c, d), j = {}, k = [];
        for (var l in i)if (i[l].params && (e = g(i[l].params), e.length))for (var m in e)h(k, e[m]) >= 0 || (k.push(e[m]), j[e[m]] = a[e[m]]);
        return N({}, j, b)
    }

    function j(a, b, c) {
        if (!c) {
            c = [];
            for (var d in a)c.push(d)
        }
        for (var e = 0; e < c.length; e++) {
            var f = c[e];
            if (a[f] != b[f])return !1
        }
        return !0
    }

    function k(a, b) {
        var c = {};
        return M(a, function (a) {
            c[a] = b[a]
        }), c
    }

    function l(a) {
        var b = {}, c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        return M(c, function (c) {
            c in a && (b[c] = a[c])
        }), b
    }

    function m(a) {
        var b = {}, c = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
        for (var d in a)-1 == h(c, d) && (b[d] = a[d]);
        return b
    }

    function n(a, b) {
        var c = L(a), d = c ? [] : {};
        return M(a, function (a, e) {
            b(a, e) && (d[c ? d.length : e] = a)
        }), d
    }

    function o(a, b) {
        var c = L(a) ? [] : {};
        return M(a, function (a, d) {
            c[d] = b(a, d)
        }), c
    }

    function p(a, b) {
        var d = 1, f = 2, i = {}, j = [], k = i, l = N(a.when(i), {$$promises: i, $$values: i});
        this.study = function (i) {
            function n(a, c) {
                if (s[c] !== f) {
                    if (r.push(c), s[c] === d)throw r.splice(0, h(r, c)), new Error("Cyclic dependency: " + r.join(" -> "));
                    if (s[c] = d, J(a))q.push(c, [function () {
                        return b.get(a)
                    }], j); else {
                        var e = b.annotate(a);
                        M(e, function (a) {
                            a !== c && i.hasOwnProperty(a) && n(i[a], a)
                        }), q.push(c, a, e)
                    }
                    r.pop(), s[c] = f
                }
            }

            function o(a) {
                return K(a) && a.then && a.$$promises
            }

            if (!K(i))throw new Error("'invocables' must be an object");
            var p = g(i || {}), q = [], r = [], s = {};
            return M(i, n), i = r = s = null, function (d, f, g) {
                function h() {
                    --u || (v || e(t, f.$$values), r.$$values = t, r.$$promises = r.$$promises || !0, delete r.$$inheritedValues, n.resolve(t))
                }

                function i(a) {
                    r.$$failure = a, n.reject(a)
                }

                function j(c, e, f) {
                    function j(a) {
                        l.reject(a), i(a)
                    }

                    function k() {
                        if (!H(r.$$failure))try {
                            l.resolve(b.invoke(e, g, t)), l.promise.then(function (a) {
                                t[c] = a, h()
                            }, j)
                        } catch (a) {
                            j(a)
                        }
                    }

                    var l = a.defer(), m = 0;
                    M(f, function (a) {
                        s.hasOwnProperty(a) && !d.hasOwnProperty(a) && (m++, s[a].then(function (b) {
                            t[a] = b, --m || k()
                        }, j))
                    }), m || k(), s[c] = l.promise
                }

                if (o(d) && g === c && (g = f, f = d, d = null), d) {
                    if (!K(d))throw new Error("'locals' must be an object")
                } else d = k;
                if (f) {
                    if (!o(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                } else f = l;
                var n = a.defer(), r = n.promise, s = r.$$promises = {}, t = N({}, d), u = 1 + q.length / 3, v = !1;
                if (H(f.$$failure))return i(f.$$failure), r;
                f.$$inheritedValues && e(t, m(f.$$inheritedValues, p)), N(s, f.$$promises), f.$$values ? (v = e(t, m(f.$$values, p)), r.$$inheritedValues = m(f.$$values, p), h()) : (f.$$inheritedValues && (r.$$inheritedValues = m(f.$$inheritedValues, p)), f.then(h, i));
                for (var w = 0, x = q.length; x > w; w += 3)d.hasOwnProperty(q[w]) ? h() : j(q[w], q[w + 1], q[w + 2]);
                return r
            }
        }, this.resolve = function (a, b, c, d) {
            return this.study(a)(b, c, d)
        }
    }

    function q(a, b, c) {
        this.fromConfig = function (a, b, c) {
            return H(a.template) ? this.fromString(a.template, b) : H(a.templateUrl) ? this.fromUrl(a.templateUrl, b) : H(a.templateProvider) ? this.fromProvider(a.templateProvider, b, c) : null
        }, this.fromString = function (a, b) {
            return I(a) ? a(b) : a
        }, this.fromUrl = function (c, d) {
            return I(c) && (c = c(d)), null == c ? null : a.get(c, {
                cache: b,
                headers: {Accept: "text/html"}
            }).then(function (a) {
                return a.data
            })
        }, this.fromProvider = function (a, b, d) {
            return c.invoke(a, null, d || {params: b})
        }
    }

    function r(a, b, e) {
        function f(b, c, d, e) {
            if (q.push(b), o[b])return o[b];
            if (!/^\w+(-+\w+)*(?:\[\])?$/.test(b))throw new Error("Invalid parameter name '" + b + "' in pattern '" + a + "'");
            if (p[b])throw new Error("Duplicate parameter name '" + b + "' in pattern '" + a + "'");
            return p[b] = new P.Param(b, c, d, e), p[b]
        }

        function g(a, b, c, d) {
            var e = ["", ""], f = a.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
            if (!b)return f;
            switch (c) {
                case!1:
                    e = ["(", ")" + (d ? "?" : "")];
                    break;
                case!0:
                    e = ["?(", ")?"];
                    break;
                default:
                    e = ["(" + c + "|", ")?"]
            }
            return f + e[0] + b + e[1]
        }

        function h(e, f) {
            var g, h, i, j, k;
            return g = e[2] || e[3], k = b.params[g], i = a.substring(m, e.index), h = f ? e[4] : e[4] || ("*" == e[1] ? ".*" : null), j = P.type(h || "string") || d(P.type("string"), {pattern: new RegExp(h, b.caseInsensitive ? "i" : c)}), {
                id: g,
                regexp: h,
                segment: i,
                type: j,
                cfg: k
            }
        }

        b = N({params: {}}, K(b) ? b : {});
        var i, j = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, k = /([:]?)([\w\[\]-]+)|\{([\w\[\]-]+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, l = "^", m = 0, n = this.segments = [], o = e ? e.params : {}, p = this.params = e ? e.params.$$new() : new P.ParamSet, q = [];
        this.source = a;
        for (var r, s, t; (i = j.exec(a)) && (r = h(i, !1), !(r.segment.indexOf("?") >= 0));)s = f(r.id, r.type, r.cfg, "path"), l += g(r.segment, s.type.pattern.source, s.squash, s.isOptional), n.push(r.segment), m = j.lastIndex;
        t = a.substring(m);
        var u = t.indexOf("?");
        if (u >= 0) {
            var v = this.sourceSearch = t.substring(u);
            if (t = t.substring(0, u), this.sourcePath = a.substring(0, m + u), v.length > 0)for (m = 0; i = k.exec(v);)r = h(i, !0), s = f(r.id, r.type, r.cfg, "search"), m = j.lastIndex
        } else this.sourcePath = a, this.sourceSearch = "";
        l += g(t) + (b.strict === !1 ? "/?" : "") + "$", n.push(t), this.regexp = new RegExp(l, b.caseInsensitive ? "i" : c), this.prefix = n[0], this.$$paramNames = q
    }

    function s(a) {
        N(this, a)
    }

    function t() {
        function a(a) {
            return null != a ? a.toString().replace(/\//g, "%2F") : a
        }

        function e(a) {
            return null != a ? a.toString().replace(/%2F/g, "/") : a
        }

        function f() {
            return {strict: p, caseInsensitive: m}
        }

        function i(a) {
            return I(a) || L(a) && I(a[a.length - 1])
        }

        function j() {
            for (; w.length;) {
                var a = w.shift();
                if (a.pattern)throw new Error("You cannot override a type's .pattern at runtime.");
                b.extend(u[a.name], l.invoke(a.def))
            }
        }

        function k(a) {
            N(this, a || {})
        }

        P = this;
        var l, m = !1, p = !0, q = !1, u = {}, v = !0, w = [], x = {
            string: {
                encode: a, decode: e, is: function (a) {
                    return null == a || !H(a) || "string" == typeof a
                }, pattern: /[^/]*/
            },
            "int": {
                encode: a, decode: function (a) {
                    return parseInt(a, 10)
                }, is: function (a) {
                    return H(a) && this.decode(a.toString()) === a
                }, pattern: /\d+/
            },
            bool: {
                encode: function (a) {
                    return a ? 1 : 0
                }, decode: function (a) {
                    return 0 !== parseInt(a, 10)
                }, is: function (a) {
                    return a === !0 || a === !1
                }, pattern: /0|1/
            },
            date: {
                encode: function (a) {
                    return this.is(a) ? [a.getFullYear(), ("0" + (a.getMonth() + 1)).slice(-2), ("0" + a.getDate()).slice(-2)].join("-") : c
                },
                decode: function (a) {
                    if (this.is(a))return a;
                    var b = this.capture.exec(a);
                    return b ? new Date(b[1], b[2] - 1, b[3]) : c
                },
                is: function (a) {
                    return a instanceof Date && !isNaN(a.valueOf())
                },
                equals: function (a, b) {
                    return this.is(a) && this.is(b) && a.toISOString() === b.toISOString()
                },
                pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
                capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
            },
            json: {encode: b.toJson, decode: b.fromJson, is: b.isObject, equals: b.equals, pattern: /[^/]*/},
            any: {encode: b.identity, decode: b.identity, equals: b.equals, pattern: /.*/}
        };
        t.$$getDefaultValue = function (a) {
            if (!i(a.value))return a.value;
            if (!l)throw new Error("Injectable functions cannot be called at configuration time");
            return l.invoke(a.value)
        }, this.caseInsensitive = function (a) {
            return H(a) && (m = a), m
        }, this.strictMode = function (a) {
            return H(a) && (p = a), p
        }, this.defaultSquashPolicy = function (a) {
            if (!H(a))return q;
            if (a !== !0 && a !== !1 && !J(a))throw new Error("Invalid squash policy: " + a + ". Valid policies: false, true, arbitrary-string");
            return q = a, a
        }, this.compile = function (a, b) {
            return new r(a, N(f(), b))
        }, this.isMatcher = function (a) {
            if (!K(a))return !1;
            var b = !0;
            return M(r.prototype, function (c, d) {
                I(c) && (b = b && H(a[d]) && I(a[d]))
            }), b
        }, this.type = function (a, b, c) {
            if (!H(b))return u[a];
            if (u.hasOwnProperty(a))throw new Error("A type named '" + a + "' has already been defined.");
            return u[a] = new s(N({name: a}, b)), c && (w.push({name: a, def: c}), v || j()), this
        }, M(x, function (a, b) {
            u[b] = new s(N({name: b}, a))
        }), u = d(u, {}), this.$get = ["$injector", function (a) {
            return l = a, v = !1, j(), M(x, function (a, b) {
                u[b] || (u[b] = new s(a))
            }), this
        }], this.Param = function (a, b, d, e) {
            function f(a) {
                var b = K(a) ? g(a) : [], c = -1 === h(b, "value") && -1 === h(b, "type") && -1 === h(b, "squash") && -1 === h(b, "array");
                return c && (a = {value: a}), a.$$fn = i(a.value) ? a.value : function () {
                    return a.value
                }, a
            }

            function j(b, c, d) {
                if (b.type && c)throw new Error("Param '" + a + "' has two type configurations.");
                return c ? c : b.type ? b.type instanceof s ? b.type : new s(b.type) : "config" === d ? u.any : u.string
            }

            function k() {
                var b = {array: "search" === e ? "auto" : !1}, c = a.match(/\[\]$/) ? {array: !0} : {};
                return N(b, c, d).array
            }

            function m(a, b) {
                var c = a.squash;
                if (!b || c === !1)return !1;
                if (!H(c) || null == c)return q;
                if (c === !0 || J(c))return c;
                throw new Error("Invalid squash policy: '" + c + "'. Valid policies: false, true, or arbitrary string")
            }

            function p(a, b, d, e) {
                var f, g, i = [{from: "", to: d || b ? c : ""}, {from: null, to: d || b ? c : ""}];
                return f = L(a.replace) ? a.replace : [], J(e) && f.push({from: e, to: c}), g = o(f, function (a) {
                    return a.from
                }), n(i, function (a) {
                    return -1 === h(g, a.from)
                }).concat(f)
            }

            function r() {
                if (!l)throw new Error("Injectable functions cannot be called at configuration time");
                var a = l.invoke(d.$$fn);
                if (null !== a && a !== c && !w.type.is(a))throw new Error("Default value (" + a + ") for parameter '" + w.id + "' is not an instance of Type (" + w.type.name + ")");
                return a
            }

            function t(a) {
                function b(a) {
                    return function (b) {
                        return b.from === a
                    }
                }

                function c(a) {
                    var c = o(n(w.replace, b(a)), function (a) {
                        return a.to
                    });
                    return c.length ? c[0] : a
                }

                return a = c(a), H(a) ? w.type.$normalize(a) : r()
            }

            function v() {
                return "{Param:" + a + " " + b + " squash: '" + z + "' optional: " + y + "}"
            }

            var w = this;
            d = f(d), b = j(d, b, e);
            var x = k();
            b = x ? b.$asArray(x, "search" === e) : b, "string" !== b.name || x || "path" !== e || d.value !== c || (d.value = "");
            var y = d.value !== c, z = m(d, y), A = p(d, x, y, z);
            N(this, {
                id: a,
                type: b,
                location: e,
                array: x,
                squash: z,
                replace: A,
                isOptional: y,
                value: t,
                dynamic: c,
                config: d,
                toString: v
            })
        }, k.prototype = {
            $$new: function () {
                return d(this, N(new k, {$$parent: this}))
            }, $$keys: function () {
                for (var a = [], b = [], c = this, d = g(k.prototype); c;)b.push(c), c = c.$$parent;
                return b.reverse(), M(b, function (b) {
                    M(g(b), function (b) {
                        -1 === h(a, b) && -1 === h(d, b) && a.push(b)
                    })
                }), a
            }, $$values: function (a) {
                var b = {}, c = this;
                return M(c.$$keys(), function (d) {
                    b[d] = c[d].value(a && a[d])
                }), b
            }, $$equals: function (a, b) {
                var c = !0, d = this;
                return M(d.$$keys(), function (e) {
                    var f = a && a[e], g = b && b[e];
                    d[e].type.equals(f, g) || (c = !1)
                }), c
            }, $$validates: function (a) {
                var d, e, f, g, h, i = this.$$keys();
                for (d = 0; d < i.length && (e = this[i[d]], f = a[i[d]], f !== c && null !== f || !e.isOptional); d++) {
                    if (g = e.type.$normalize(f), !e.type.is(g))return !1;
                    if (h = e.type.encode(g), b.isString(h) && !e.type.pattern.exec(h))return !1
                }
                return !0
            }, $$parent: c
        }, this.ParamSet = k
    }

    function u(a, d) {
        function e(a) {
            var b = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);
            return null != b ? b[1].replace(/\\(.)/g, "$1") : ""
        }

        function f(a, b) {
            return a.replace(/\$(\$|\d{1,2})/, function (a, c) {
                return b["$" === c ? 0 : Number(c)]
            })
        }

        function g(a, b, c) {
            if (!c)return !1;
            var d = a.invoke(b, b, {$match: c});
            return H(d) ? d : !0
        }

        function h(d, e, f, g) {
            function h(a, b, c) {
                return "/" === p ? a : b ? p.slice(0, -1) + a : c ? p.slice(1) + a : a
            }

            function m(a) {
                function b(a) {
                    var b = a(f, d);
                    return b ? (J(b) && d.replace().url(b), !0) : !1
                }

                if (!a || !a.defaultPrevented) {
                    o && d.url() === o;
                    o = c;
                    var e, g = j.length;
                    for (e = 0; g > e; e++)if (b(j[e]))return;
                    k && b(k)
                }
            }

            function n() {
                return i = i || e.$on("$locationChangeSuccess", m)
            }

            var o, p = g.baseHref(), q = d.url();
            return l || n(), {
                sync: function () {
                    m()
                }, listen: function () {
                    return n()
                }, update: function (a) {
                    return a ? void(q = d.url()) : void(d.url() !== q && (d.url(q), d.replace()))
                }, push: function (a, b, e) {
                    var f = a.format(b || {});
                    null !== f && b && b["#"] && (f += "#" + b["#"]), d.url(f), o = e && e.$$avoidResync ? d.url() : c, e && e.replace && d.replace()
                }, href: function (c, e, f) {
                    if (!c.validates(e))return null;
                    var g = a.html5Mode();
                    b.isObject(g) && (g = g.enabled);
                    var i = c.format(e);
                    if (f = f || {}, g || null === i || (i = "#" + a.hashPrefix() + i), null !== i && e && e["#"] && (i += "#" + e["#"]), i = h(i, g, f.absolute), !f.absolute || !i)return i;
                    var j = !g && i ? "/" : "", k = d.port();
                    return k = 80 === k || 443 === k ? "" : ":" + k, [d.protocol(), "://", d.host(), k, j, i].join("")
                }
            }
        }

        var i, j = [], k = null, l = !1;
        this.rule = function (a) {
            if (!I(a))throw new Error("'rule' must be a function");
            return j.push(a), this
        }, this.otherwise = function (a) {
            if (J(a)) {
                var b = a;
                a = function () {
                    return b
                }
            } else if (!I(a))throw new Error("'rule' must be a function");
            return k = a, this
        }, this.when = function (a, b) {
            var c, h = J(b);
            if (J(a) && (a = d.compile(a)), !h && !I(b) && !L(b))throw new Error("invalid 'handler' in when()");
            var i = {
                matcher: function (a, b) {
                    return h && (c = d.compile(b), b = ["$match", function (a) {
                        return c.format(a)
                    }]), N(function (c, d) {
                        return g(c, b, a.exec(d.path(), d.search()))
                    }, {prefix: J(a.prefix) ? a.prefix : ""})
                }, regex: function (a, b) {
                    if (a.global || a.sticky)throw new Error("when() RegExp must not be global or sticky");
                    return h && (c = b, b = ["$match", function (a) {
                        return f(c, a)
                    }]), N(function (c, d) {
                        return g(c, b, a.exec(d.path()))
                    }, {prefix: e(a)})
                }
            }, j = {matcher: d.isMatcher(a), regex: a instanceof RegExp};
            for (var k in j)if (j[k])return this.rule(i[k](a, b));
            throw new Error("invalid 'what' in when()")
        }, this.deferIntercept = function (a) {
            a === c && (a = !0), l = a
        }, this.$get = h, h.$inject = ["$location", "$rootScope", "$injector", "$browser"]
    }

    function v(a, e) {
        function f(a) {
            return 0 === a.indexOf(".") || 0 === a.indexOf("^")
        }

        function m(a, b) {
            if (!a)return c;
            var d = J(a), e = d ? a : a.name, g = f(e);
            if (g) {
                if (!b)throw new Error("No reference point given for path '" + e + "'");
                b = m(b);
                for (var h = e.split("."), i = 0, j = h.length, k = b; j > i; i++)if ("" !== h[i] || 0 !== i) {
                    if ("^" !== h[i])break;
                    if (!k.parent)throw new Error("Path '" + e + "' not valid for state '" + b.name + "'");
                    k = k.parent
                } else k = b;
                h = h.slice(i).join("."), e = k.name + (k.name && h ? "." : "") + h
            }
            var l = z[e];
            return !l || !d && (d || l !== a && l.self !== a) ? c : l
        }

        function n(a, b) {
            A[a] || (A[a] = []), A[a].push(b)
        }

        function p(a) {
            for (var b = A[a] || []; b.length;)q(b.shift())
        }

        function q(b) {
            b = d(b, {
                self: b, resolve: b.resolve || {}, toString: function () {
                    return this.name
                }
            });
            var c = b.name;
            if (!J(c) || c.indexOf("@") >= 0)throw new Error("State must have a valid name");
            if (z.hasOwnProperty(c))throw new Error("State '" + c + "'' is already defined");
            var e = -1 !== c.indexOf(".") ? c.substring(0, c.lastIndexOf(".")) : J(b.parent) ? b.parent : K(b.parent) && J(b.parent.name) ? b.parent.name : "";
            if (e && !z[e])return n(e, b.self);
            for (var f in C)I(C[f]) && (b[f] = C[f](b, C.$delegates[f]));
            return z[c] = b, !b[B] && b.url && a.when(b.url, ["$match", "$stateParams", function (a, c) {
                y.$current.navigable == b && j(a, c) || y.transitionTo(b, a, {inherit: !0, location: !1})
            }]), p(c), b
        }

        function r(a) {
            return a.indexOf("*") > -1
        }

        function s(a) {
            for (var b = a.split("."), c = y.$current.name.split("."), d = 0, e = b.length; e > d; d++)"*" === b[d] && (c[d] = "*");
            return "**" === b[0] && (c = c.slice(h(c, b[1])), c.unshift("**")), "**" === b[b.length - 1] && (c.splice(h(c, b[b.length - 2]) + 1, Number.MAX_VALUE), c.push("**")), b.length != c.length ? !1 : c.join("") === b.join("")
        }

        function t(a, b) {
            return J(a) && !H(b) ? C[a] : I(b) && J(a) ? (C[a] && !C.$delegates[a] && (C.$delegates[a] = C[a]), C[a] = b, this) : this
        }

        function u(a, b) {
            return K(a) ? b = a : b.name = a, q(b), this
        }

        function v(a, e, f, h, l, n, p, q, t) {
            function u(b, c, d, f) {
                var g = a.$broadcast("$stateNotFound", b, c, d);
                if (g.defaultPrevented)return p.update(), D;
                if (!g.retry)return null;
                if (f.$retry)return p.update(), E;
                var h = y.transition = e.when(g.retry);
                return h.then(function () {
                    return h !== y.transition ? A : (b.options.$retry = !0, y.transitionTo(b.to, b.toParams, b.options))
                }, function () {
                    return D
                }), p.update(), h
            }

            function v(a, c, d, g, i, j) {
                function m() {
                    var c = [];
                    return M(a.views, function (d, e) {
                        var g = d.resolve && d.resolve !== a.resolve ? d.resolve : {};
                        g.$template = [function () {
                            return f.load(e, {view: d, locals: i.globals, params: n, notify: j.notify}) || ""
                        }], c.push(l.resolve(g, i.globals, i.resolve, a).then(function (c) {
                            if (I(d.controllerProvider) || L(d.controllerProvider)) {
                                var f = b.extend({}, g, i.globals);
                                c.$$controller = h.invoke(d.controllerProvider, null, f)
                            } else c.$$controller = d.controller;
                            c.$$state = a, c.$$controllerAs = d.controllerAs, i[e] = c
                        }))
                    }), e.all(c).then(function () {
                        return i.globals
                    })
                }

                var n = d ? c : k(a.params.$$keys(), c), o = {$stateParams: n};
                i.resolve = l.resolve(a.resolve, o, i.resolve, a);
                var p = [i.resolve.then(function (a) {
                    i.globals = a
                })];
                return g && p.push(g), e.all(p).then(m).then(function (a) {
                    return i
                })
            }

            var A = e.reject(new Error("transition superseded")), C = e.reject(new Error("transition prevented")), D = e.reject(new Error("transition aborted")), E = e.reject(new Error("transition failed"));
            return x.locals = {resolve: null, globals: {$stateParams: {}}}, y = {
                params: {},
                current: x.self,
                $current: x,
                transition: null
            }, y.reload = function (a) {
                return y.transitionTo(y.current, n, {reload: a || !0, inherit: !1, notify: !0})
            }, y.go = function (a, b, c) {
                return y.transitionTo(a, b, N({inherit: !0, relative: y.$current}, c))
            }, y.transitionTo = function (b, c, f) {
                c = c || {}, f = N({
                    location: !0,
                    inherit: !1,
                    relative: null,
                    notify: !0,
                    reload: !1,
                    $retry: !1
                }, f || {});
                var g, j = y.$current, l = y.params, o = j.path, q = m(b, f.relative), r = c["#"];
                if (!H(q)) {
                    var s = {to: b, toParams: c, options: f}, t = u(s, j.self, l, f);
                    if (t)return t;
                    if (b = s.to, c = s.toParams, f = s.options, q = m(b, f.relative), !H(q)) {
                        if (!f.relative)throw new Error("No such state '" + b + "'");
                        throw new Error("Could not resolve '" + b + "' from state '" + f.relative + "'")
                    }
                }
                if (q[B])throw new Error("Cannot transition to abstract state '" + b + "'");
                if (f.inherit && (c = i(n, c || {}, y.$current, q)), !q.params.$$validates(c))return E;
                c = q.params.$$values(c), b = q;
                var z = b.path, D = 0, F = z[D], G = x.locals, I = [];
                if (f.reload) {
                    if (J(f.reload) || K(f.reload)) {
                        if (K(f.reload) && !f.reload.name)throw new Error("Invalid reload state object");
                        var L = f.reload === !0 ? o[0] : m(f.reload);
                        if (f.reload && !L)throw new Error("No such reload state '" + (J(f.reload) ? f.reload : f.reload.name) + "'");
                        for (; F && F === o[D] && F !== L;)G = I[D] = F.locals, D++, F = z[D]
                    }
                } else for (; F && F === o[D] && F.ownParams.$$equals(c, l);)G = I[D] = F.locals, D++, F = z[D];
                if (w(b, c, j, l, G, f))return r && (c["#"] = r), y.params = c, O(y.params, n), f.location && b.navigable && b.navigable.url && (p.push(b.navigable.url, c, {
                    $$avoidResync: !0,
                    replace: "replace" === f.location
                }), p.update(!0)), y.transition = null, e.when(y.current);
                if (c = k(b.params.$$keys(), c || {}), f.notify && a.$broadcast("$stateChangeStart", b.self, c, j.self, l).defaultPrevented)return a.$broadcast("$stateChangeCancel", b.self, c, j.self, l), p.update(), C;
                for (var M = e.when(G), P = D; P < z.length; P++, F = z[P])G = I[P] = d(G), M = v(F, c, F === b, M, G, f);
                var Q = y.transition = M.then(function () {
                    var d, e, g;
                    if (y.transition !== Q)return A;
                    for (d = o.length - 1; d >= D; d--)g = o[d], g.self.onExit && h.invoke(g.self.onExit, g.self, g.locals.globals), g.locals = null;
                    for (d = D; d < z.length; d++)e = z[d], e.locals = I[d], e.self.onEnter && h.invoke(e.self.onEnter, e.self, e.locals.globals);
                    return r && (c["#"] = r), y.transition !== Q ? A : (y.$current = b, y.current = b.self, y.params = c, O(y.params, n), y.transition = null, f.location && b.navigable && p.push(b.navigable.url, b.navigable.locals.globals.$stateParams, {
                        $$avoidResync: !0,
                        replace: "replace" === f.location
                    }), f.notify && a.$broadcast("$stateChangeSuccess", b.self, c, j.self, l), p.update(!0), y.current)
                }, function (d) {
                    return y.transition !== Q ? A : (y.transition = null, g = a.$broadcast("$stateChangeError", b.self, c, j.self, l, d), g.defaultPrevented || p.update(), e.reject(d))
                });
                return Q
            }, y.is = function (a, b, d) {
                d = N({relative: y.$current}, d || {});
                var e = m(a, d.relative);
                return H(e) ? y.$current !== e ? !1 : b ? j(e.params.$$values(b), n) : !0 : c
            }, y.includes = function (a, b, d) {
                if (d = N({relative: y.$current}, d || {}), J(a) && r(a)) {
                    if (!s(a))return !1;
                    a = y.$current.name
                }
                var e = m(a, d.relative);
                return H(e) ? H(y.$current.includes[e.name]) ? b ? j(e.params.$$values(b), n, g(b)) : !0 : !1 : c
            }, y.href = function (a, b, d) {
                d = N({lossy: !0, inherit: !0, absolute: !1, relative: y.$current}, d || {});
                var e = m(a, d.relative);
                if (!H(e))return null;
                d.inherit && (b = i(n, b || {}, y.$current, e));
                var f = e && d.lossy ? e.navigable : e;
                return f && f.url !== c && null !== f.url ? p.href(f.url, k(e.params.$$keys().concat("#"), b || {}), {absolute: d.absolute}) : null
            }, y.get = function (a, b) {
                if (0 === arguments.length)return o(g(z), function (a) {
                    return z[a].self
                });
                var c = m(a, b || y.$current);
                return c && c.self ? c.self : null
            }, y
        }

        function w(a, b, c, d, e, f) {
            function g(a, b, c) {
                function d(b) {
                    return "search" != a.params[b].location
                }

                var e = a.params.$$keys().filter(d), f = l.apply({}, [a.params].concat(e)), g = new P.ParamSet(f);
                return g.$$equals(b, c)
            }

            return !f.reload && a === c && (e === c.locals || a.self.reloadOnSearch === !1 && g(c, d, b)) ? !0 : void 0
        }

        var x, y, z = {}, A = {}, B = "abstract", C = {
            parent: function (a) {
                if (H(a.parent) && a.parent)return m(a.parent);
                var b = /^(.+)\.[^.]+$/.exec(a.name);
                return b ? m(b[1]) : x
            }, data: function (a) {
                return a.parent && a.parent.data && (a.data = a.self.data = N({}, a.parent.data, a.data)), a.data
            }, url: function (a) {
                var b = a.url, c = {params: a.params || {}};
                if (J(b))return "^" == b.charAt(0) ? e.compile(b.substring(1), c) : (a.parent.navigable || x).url.concat(b, c);
                if (!b || e.isMatcher(b))return b;
                throw new Error("Invalid url '" + b + "' in state '" + a + "'")
            }, navigable: function (a) {
                return a.url ? a : a.parent ? a.parent.navigable : null
            }, ownParams: function (a) {
                var b = a.url && a.url.params || new P.ParamSet;
                return M(a.params || {}, function (a, c) {
                    b[c] || (b[c] = new P.Param(c, null, a, "config"))
                }), b
            }, params: function (a) {
                return a.parent && a.parent.params ? N(a.parent.params.$$new(), a.ownParams) : new P.ParamSet
            }, views: function (a) {
                var b = {};
                return M(H(a.views) ? a.views : {"": a}, function (c, d) {
                    d.indexOf("@") < 0 && (d += "@" + a.parent.name), b[d] = c
                }), b
            }, path: function (a) {
                return a.parent ? a.parent.path.concat(a) : []
            }, includes: function (a) {
                var b = a.parent ? N({}, a.parent.includes) : {};
                return b[a.name] = !0, b
            }, $delegates: {}
        };
        x = q({
            name: "",
            url: "^",
            views: null,
            "abstract": !0
        }), x.navigable = null, this.decorator = t, this.state = u, this.$get = v, v.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$urlRouter", "$location", "$urlMatcherFactory"]
    }

    function w() {
        function a(a, b) {
            return {
                load: function (c, d) {
                    var e, f = {
                        template: null,
                        controller: null,
                        view: null,
                        locals: null,
                        notify: !0,
                        async: !0,
                        params: {}
                    };
                    return d = N(f, d), d.view && (e = b.fromConfig(d.view, d.params, d.locals)), e && d.notify && a.$broadcast("$viewContentLoading", d), e
                }
            }
        }

        this.$get = a, a.$inject = ["$rootScope", "$templateFactory"]
    }

    function x() {
        var a = !1;
        this.useAnchorScroll = function () {
            a = !0
        }, this.$get = ["$anchorScroll", "$timeout", function (b, c) {
            return a ? b : function (a) {
                return c(function () {
                    a[0].scrollIntoView()
                }, 0, !1)
            }
        }]
    }

    function y(a, c, d, e) {
        function f() {
            return c.has ? function (a) {
                return c.has(a) ? c.get(a) : null
            } : function (a) {
                try {
                    return c.get(a)
                } catch (b) {
                    return null
                }
            }
        }

        function g(a, b) {
            var c = function () {
                return {
                    enter: function (a, b, c) {
                        b.after(a), c()
                    }, leave: function (a, b) {
                        a.remove(), b()
                    }
                }
            };
            if (j)return {
                enter: function (a, b, c) {
                    var d = j.enter(a, null, b, c);
                    d && d.then && d.then(c)
                }, leave: function (a, b) {
                    var c = j.leave(a, b);
                    c && c.then && c.then(b)
                }
            };
            if (i) {
                var d = i && i(b, a);
                return {
                    enter: function (a, b, c) {
                        d.enter(a, null, b), c()
                    }, leave: function (a, b) {
                        d.leave(a), b()
                    }
                }
            }
            return c()
        }

        var h = f(), i = h("$animator"), j = h("$animate"), k = {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            compile: function (c, f, h) {
                return function (c, f, i) {
                    function j() {
                        l && (l.remove(), l = null), n && (n.$destroy(), n = null), m && (r.leave(m, function () {
                            l = null
                        }), l = m, m = null)
                    }

                    function k(g) {
                        var k, l = A(c, i, f, e), s = l && a.$current && a.$current.locals[l];
                        if (g || s !== o) {
                            k = c.$new(), o = a.$current.locals[l];
                            var t = h(k, function (a) {
                                r.enter(a, f, function () {
                                    n && n.$emit("$viewContentAnimationEnded"), (b.isDefined(q) && !q || c.$eval(q)) && d(a)
                                }), j()
                            });
                            m = t, n = k, n.$emit("$viewContentLoaded"), n.$eval(p)
                        }
                    }

                    var l, m, n, o, p = i.onload || "", q = i.autoscroll, r = g(i, c);
                    c.$on("$stateChangeSuccess", function () {
                        k(!1)
                    }), c.$on("$viewContentLoading", function () {
                        k(!1)
                    }), k(!0)
                }
            }
        };
        return k
    }

    function z(a, b, c, d) {
        return {
            restrict: "ECA", priority: -400, compile: function (e) {
                var f = e.html();
                return function (e, g, h) {
                    var i = c.$current, j = A(e, h, g, d), k = i && i.locals[j];
                    if (k) {
                        g.data("$uiView", {name: j, state: k.$$state}), g.html(k.$template ? k.$template : f);
                        var l = a(g.contents());
                        if (k.$$controller) {
                            k.$scope = e, k.$element = g;
                            var m = b(k.$$controller, k);
                            k.$$controllerAs && (e[k.$$controllerAs] = m), g.data("$ngControllerController", m), g.children().data("$ngControllerController", m)
                        }
                        l(e)
                    }
                }
            }
        }
    }

    function A(a, b, c, d) {
        var e = d(b.uiView || b.name || "")(a), f = c.inheritedData("$uiView");
        return e.indexOf("@") >= 0 ? e : e + "@" + (f ? f.state.name : "")
    }

    function B(a, b) {
        var c, d = a.match(/^\s*({[^}]*})\s*$/);
        if (d && (a = b + "(" + d[1] + ")"), c = a.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/), !c || 4 !== c.length)throw new Error("Invalid state ref '" + a + "'");
        return {state: c[1], paramExpr: c[3] || null}
    }

    function C(a) {
        var b = a.parent().inheritedData("$uiView");
        return b && b.state && b.state.name ? b.state : void 0
    }

    function D(a, c) {
        var d = ["location", "inherit", "reload", "absolute"];
        return {
            restrict: "A", require: ["?^uiSrefActive", "?^uiSrefActiveEq"], link: function (e, f, g, h) {
                var i = B(g.uiSref, a.current.name), j = null, k = C(f) || a.$current, l = "[object SVGAnimatedString]" === Object.prototype.toString.call(f.prop("href")) ? "xlink:href" : "href", m = null, n = "A" === f.prop("tagName").toUpperCase(), o = "FORM" === f[0].nodeName, p = o ? "action" : l, q = !0, r = {
                    relative: k,
                    inherit: !0
                }, s = e.$eval(g.uiSrefOpts) || {};
                b.forEach(d, function (a) {
                    a in s && (r[a] = s[a])
                });
                var t = function (c) {
                    if (c && (j = b.copy(c)), q) {
                        m = a.href(i.state, j, r);
                        var d = h[1] || h[0];
                        return d && d.$$addStateInfo(i.state, j), null === m ? (q = !1, !1) : void g.$set(p, m)
                    }
                };
                i.paramExpr && (e.$watch(i.paramExpr, function (a, b) {
                    a !== j && t(a)
                }, !0), j = b.copy(e.$eval(i.paramExpr))), t(), o || f.bind("click", function (b) {
                    var d = b.which || b.button;
                    if (!(d > 1 || b.ctrlKey || b.metaKey || b.shiftKey || f.attr("target"))) {
                        var e = c(function () {
                            a.go(i.state, j, r)
                        });
                        b.preventDefault();
                        var g = n && !m ? 1 : 0;
                        b.preventDefault = function () {
                            g-- <= 0 && c.cancel(e)
                        }
                    }
                })
            }
        }
    }

    function E(a, b, c) {
        return {
            restrict: "A", controller: ["$scope", "$element", "$attrs", function (b, d, e) {
                function f() {
                    g() ? d.addClass(i) : d.removeClass(i)
                }

                function g() {
                    for (var a = 0; a < j.length; a++)if (h(j[a].state, j[a].params))return !0;
                    return !1
                }

                function h(b, c) {
                    return "undefined" != typeof e.uiSrefActiveEq ? a.is(b.name, c) : a.includes(b.name, c)
                }

                var i, j = [];
                i = c(e.uiSrefActiveEq || e.uiSrefActive || "", !1)(b), this.$$addStateInfo = function (b, c) {
                    var e = a.get(b, C(d));
                    j.push({state: e || {name: b}, params: c}), f()
                }, b.$on("$stateChangeSuccess", f)
            }]
        }
    }

    function F(a) {
        var b = function (b) {
            return a.is(b)
        };
        return b.$stateful = !0, b
    }

    function G(a) {
        var b = function (b) {
            return a.includes(b)
        };
        return b.$stateful = !0, b
    }

    var H = b.isDefined, I = b.isFunction, J = b.isString, K = b.isObject, L = b.isArray, M = b.forEach, N = b.extend, O = b.copy;
    b.module("ui.router.util", ["ng"]), b.module("ui.router.router", ["ui.router.util"]), b.module("ui.router.state", ["ui.router.router", "ui.router.util"]), b.module("ui.router", ["ui.router.state"]), b.module("ui.router.compat", ["ui.router"]), p.$inject = ["$q", "$injector"], b.module("ui.router.util").service("$resolve", p), q.$inject = ["$http", "$templateCache", "$injector"], b.module("ui.router.util").service("$templateFactory", q);
    var P;
    r.prototype.concat = function (a, b) {
        var c = {caseInsensitive: P.caseInsensitive(), strict: P.strictMode(), squash: P.defaultSquashPolicy()};
        return new r(this.sourcePath + a + this.sourceSearch, N(c, b), this)
    }, r.prototype.toString = function () {
        return this.source
    }, r.prototype.exec = function (a, b) {
        function c(a) {
            function b(a) {
                return a.split("").reverse().join("")
            }

            function c(a) {
                return a.replace(/\\-/g, "-")
            }

            var d = b(a).split(/-(?!\\)/), e = o(d, b);
            return o(e, c).reverse()
        }

        var d = this.regexp.exec(a);
        if (!d)return null;
        b = b || {};
        var e, f, g, h = this.parameters(), i = h.length, j = this.segments.length - 1, k = {};
        if (j !== d.length - 1)throw new Error("Unbalanced capture group in route '" + this.source + "'");
        for (e = 0; j > e; e++) {
            g = h[e];
            var l = this.params[g], m = d[e + 1];
            for (f = 0; f < l.replace; f++)l.replace[f].from === m && (m = l.replace[f].to);
            m && l.array === !0 && (m = c(m)), k[g] = l.value(m)
        }
        for (; i > e; e++)g = h[e], k[g] = this.params[g].value(b[g]);
        return k
    }, r.prototype.parameters = function (a) {
        return H(a) ? this.params[a] || null : this.$$paramNames
    }, r.prototype.validates = function (a) {
        return this.params.$$validates(a)
    }, r.prototype.format = function (a) {
        function b(a) {
            return encodeURIComponent(a).replace(/-/g, function (a) {
                return "%5C%" + a.charCodeAt(0).toString(16).toUpperCase()
            })
        }

        a = a || {};
        var c = this.segments, d = this.parameters(), e = this.params;
        if (!this.validates(a))return null;
        var f, g = !1, h = c.length - 1, i = d.length, j = c[0];
        for (f = 0; i > f; f++) {
            var k = h > f, l = d[f], m = e[l], n = m.value(a[l]), p = m.isOptional && m.type.equals(m.value(), n), q = p ? m.squash : !1, r = m.type.encode(n);
            if (k) {
                var s = c[f + 1];
                if (q === !1)null != r && (j += L(r) ? o(r, b).join("-") : encodeURIComponent(r)), j += s; else if (q === !0) {
                    var t = j.match(/\/$/) ? /\/?(.*)/ : /(.*)/;
                    j += s.match(t)[1]
                } else J(q) && (j += q + s)
            } else {
                if (null == r || p && q !== !1)continue;
                L(r) || (r = [r]), r = o(r, encodeURIComponent).join("&" + l + "="), j += (g ? "&" : "?") + (l + "=" + r), g = !0
            }
        }
        return j
    }, s.prototype.is = function (a, b) {
        return !0
    }, s.prototype.encode = function (a, b) {
        return a
    }, s.prototype.decode = function (a, b) {
        return a
    }, s.prototype.equals = function (a, b) {
        return a == b
    }, s.prototype.$subPattern = function () {
        var a = this.pattern.toString();
        return a.substr(1, a.length - 2)
    }, s.prototype.pattern = /.*/, s.prototype.toString = function () {
        return "{Type:" + this.name + "}"
    }, s.prototype.$normalize = function (a) {
        return this.is(a) ? a : this.decode(a)
    }, s.prototype.$asArray = function (a, b) {
        function d(a, b) {
            function d(a, b) {
                return function () {
                    return a[b].apply(a, arguments)
                }
            }

            function e(a) {
                return L(a) ? a : H(a) ? [a] : []
            }

            function f(a) {
                switch (a.length) {
                    case 0:
                        return c;
                    case 1:
                        return "auto" === b ? a[0] : a;
                    default:
                        return a
                }
            }

            function g(a) {
                return !a
            }

            function h(a, b) {
                return function (c) {
                    c = e(c);
                    var d = o(c, a);
                    return b === !0 ? 0 === n(d, g).length : f(d)
                }
            }

            function i(a) {
                return function (b, c) {
                    var d = e(b), f = e(c);
                    if (d.length !== f.length)return !1;
                    for (var g = 0; g < d.length; g++)if (!a(d[g], f[g]))return !1;
                    return !0
                }
            }

            this.encode = h(d(a, "encode")), this.decode = h(d(a, "decode")), this.is = h(d(a, "is"), !0), this.equals = i(d(a, "equals")), this.pattern = a.pattern, this.$normalize = h(d(a, "$normalize")), this.name = a.name, this.$arrayMode = b
        }

        if (!a)return this;
        if ("auto" === a && !b)throw new Error("'auto' array mode is for query parameters only");
        return new d(this, a)
    }, b.module("ui.router.util").provider("$urlMatcherFactory", t), b.module("ui.router.util").run(["$urlMatcherFactory", function (a) {
    }]), u.$inject = ["$locationProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.router").provider("$urlRouter", u), v.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider"], b.module("ui.router.state").value("$stateParams", {}).provider("$state", v), w.$inject = [], b.module("ui.router.state").provider("$view", w), b.module("ui.router.state").provider("$uiViewScroll", x), y.$inject = ["$state", "$injector", "$uiViewScroll", "$interpolate"], z.$inject = ["$compile", "$controller", "$state", "$interpolate"], b.module("ui.router.state").directive("uiView", y), b.module("ui.router.state").directive("uiView", z), D.$inject = ["$state", "$timeout"], E.$inject = ["$state", "$stateParams", "$interpolate"], b.module("ui.router.state").directive("uiSref", D).directive("uiSrefActive", E).directive("uiSrefActiveEq", E), F.$inject = ["$state"], G.$inject = ["$state"], b.module("ui.router.state").filter("isState", F).filter("includedByState", G)
}(window, window.angular);
/*var _gaq;
_gaq = _gaq || [], _gaq.push(["_setAccount", "UA-35761644-1"]), _gaq.push(["_trackPageview"]), function (e, t, r, n, o, l, u) {
    var c;
    return localStorage.analytics ? (c = document.createElement("script"), c.type = "text/javascript", c.async = !0, c.src = "https://ssl.google-analytics.com/ga.js", t = document.getElementsByTagName("script")[0], t.parentNode.insertBefore(c, t), window.ga = function (e, t, r, n) {
        return r ? _gaq.push(["_trackEvent", r, n]) : void 0
    }) : window.ga = function () {
        return console.debug(arguments)
    }
}(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-35761644-1"), ga("send", "pageview");*/
//option配置
var _gaq;
_gaq = _gaq || function (e, t, n, r, o, s, a) {
        var l;
        return window.ga = function () {
            return console.debug(arguments)
        }
}(), ga("create", "UA-35761644-1"), ga("send", "pageview");
var indexOf = [].indexOf || function (e) {
        for (var t = 0, r = this.length; r > t; t++)if (t in this && this[t] === e)return t;
        return -1
    };
angular.module("localytics.directives", []), angular.module("localytics.directives").directive("chosen", ["$timeout", function (e) {
    var t, r, n, o, l;
    return r = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/, t = ["noResultsText", "allowSingleDeselect", "disableSearchThreshold", "disableSearch"], l = function (e) {
        return e.replace(/[A-Z]/g, function (e) {
            return "_" + e.toLowerCase()
        })
    }, o = function (e) {
        var t, r, n;
        if (angular.isArray(e))return 0 === e.length;
        if (angular.isObject(e))for (t = 0, n = e.length; n > t; t++)if (r = e[t], e.hasOwnProperty(r))return !1;
        return !0
    }, n = {
        restrict: "A", link: function (n, u, c) {
            var s, i, a, g, f, p;
            return a = n.$eval(c.chosen) || {}, a.no_results_text = chrome.i18n.getMessage("no_results"), angular.forEach(c, function (e, r) {
                return indexOf.call(t, r) >= 0 ? a[l(r)] = n.$eval(e) : void 0
            }), g = function () {
                return u.addClass("loading").attr("disabled", !0).trigger("liszt:updated")
            }, f = function () {
                return u.removeClass("loading").attr("disabled", !1).trigger("liszt:updated")
            }, s = function (e) {
                return u.empty().append("<option selected>" + e + "</option>").attr("disabled", !0).trigger("liszt:updated")
            }, e(function () {
                return u.chosen(a)
            }), c.ngOptions ? (i = c.ngOptions.match(r), p = i[7], angular.isUndefined(n.$eval(p)) && g(), n.$watch(p, function (e, t) {
                return e !== t && (f(), o(e)) ? s(a.no_results_text || "No values available") : void 0
            })) : void 0
        }
    }
}]);
var app, ctrls, services, utilsDirectives;
app = angular.module("cm",
    ["ui.bootstrap", "ui.router", "ngTable", "pascalprecht.translate", "LocalStorageModule", "cm.controllers", "cm.services", "cm.directives", "utils.directives"]),
    ctrls = angular.module("cm.controllers", []),
    services = angular.module("cm.services", []),
    utilsDirectives = angular.module("utils.directives", []),
    app.config(["$stateProvider", "$urlRouterProvider", "$translateProvider", "localStorageServiceProvider",
        function (e, t, r, n) {
    var o, l, u, c, s, i;
    n.setPrefix("");
    for (u in TRANSLATIONS.zh_CN)for (o = 0, s = LANGUAGE.length; s > o; o++)c = LANGUAGE[o], u in TRANSLATIONS[c] || (TRANSLATIONS[c][u] = u);
    for (l = 0, i = LANGUAGE.length; i > l; l++)c = LANGUAGE[l], r.translations(c, TRANSLATIONS[c]);
    return r.registerAvailableLanguageKeys(LANGUAGE, {
        "zh-cn": "zh_CN",
        "zh-tw": "zh_TW",
        en: "en",
        ru: "ru"
    }).determinePreferredLanguage().fallbackLanguage("en"), r.useSanitizeValueStrategy("escaped"), t.otherwise("/about"), e.state("about", {
        url: "/about",
        templateUrl: "/template/options/about.html",
        controller: "AboutCtrl"
    }).state("settings", {
        url: "/settings",
        templateUrl: "/template/options/settings.html",
        controller: "SettingsCtrl"
    }).state("setoptions", {
        url: "/setoptions",
        templateUrl: "/template/qatools_options.html",
        controller: "SetOptionsCtrl"
    }).state("menu", {
        url: "/menu/:type",
        templateUrl: "/template/options/menu.html",
        controller: "MenuCtrl"
    }).state("popupmenu", {
        url: "/popupmenu",
        templateUrl: "/template/options/popupMenu.html",
        controller: "PopupMenuCtrl"})
}]);
var indexOf = [].indexOf || function (e) {
        for (var t = 0, r = this.length; r > t; t++)if (t in this && this[t] === e)return t;
        return -1
    };
ctrls.controller("OptionsCtrl", ["$scope", "localStorageService", "$translate", "$menu", "i18n", function (e, t, r, n, o) {
    return console.log("option ctrl"), e.initLocal = function () {
        var r;
        return e.locale = t.get("locale"), e.locale || (e.locale = navigator.language.replace("-", "_")), r = e.locale, indexOf.call(LANGUAGE, r) < 0 && (e.locale = "en"), t.set("locale", e.locale)
    }, e.$watch("locale", function (e, l) {
        return t.set("locale", e), o.setLocale(e), r.use(e), n.reset()
    }), e.initLocal()
}]);
/**
 * controllers 控制器
 */
var showSelect, sumGroup, updateGroup, indexOf = [].indexOf || function (e) {
        for (var t = 0, r = this.length; r > t; t++)if (t in this && this[t] === e)return t;
        return -1
    };
sumGroup = function (groupingallmenus) {
    //菜单分组排序
    var groupingmenus, menu, n, o, l, u, menus;
    for (n = 0, l = groupingallmenus.length; l > n; n++) {
        for (groupingmenus = groupingallmenus[n], groupingmenus.v = 0, menus = groupingmenus.items, o = 0, u = menus.length; u > o; o++)menu = menus[o], groupingmenus.v += menu.v;
        JU.sortOn(groupingmenus.items, "-v")
    }
    return JU.sortOn(groupingallmenus, "-v"), groupingallmenus
}, showSelect = function (e, t) {
    //显示菜单选择
    var r, n, o, l, u, c, s, i, a, g;
    for (null == t && (t = []), o = 0, c = e.length; c > o; o++)for (g = e[o], l = 0, s = t.length; s > l; l++)for (r = t[l], a = r.items, u = 0, i = a.length; i > u; u++)n = a[u], n.c === g.c && (n.select = !0);
    return t
}, updateGroup = function (e, t) {
     //创建自定义分组
    var r, n, o, l;
    for (e || (e = []), l = [], n = 0, o = e.length; o > n; n++)r = e[n], l.push({
        c: r[0],
        l: "all",
        g: JU.findArray(t, "c", r[1])
    });
    return l
}, ctrls.controller("MenuCtrl", ["$scope", "$stateParams", "localStorageService", "$menu", "i18n", "$modal", "dialog", function (scope, t, localStorage, n, ci18n, l, u) {
    $("#rightmenusli").addClass("active");
    var c, typeCustom, i, a, g, f;
    //下面是拼localStorage的key的
    return scope.type = t.type,
        g = scope.type.toUpperCase(),
        f = t.type + "Select",
        c = t.type + "Back",
        a = t.type + "Incognito",
        typeCustom = t.type + "Custom",
        i = t.type[0] + "cGroup",
        localStorage.bind(scope, "zh_CN", !1),
        localStorage.bind(scope, "zh_TW", !1),
        localStorage.bind(scope, "ru", !1),
        localStorage.bind(scope, "en", !1),
        localStorage.bind(scope, "isEdit", !0),
        localStorage.bind(scope, "isFlag", !0),
        localStorage.bind(scope, "names", {}),
        scope.size = (window.innerHeight - 80) / 60,
        localStorage.bind(scope, "back", !1),
        localStorage.bind(scope, "opt_item_notification", 3000),
        scope.isHideIcon = function (t) {
            //判断是否是自定义
            var r, n, o, l, u;
            for (n = !1, u = scope.custom, o = 0, l = u.length; l > o; o++)r = u[o], t.c === r.c && (n = !0);
            return n || "g"in t || !scope.isEdit
    }, scope.menuI18n = function (menus, names) {
        //翻译菜单
        var r, n, menu, u, ci18nmenus;
        for (console.log("i18n local", ci18n.locale()),//log打印当前本地语言
                 ci18nmenus = [], r = 0, n = menus.length; n > r; r++)
            menu = menus[r],
            u = ci18n.get(menu.c, menu.n),
            menu.c in names && (u = names[menu.c]),
            ci18nmenus.push({
                t: ci18n.get(menu.t), //翻译后的菜单类型
                n: u, //翻译后的标题
                b: menu.b,
                c: menu.c,
                i: menu.i,
                h: menu.h,
                k: menu.k,
                m: menu.m,
                l: menu.l,
                s: menu.s,
                u: menu.u,
                v: menu.v,
                r: menu.r
            });
        return ci18nmenus
    }, scope.updateCustom = function (e) {
        //创建自定义对象
        var t, r, n, l;
        for (e || (e = []), l = [], r = 0, n = e.length; n > r; r++){
            t = e[r];
            l.push({
                c: t[0],
                l: "all",
                u: t[1],
                r: t[2]&& $.isArray(t[2])?t[2]:[],
                t: ci18n.get("Custom")
            });
        }
        return l;
    }, scope.init = function () {
        var t, l, u, p, d;
        for (console.log("menu init"),
                 l = JU.lsGet("all", []),
                 scope.allUrls = scope.menuI18n(l, scope.names),
                 scope.urls = [],
                 d = scope.allUrls,
                 u = 0,
                 p = d.length; p > u; u++) {
            t = d[u];
            t.m === g && scope.urls.push(t);
        }
        return  scope.groups = sumGroup(JU.groupBy(scope.urls, "t")),
        scope.custom = scope.updateCustom(localStorage.get(typeCustom)),
        scope.menus = scope.custom.concat(scope.urls),
        scope.groups.push({
            label: ci18n.get("Custom"),
            items: scope.custom
        }),
        scope.group = updateGroup(localStorage.get(i), scope.menus),
        scope.select = scope.getSelect(),
        scope.groups.push({
            label: ci18n.get("Group"),
            items: scope.group
        }),
        showSelect(scope.select, scope.groups),
        scope.$watch("group", function (t, n) {
            var o, u, c, s, a, g, f, p, d, h, m;
            if (scope.f_group_old.$valid) {
                for (c = 0, a = t.length; a > c; c++){
                    p = t[c], p.n = p.c;
                }
                for (l = [], s = 0, g = t.length; g > s; s++) {
                    for (o = t[s], m = [], h = o.g, d = 0, f = h.length; f > d; d++)u = h[d], m.push(u.c);
                    l.push([o.c, m]);
                }
                return localStorage.set(i, l);
            }
        }, !0),
        scope.$watch("custom", function (t, n) {
            //修改自定义菜单
            var customMenu, l, u, c;
            if (scope.f_custom_old.$valid) {
                for (l = 0, u = t.length; u > l; l++)c = t[l], c.n = c.c;
                return localStorage.set(typeCustom, function () {
                    var e, r, customMenus;
                    for (customMenus = [], e = 0, r = t.length; r > e; e++) {
                        customMenu = t[e];
                        customMenus.push([
                            customMenu.c,
                            customMenu.u,
                            customMenu && customMenu.r && (typeof customMenu.r == "string") ? customMenu.r.split(",") : ($.isArray(customMenu.r)?customMenu.r:[])]);
                    }
                    return customMenus;
                }()), scope.menus = t.concat(scope.urls)
            }
        }, !0),
        scope.$watch("select", function (e, t) {
            //修改选择项目
            var o, l, u, s, i, g;
            for (g = [], o = [], u = [], s = 0, i = e.length; i > s; s++)l = e[s], g.push(l.c), l.back && o.push(l.c), l.incognito && u.push(l.c);
            return localStorage.set(f, g), localStorage.set(c, o), localStorage.set(a, u), n.reset()
        }, !0)
    }, scope.up = function (index) {
        //上移
        var r;
        if (0 !== index)return r = scope.select[index - 1], scope.select[index - 1] = scope.select[index], scope.select[index] = r
    }, scope.down = function (index) {
        //下移
        var r;
        if (index !== scope.select.length - 1)return r = scope.select[index + 1], scope.select[index + 1] = scope.select[index], scope.select[index] = r
    }, scope.getSelect = function () {
        //获取选择菜单
        var t, n, o, l, u, s, i, g, p, d, h, m, v, b, y, S;
        for (b = [], S = localStorage.get(f), S || (S = []), n = localStorage.get(c), n || (n = []), o = localStorage.get(a), o || (o = []), l = 0, i = S.length; i > l; l++)for (y = S[l], h = [scope.menus, scope.group], u = 0, g = h.length; g > u; u++)for (t = h[u], s = 0, p = t.length; p > s; s++)if (d = t[s], d.c === y) {
            d.select = !0, d.back = (m = d.c, indexOf.call(n, m) >= 0), d.incognito = (v = d.c, indexOf.call(o, v) >= 0), b.push(d);
            break
        }
        return b
    }, scope.showMenu = function (menu) {
        return "all" === menu.l || scope[menu.l]
    }, scope.show = function (menu) {
        //根据代码显示标题
        var r, n, o, l, u;
        for (l = [scope.menus, scope.custom, scope.group], n = 0, o = l.length; o > n; n++)if (r = l[n], u = findArray(r, "c", menu))return u;
        return null
    }, scope.change = function (menu) {
        //改变菜单选择
        return menu.select ? (menu.back = !1, menu.incognito = !1, scope.select.push(menu)) : JU.removeArray(scope.select, menu), 1
    }, scope.unSelect = function (menu) {
        //取消选择
        return menu.select = !1, JU.removeArray(scope.select, menu)
    }, scope.newGroup = {g: [], c: "", t: ci18n.get("Group")},
        scope.addGroup = function (menu) {
        //创建自定义组合
        return menu.g && menu.g.length > 0 && scope.f_group.$valid ? (menu.n = menu.c, menu.l = "all", scope.group.push(menu),
            scope.newGroup = angular.copy({}),
            $("#g_select_chzn ul.chzn-choices").children("li.search-choice").remove(),
            $("#g_title").focus(),
            ga("send", "event", "group", menu.c)) : void 0
    }, scope.delGroup = function (menu) {
        //删除组合
        return u.confirm("r_del", function () {
            return menu.select && (menu.select = !1, scope.change(menu)), scope.group.splice(scope.group.indexOf(menu), 1)
        })
    }, scope.newCustom = {c: "", u: "", r: "", t: ci18n.get("Custom")}, scope.addCustom = function () {
        //创建自定义菜单
        var t;
        return scope.f_custom.$valid ? (t = scope.newCustom,
            t.n = t.c,
            t.l = "all",
            t.u = t.u.replace("%CB%D1%CB%F7%CE%C4%D7%D6", "%g"),
            t.u = t.u.replace("%B7j%AF%C1%A4%E5%A6r", "%t"),
            t.u = t.u.replace("%E6%90%9C%E7%B4%A2%E6%96%87%E5%AD%97", "%s"),
            t.u = t.u.replace("搜索文字", "%s"),
            t.u = t.u.replace(/SEARCHTEXT/i, "%s"), scope.custom.push(angular.copy(t)), scope.newCustom = angular.copy({t: ci18n.get("Custom")})) : void 0
    }, scope.delCustom = function (menu) {
        //删除自定义
        return u.confirm("r_del", function () {
            return menu.select && (menu.select = !1, scope.change(menu)), scope.custom.splice(scope.custom.indexOf(menu), 1)
        })
    }, scope.putDialog = function (url) {
        //弹出上传窗口
        var r;
        return r = l.open({
            backdrop: !0,
            keyboard: !0,
            backdropClick: !0,
            templateUrl: "/template/options/putUrl.html",
            controller: "PutCtrl",
            resolve: {
                url: function () {
                    return angular.copy(url)
                }, type: function () {
                    return scope.type
                }
            }
        }), r.result.then(function (e) {
            return e && ("ok" === e && u.alert("Shared success"), "have" === e && u.alert("Already contained"), "error" === e) ? alert(ci18n.get("error")) : void 0
        })
    }, scope.getMenus = function () {
        var t;
        return t = l.open({
            backdrop: !0,
            keyboard: !0,
            backdropClick: !0,
            size: "lg",
            templateUrl: "/template/options/menus.html",
            controller: "MenusCtrl",
            resolve: {
                type: function () {
                    return scope.type
                }, groups: function () {
                    return scope.groups
                }
            }
        }),
            t.result.then(function (result) {
                //下载菜单json的返回数据进行格式转换，字母替换(mock init.json)
            var menus, n, l, u, c, s, i, menu, g;
            if (result && "close" !== result) {
                for (menus = JU.lsGet("all", []), l = 0, c = result.length; c > l; l++)for (i = result[l], menu = {
                    n: i.C, //中文名
                    c: i.C, //英文名，会用作key
                    t: i.T, //菜单分类：通用、啥啥啥
                    m: i.M, //菜单类型：页面菜单、划词菜单、图片菜单、链接菜单
                    u: i.U, //URl地址
                    l: i.L, //语言版本
                    h: i.H, //简介
                    k: i.K, //作者
                    v: i.V,//积分排名排序

                    r: i.R //url匹配正则
                }, menus.push(menu), g = scope.groups, u = 0, s = g.length; s > u; u++)if (n = g[u], n.label === ci18n.get(i.T)) {
                    menu.n = ci18n.get(menu.c), n.items.push(menu);
                    break
                }
                return JU.lsSet("all", menus)
            }
        })
    }, scope.update = function (menu) {
        //弹出编辑窗口
        var r;
        return r = l.open({
            backdrop: !0,
            keyboard: !0,
            backdropClick: !0,
            templateUrl: "/template/options/editMenu.html",
            controller: "EditCtrl",
            resolve: {
                menu: function () {
                    return angular.copy(menu)
                }
            }
        }), r.result.then(function (r) {
            if (r) {
                if ("del" === r)return scope.remove(menu);
                if ("close" !== r && menu.n !== r)return menu.n = r, scope.names[menu.c] = r
            }
        })
    },
        scope.init(),
        scope.remove = function (menu) {
        //删除菜单
        var r, n, o, l, u, c, s, i, a, g, f;
        for (menu.select = !1, JU.removeArray(scope.select, menu), a = scope.groups, l = 0, c = a.length; c > l; l++)n = a[l], JU.removeArray(n.items, menu);
        for (r = JU.lsGet("all", []), i = JU.findArray(r, "c", menu.c), JU.removeArray(r, i), JU.lsSet("all", r), g = scope.group, f = [], u = 0, s = g.length; s > u; u++)o = g[u], f.push(function () {
            var e, r, l, u;
            for (l = o.g, u = [], e = 0, r = l.length; r > e; e++)n = l[e], n.c === menu.c ? u.push(JU.removeArray(o.g, n)) : u.push(void 0);
            return u
        }());
        return f
    }
}]), ctrls.controller("PopupMenuCtrl", ["$scope", "$stateParams", "localStorageService", "$menu", "i18n", "$modal", "dialog", function (scope, t, localStorage, n, ci18n, l, u) {
    var typeBack, typeCustom, typecGroup, typeIncognito, typeSelect;
    //下面是拼localStorage的key的
    return scope.type = t.type = "popup",
        menutype = scope.type.toUpperCase(),
        typeSelect = t.type + "Select",
        typeBack = t.type + "Back",
        typeIncognito = t.type + "Incognito",
        typeCustom = t.type + "Custom",
        typecGroup = t.type[0] + "cGroup",
        localStorage.bind(scope, "popupnames", {}),
        scope.size = (window.innerHeight - 80) / 60,
        localStorage.bind(scope, "popupMenu", [{"C":"i_title","T":"all","M":"MEN","U":"template/options/options.html","L":"all","H":"这个是简介","K":"筑梦者","R":["http://*/*","https://*/*","ftp://*/*"],"V":36},{"C":"baiduaaa","T":"all","M":"MEN","U":"http://baidu.com","L":"all","H":"这个是简介","K":"筑梦者","R":["http://*/*","https://*/*","ftp://*/*"],"V":36}]),
        scope.isHideIcon = function (t) {
            //判断是否是自定义
            var r, n, o, l, u;
            for (n = !1, u = scope.custom, o = 0, l = u.length; l > o; o++)r = u[o], t.c === r.c && (n = !0);
            return n || "g"in t || !scope.isEdit
        }, scope.menuI18n = function (menus, names) {
        //翻译菜单
        var r, n, menu, u, ci18nmenus;
        console.log("i18n local", ci18n.locale());//log打印当前本地语言
        for (ci18nmenus = [], r = 0, n = menus.length; n > r; r++) {
            menu = menus[r];
            u = ci18n.get(menu.c, menu.n);
            menu.c in names && (u = names[menu.c]);
            ci18nmenus.push({
                t: ci18n.get(menu.t), //翻译后的菜单类型
                n: u, //翻译后的标题
                b: menu.b,
                c: menu.c,
                i: menu.i,
                h: menu.h,
                k: menu.k,
                m: menu.m,
                l: menu.l,
                s: menu.s,
                u: menu.u,
                v: menu.v,
                r: menu.r
            });
        }
        return ci18nmenus
    }, scope.updateCustom = function (e) {
        //创建自定义对象
        var t, r, n, l;
        for (e || (e = []), l = [], r = 0, n = e.length; n > r; r++){
            t = e[r];
            l.push({
                c: t[0],
                l: "all",
                u: t[1],
                r: t[2]&& $.isArray(t[2])?t[2]:[],
                t: ci18n.get("Custom")
            });
        }
        return l;
    }, scope.init = function () {
        var t, l, u, p, d;
        for (console.log("popupmenu init"),
                 l = JU.lsGet("all", []),
                 scope.allUrls = scope.menuI18n(l, scope.popupnames),
                 scope.urls = [],
                 d = scope.allUrls,
                 u = 0,
                 p = d.length; p > u; u++) {
            t = d[u];
            t.m === menutype && scope.urls.push(t);
        }
        return  scope.groups = sumGroup(JU.groupBy(scope.urls, "t")),
            scope.custom = scope.updateCustom(localStorage.get(typeCustom)),
            scope.menus = scope.custom.concat(scope.urls),
            scope.groups.push({
                label: ci18n.get("Custom"),
                items: scope.custom
            }),
            scope.group = updateGroup(localStorage.get(typecGroup), scope.menus),
            scope.select = scope.getSelect(),
            scope.groups.push({
                label: ci18n.get("Group"),
                items: scope.group
            }),
            showSelect(scope.select, scope.groups),
            scope.$watch("group", function (t, n) {
                var o, u, c, s, a, g, f, p, d, h, m;
                if (scope.f_group_old.$valid) {
                    for (c = 0, a = t.length; a > c; c++){
                        p = t[c], p.n = p.c;
                    }
                    for (l = [], s = 0, g = t.length; g > s; s++) {
                        for (o = t[s], m = [], h = o.g, d = 0, f = h.length; f > d; d++)u = h[d], m.push(u.c);
                        l.push([o.c, m]);
                    }
                    return localStorage.set(typecGroup, l);
                }
            }, !0),
            scope.$watch("custom", function (t, n) {
                //修改自定义菜单
                var customMenu, l, u, c;
                if (scope.f_custom_old.$valid) {
                    for (l = 0, u = t.length; u > l; l++)c = t[l], c.n = c.c;
                    return localStorage.set(typeCustom, function () {
                        var e, r, customMenus;
                        for (customMenus = [], e = 0, r = t.length; r > e; e++) {
                            customMenu = t[e];
                            customMenus.push([
                                customMenu.c,
                                customMenu.u,
                                customMenu && customMenu.r ?
                                    ((typeof customMenu.r == "string") ? customMenu.r.split(",") : ($.isArray(customMenu.r)?customMenu.r:[])):[]]);
                        }
                        return customMenus;
                    }()), scope.menus = t.concat(scope.urls)
                }
            }, !0),
            scope.$watch("select", function (e, t) {
                //修改选择项目
                var o, l, u, s, i, g;
                for (g = [], o = [], u = [], s = 0, i = e.length; i > s; s++)l = e[s], g.push(l.c), l.back && o.push(l.c), l.incognito && u.push(l.c);
                return localStorage.set(typeSelect, g), localStorage.set(typeBack, o), localStorage.set(typeIncognito, u), n.reset()
            }, !0)
    }, scope.up = function (index) {
        //上移
        var r;
        if (0 !== index)return r = scope.select[index - 1], scope.select[index - 1] = scope.select[index], scope.select[index] = r
    }, scope.down = function (index) {
        //下移
        var r;
        if (index !== scope.select.length - 1)return r = scope.select[index + 1], scope.select[index + 1] = scope.select[index], scope.select[index] = r
    }, scope.getSelect = function () {
        //获取选择菜单
        var t, n, o, l, u, s, i, g, p, d, h, m, v, b, y, S;
        for (b = [], S = localStorage.get(typeSelect), S || (S = []), n = localStorage.get(typeBack), n || (n = []), o = localStorage.get(typeIncognito), o || (o = []), l = 0, i = S.length; i > l; l++)for (y = S[l], h = [scope.menus, scope.group], u = 0, g = h.length; g > u; u++)for (t = h[u], s = 0, p = t.length; p > s; s++)if (d = t[s], d.c === y) {
            d.select = !0, d.back = (m = d.c, indexOf.call(n, m) >= 0), d.incognito = (v = d.c, indexOf.call(o, v) >= 0), b.push(d);
            break
        }
        return b
    }, scope.showMenu = function (menu) {
        return "all" === menu.l || scope[menu.l]
    }, scope.show = function (menu) {
        //根据代码显示标题
        var r, n, o, l, u;
        for (l = [scope.menus, scope.custom, scope.group], n = 0, o = l.length; o > n; n++)if (r = l[n], u = findArray(r, "c", menu))return u;
        return null
    }, scope.change = function (menu) {
        //改变菜单选择
        return menu.select ? (menu.back = !1, menu.incognito = !1, scope.select.push(menu)) : JU.removeArray(scope.select, menu), 1
    }, scope.unSelect = function (menu) {
        //取消选择
        return menu.select = !1, JU.removeArray(scope.select, menu)
    }, scope.newGroup = {g: [], c: "", t: ci18n.get("Group")},
        scope.addGroup = function (menu) {
            //创建自定义组合
            return menu.g && menu.g.length > 0 && scope.f_group.$valid ? (menu.n = menu.c, menu.l = "all", scope.group.push(menu),
                scope.newGroup = angular.copy({}),
                $("#g_select_chzn ul.chzn-choices").children("li.search-choice").remove(),
                $("#g_title").focus(),
                ga("send", "event", "group", menu.c)) : void 0
        }, scope.delGroup = function (menu) {
        //删除组合
        return u.confirm("r_del", function () {
            return menu.select && (menu.select = !1, scope.change(menu)), scope.group.splice(scope.group.indexOf(menu), 1)
        })
    }, scope.newCustom = {c: "", u: "", r: "", t: ci18n.get("Custom")}, scope.addCustom = function () {
        //创建自定义菜单
        var t;
        return scope.f_custom.$valid ? (t = scope.newCustom,
            t.n = t.c,
            t.l = "all",
            t.u = t.u.replace("%CB%D1%CB%F7%CE%C4%D7%D6", "%g"),
            t.u = t.u.replace("%B7j%AF%C1%A4%E5%A6r", "%t"),
            t.u = t.u.replace("%E6%90%9C%E7%B4%A2%E6%96%87%E5%AD%97", "%s"),
            t.u = t.u.replace("搜索文字", "%s"),
            t.u = t.u.replace(/SEARCHTEXT/i, "%s"), scope.custom.push(angular.copy(t)), scope.newCustom = angular.copy({t: ci18n.get("Custom")})) : void 0
    }, scope.delCustom = function (menu) {
        //删除自定义
        return u.confirm("r_del", function () {
            return menu.select && (menu.select = !1, scope.change(menu)), scope.custom.splice(scope.custom.indexOf(menu), 1)
        })
    }, scope.putDialog = function (url) {
        //弹出上传窗口
        var r;
        return r = l.open({
            backdrop: !0,
            keyboard: !0,
            backdropClick: !0,
            templateUrl: "/template/options/putUrl.html",
            controller: "PutCtrl",
            resolve: {
                url: function () {
                    return angular.copy(url)
                }, type: function () {
                    return scope.type
                }
            }
        }), r.result.then(function (e) {
            return e && ("ok" === e && u.alert("Shared success"), "have" === e && u.alert("Already contained"), "error" === e) ? alert(ci18n.get("error")) : void 0
        })
    }, scope.getMenus = function () {
        var t;
        return t = l.open({
            backdrop: !0,
            keyboard: !0,
            backdropClick: !0,
            size: "lg",
            templateUrl: "/template/options/menus.html",
            controller: "MenusCtrl",
            resolve: {
                type: function () {
                    return scope.type
                }, groups: function () {
                    return scope.groups
                }
            }
        }),
            t.result.then(function (result) {
                //下载菜单json的返回数据进行格式转换，字母替换(mock init.json)
                var menus, n, l, u, c, s, i, menu, g;
                if (result && "close" !== result) {
                    for (menus = JU.lsGet("all", []), l = 0, c = result.length; c > l; l++)for (i = result[l], menu = {
                        n: i.C, //中文名
                        c: i.C, //英文名，会用作key
                        t: i.T, //菜单分类：通用、啥啥啥
                        m: i.M, //菜单类型：页面菜单、划词菜单、图片菜单、链接菜单
                        u: i.U, //URl地址
                        l: i.L, //语言版本
                        h: i.H, //简介
                        k: i.K, //作者
                        v: i.V,//积分排名排序

                        r: i.R //url匹配正则
                    }, menus.push(menu), g = scope.groups, u = 0, s = g.length; s > u; u++)if (n = g[u], n.label === ci18n.get(i.T)) {
                        menu.n = ci18n.get(menu.c), n.items.push(menu);
                        break
                    }
                    return JU.lsSet("all", menus)
                }
            })
    }, scope.update = function (menu) {
        //弹出编辑窗口
        var r;
        return r = l.open({
            backdrop: !0,
            keyboard: !0,
            backdropClick: !0,
            templateUrl: "/template/options/editMenu.html",
            controller: "EditCtrl",
            resolve: {
                menu: function () {
                    return angular.copy(menu)
                }
            }
        }), r.result.then(function (r) {
            if (r) {
                if ("del" === r)return scope.remove(menu);
                if ("close" !== r && menu.n !== r)return menu.n = r, scope.names[menu.c] = r
            }
        })
    },
        scope.init(),
        scope.remove = function (menu) {
            //删除菜单
            var r, n, o, l, u, c, s, i, a, g, f;
            for (menu.select = !1, JU.removeArray(scope.select, menu), a = scope.groups, l = 0, c = a.length; c > l; l++)n = a[l], JU.removeArray(n.items, menu);
            for (r = JU.lsGet("all", []), i = JU.findArray(r, "c", menu.c), JU.removeArray(r, i), JU.lsSet("all", r), g = scope.group, f = [], u = 0, s = g.length; s > u; u++)o = g[u], f.push(function () {
                var e, r, l, u;
                for (l = o.g, u = [], e = 0, r = l.length; r > e; e++)n = l[e], n.c === menu.c ? u.push(JU.removeArray(o.g, n)) : u.push(void 0);
                return u
            }());
            return f
        }
}]), ctrls.controller("MenusCtrl", ["$scope", "localStorageService", "$modalInstance", "$http", "dialog", "i18n", "NgTableParams", "$q", "type", "groups", function (e, t, r, n, o, l, u, c, s, groups) {
    //下载新菜单弹窗
    return e.typeValue = ["all", "new", "chrome", "pic", "ui", "mp3", "movie", "book", "fy", "comic", "shop", "sns", "utils", "Custom"],
        e.lname = l.get("Name"),
        e.ltype = l.get("Type"),
        e.lurl = l.get("URL"),
        e.lcount = l.get("Points"),
        console.log(e.lname),
        e.menus = [],
        //n.get("http://oldbean.cn/cm/menus").success(function (t) {
        $.ajax("http://qa.corp.qunar.com/easypublish/qatoolschrome/menus.shtml").success(function (menusjson) {
            var r, n, o, l, c, a, g, f, menu, d, h;
            for (l = 0, a = menusjson.length; a > l; l++) {
                if (menu = menusjson[l], menu.M === s.toUpperCase()) {
                    for (r = !0, c = 0, g = groups.length; g > c; c++)
                        for (n = groups[c], h = n.items, d = 0, f = h.length; f > d; d++)
                            o = h[d],
                            o.c === menu.C && (r = !1);
                    r && e.menus.push(menu)
                }
            }
            return e.tableParams = new u({page: 1, count: 10, sorting: {V: "desc"}}, {filterDelay: 0, data: e.menus})
        }).error(function (err) {
            n.get("/init.json").success(function (menusjson) {
                var r, tmpgroup, o, l, c, a, g, f, menu, d, h;
                for (l = 0, a = menusjson.length; a > l; l++) {
                    menu = menusjson[l];
                    if (menu.M === s.toUpperCase()
                    /*|| s === "popup" && menu.M === "MEN"*/) {
                        for (r = true, c = 0, g = groups.length; g > c; c++)
                            for (tmpgroup = groups[c], h = tmpgroup.items, d = 0, f = h.length; f > d; d++)
                                o = h[d],
                                o.c === menu.C && (r = false);
                        r && e.menus.push(menu);
                    }
                }
                return e.tableParams = new u({page: 1, count: 10, sorting: {V: "desc"}}, {filterDelay: 0, data: e.menus})
            }).error(function (error) {
                return o.error("Server Error")
            });
    }), e.selectLanguage = function () {
        var e, t, r, n, o;
        for (t = c.defer(), e = [], r = 0, o = LANGUAGE.length; o > r; r++)n = LANGUAGE[r], e.push({
            id: n,
            title: l.get(n)
        });
        return t.resolve(e), t
    }, e.selectType = function () {
        var t, r, n, o, u, s;
        for (r = c.defer(), t = [], s = e.typeValue, n = 0, u = s.length; u > n; n++)o = s[n], t.push({
            id: o,
            title: l.get(o)
        });
        return r.resolve(t), r
    }, e.num = 0,
        e.$watch("menus", function (t, r) {
            //监听菜单变化
        var n, o, l, u;
        for (e.num = 0, u = [], n = 0, o = t.length; o > n; n++)
            l = t[n],
            l.s ? u.push(e.num++) : u.push(void 0);
        return u
    }, !0), e.check = function (e) {
        return e.indexOf("://") > 0
    }, e.close = function () {
        //下载新菜单里面的关闭按钮
        return r.close("close")
    }, e.down = function () {
        //下载新菜单里面的下载按钮
        var t, n, o, l, u;
        for (u = [], l = e.menus, t = 0, n = l.length; n > t; t++)o = l[t], o.s && u.push(o);
        return r.close(u)
    }
}]), ctrls.controller("PutCtrl", ["$scope", "$http", "localStorageService", "$modalInstance", "dialog", "url", "type", function (scope, t, r, n, o, l, u) {
    //弹出上传窗口
    return scope.type = u.toUpperCase(), scope.name = l.c, scope.url = l.u, r.bind(scope, "nick", ""), scope.title = "", scope.locale = r.get("locale"), scope.close = function () {
        return console.log("close"), n.close("close")
    }, scope.put = function () {
        //return t.post("http://oldbean.cn/cm/url", {
        return t.post("http://qa.corp.qunar.com/easypublish/qatoolschrome/url.shtml", {
            name: scope.name,
            url: scope.url,
            nick: scope.nick,
            title: scope.title,
            hl: scope.locale,
            mode: scope.type
        }).success(function (e, t, r, o) {
            return n.close(e)
        }).error(function (e, t, r, n) {
            return o.error("Server Error")
        })
    }
}]), ctrls.controller("EditCtrl", ["$scope", "localStorageService", "$modalInstance", "dialog", "menu", function (scope, t, modalInstance, n, menu) {
    //右键菜单编辑弹窗
    //初始化弹窗里面的值，从localStorage里面取
    return scope.menu = menu,
        scope.name = menu.n,
        scope.title = menu.h,
        scope.nick = menu.k,
        scope.regular = (menu.r ? menu.r.join(" , ") : ""),
        scope.close = function () {
            return modalInstance.close("close")
    }, scope.save = function () {
        return modalInstance.close(scope.name), n.alert("Save success")
    }, scope.del = function () {
        return n.confirm("Are you sure delete this menu?", function () {
            return modalInstance.close("del")
        })
    }
}]), ctrls.controller("AboutCtrl", ["$scope", function (e) {
    return console.log("about", e.locale)
}]), ctrls.controller("SettingsCtrl", ["$scope", "$http", "localStorageService", "$menu", "dialog", function (e, t, r, n, o) {
    //初始化设置localStorage里面的变量值
    return r.bind(e, "lt1", "1")
        , r.bind(e, "lt2", "1")
        , r.bind(e, "rt1", "1")
        , r.bind(e, "rt2", "2")
        , r.bind(e, "lb1", "2")
        , r.bind(e, "lb2", "1")
        , r.bind(e, "rb1", "2")
        , r.bind(e, "rb2", "2")
        , r.bind(e, "qr_size", 250)
        , r.bind(e, "isEdit", !0)
        , r.bind(e, "isFlag", !0)
        , r.bind(e, "opt_item_notification", 3000)
        , r.bind(e, "analytics", !0)
        , r.bind(e, "back", !1)
        , r.bind(e, "newPage", !0)
        , r.bind(e, "phrase", ""), e.alerts = [], e.all = [], e.showName = function (t) {
        var r, n, o, l;
        for (l = e.all, r = 0, n = l.length; n > r; r++)if (o = l[r], o.c === t)return o.n;
        return "None"
    }, r.bind(e, "shorten", "googl"), e.read = function () {
        return e.bakstr = JSON.stringify(localStorage)
    }, e.load2 = function () {
        return o.confirm("Are you sure Load Settings?", function () {
            var t, r;
            if (t = JSON.parse(e.bakstr), "object" == typeof t) {
                for (r in localStorage)r in t && (localStorage[r] = t[r]);
                n.reset()
            } else o.error("Settings string error");
            return !0
        })
    }, e.load = function () {
        return e.bak.$valid ? o.confirm("Are you sure Load Settings?", function () {
            return t.get("http://qa.corp.qunar.com/easypublish/qatoolschrome/settings.shtml?phrase=" + hex_sha1(e.phrase)).success(function (t, r, l, u) {
                var c;
                if ("error" === t || "" === t)return void o.error("Server Error");
                if ("object" == typeof t) {
                    for (c in t)localStorage[c] = t[c];
                    return o.alert("Load Settings"), n.reset(), e.initLocal()
                }
                return o.error("The wrong pass phrase")
            }).error(function (e, t, r, n) {
                return o.error("The wrong pass phrase")
            })
        }) : void 0
    }, e.save = function (n) {
        return null == n && (n = !0), e.bak.$valid ? (r.set("phrase", e.phrase), t.post("http://qa.corp.qunar.com/easypublish/qatoolschrome/settings.shtml?phrase=" + hex_sha1(e.phrase), localStorage).success(function (e, t, r, l) {
            return "ok" === e && n ? o.alert("Save Settings") : void 0
        }).error(function (e, t, r, n) {
            return o.alert("The wrong pass phrase")
        })) : void 0
    }, console.log("settings")
}]), ctrls.controller("SetOptionsCtrl", ["$scope", "$http", "localStorageService", "$menu", "dialog", function (e, t, r, n, o) {
    //初始化【选项配置】页面
    baidu.feOption.init();
    //初始化设置localStorage里面的变量值，若没有人工配置则插入
    return r.bind(e, "opt_item_contextMenus", true),
        r.bind(e, "opt_item_notification", 3000),
        e.alerts = [],
        e.all = [],
        e.showName = function (t) {
            var r, n, o, l;
            for (l = e.all, r = 0, n = l.length; n > r; r++)
                if (o = l[r], o.c === t)return o.n;
            return "None"
        },console.log("settings");
}]), utilsDirectives.directive("enter", function () {
    return function (e, t, r) {
        return t.bind("keydown", function (t) {
            var n;
            return 13 === t.keyCode ? r.enter ? e.$apply(r.enter) : (t.preventDefault(), n = $("input").index(this) + 1, $("input:eq(" + n + ")").focus()) : void 0
        })
    }
}), utilsDirectives.directive("integer", function () {
    var e;
    return e = /^\-?\d*$/, {
        require: "ngModel", link: function (t, r, n, o) {
            return o.$parsers.unshift(function (t) {
                return e.test(t) ? (o.$setValidity("integer", !0), t) : void o.$setValidity("integer", !1)
            })
        }
    }
}), utilsDirectives.directive("json", function () {
    return {
        replace: !0, template: "<span>{{ value }}</span>", restrict: "E", link: function (e, t, r) {
            var n, o;
            if (n = r.url) {
                o = new XMLHttpRequest, o.open("GET", chrome.extension.getURL(n)), o.onreadystatechange = function () {
                    var t;
                    return 4 === this.readyState && this.responseText && (t = r.key) ? e.value = JSON.parse(this.responseText)[t] : void 0
                };
                try {
                    return o.send()
                } catch (l) {
                }
            }
        }
    }
}), services.factory("$menu", [function () {
    var e;
    return console.log("menu service"), e = function () {
        //重置菜单
        return console.log("menu reset"), chrome.runtime.getBackgroundPage(function (backgroundPage) {
            return backgroundPage.menuReset()
        })
    }, {reset: e}
}]), services.factory("dialog", ["$modal", "$rootScope", "i18n", function (e, t, r) {
    var n;
    return console.log("dialog service"), n = function (r, n, o, l, u) {
        var c;
        return null == n && (n = "alert"), null == o && (o = "Close"), null == l && (l = ""), c = t.$new(!0), c.msg = r, c.type = n, c.closeTxt = o, c.other = l, c.close = function () {
            return c.modalInstance.close(c)
        }, c.cb = function () {
            return u() ? c.close() : void 0
        }, c.modalInstance = e.open({
            backdrop: !0,
            keyboard: !0,
            backdropClick: !0,
            templateUrl: "/template/options/dialog.html",
            scope: c,
            size: "sm"
        })
    }, {
        alert: function (e) {
            return n(e, "Alert")
        }, error: function (e) {
            return n(e, "Error")
        }, confirm: function (e, t, r, o) {
            return null == r && (r = "No"), null == o && (o = "Yes"), n(e, "Confirm", r, o, t)
        }
    }
}]), services.factory("i18n", ["localStorageService", function (e) {
    var t, r, n;
    return t = e.get("locale"), t || (t = "zh_CN"), n = function (e, t) {
        return e ? e : t
    }, r = function (e, r) {
        return null == r && (r = e), n(TRANSLATIONS[t][e], r)
    }, {
        setLocale: function (e) {
            return t = e
        }, locale: function () {
            return t
        }, get: r
    }
}]), angular.module("cm.directives", []).directive("menucode", function () {
    return {
        require: "ngModel", link: function (e, t, r, n) {
            return n.$parsers.unshift(function (t) {
                var r, o, l, u, c, s, i, a;
                for (r = !1, i = [e.allUrls, e.custom, e.group], o = 0, u = i.length; u > o; o++)for (a = i[o], l = 0, c = a.length; c > l; l++)s = a[l], s.c === t && (r = !0);
                return r ? void n.$setValidity("menucode", !1) : (n.$setValidity("menucode", !0), t)
            })
        }
    }
});
$(function(){
    $(".nav.navbar-nav").children("li").click(function(){
        var thisli = $(this);
        var rightmenusli = $("#rightmenusli");
        if(thisli != rightmenusli && rightmenusli.hasClass("active")){
            rightmenusli.removeClass("active");
        }
    });
});