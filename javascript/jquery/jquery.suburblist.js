/* http://keith-wood.name/pluginFramework.html
   Plugin framework code.
   Written by Keith Wood (kwood{at}iinet.com.au) February 2013.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */

(function ($) { // Hide scope, no $ conflict

    /* Plugin manager. */
    function SuburbList() {
        //this.regional = []; // Available regional settings, indexed by language code
        //this.regional[''] = { // Default regional settings (English/US)
        //    sampleText: 'maximum'
        //};
        this._defaults = {
            collapse: true, // "true" to keep expanded (like DIV) / "false" to collapse (like SELECT)
            onSelect: null // Callback when selecting
        };
        //$.extend(this._defaults, this.regional['']);
    }

    $.extend(SuburbList.prototype, {
        /* Class name added to elements to indicate already configured by this plugin. */
        markerClassName: 'suburblist-container',
        /* Name of the data property for instance settings. */
        propertyName: 'suburblist',

        /* Override the default settings for all plugin instances.
           @param  options  (object) the new settings to use as defaults
           @return  (Plugin) this object */
        setDefaults: function (options) {
            $.extend(this._defaults, options || {});
            return this;
        },

        _clearFilter: function (target) {
            target = $(target);
            target.find($(".suburblist-container li")).each(function () {
                var $li = $(this);
                var isSub = !($li.attr("data-sub") === "");
                $li.removeClass("hidden").addClass(isSub ? "sub" : "main").html($li.attr(isSub ? "data-sub" : "data-main"));
            });
        },
        _clearSelection: function (target) {
            target = $(target);
            target.find($(".selected")).removeClass("selected");
            target.data("selected", "");
            target.find($(".suburblist-display")).text("");
        },
        _psuedoLIClick: function(target, li) {
            var $li = $(li);
            target.find($(".selected")).removeClass("selected");
            $li.addClass("selected");
            var isSub = !($li.attr("data-sub") === "");
            var sub_name = $li.attr(isSub ? "data-sub" : "data-main");
            target.data("selected", sub_name);
            target.find($(".suburblist-display")).text(sub_name);
        },

        /* Attach the plugin functionality.
           @param  target   (element) the control to affect
           @param  options  (object) the custom options for this instance */
        _attachPlugin: function (target, options) {
            target = $(target);
            if (target.hasClass(this.markerClassName)) {
                return;
            }
            this._optionPlugin(target, options);
            var inst = { options: $.extend({}, this._defaults) };
            target.addClass(this.markerClassName);
            target.data(this.propertyName, inst).data({ "height": target.height(), "width": target.width() });
            this._optionPlugin(target, options);
            // Add event handlers for the target element if applicable,
            // using namespace this.propertyName
            // ---

            target.prepend("<input type=\"text\" class=\"suburblist-filter\" title=\"Type part of Suburb name to filter list\" />")
            target.prepend("<div class=\"suburblist-display-div\"><div class=\"suburblist-display\"></div><div class=\"suburblist-down\"></div></div>");
            target.find($("ul")).wrap("<div class=\"suburblist-list-div\"></div>")
            target.find($(".suburblist-filter, .suburblist-list-div")).wrapAll("<div class=\"suburblist-open-div\"></div>");
            target.find($(".suburblist-display")).css({ maxWidth: target.data("width") - target.find($(".suburblist-down")).width() })
            var t = (target.find($(".suburblist-display")).outerHeight(true) * -1) - 2;
            target.find($(".suburblist-open-div")).css({ top: t, display: (inst.options.collapse) ? "none" : "block" });

            target.find($(".suburblist-filter")).css({ width: target.width() - 2 });
            target.find($(".suburblist-list-div")).css({ height: target.data("height") - target.find($(".suburblist-filter")).outerHeight(true) - 2 });
            if (inst.options.collapse) {
                target.height(target.find($(".suburblist-filter")).outerHeight());
            }

            target.find($(".suburblist-display-div")).on("click." + this.propertyName, function (event) {
                event.stopPropagation();
                if (target.find($(".suburblist-open-div")).css("display") == "none") {
                    var t = (target.find($(".suburblist-display")).outerHeight(true) * -1) - 2;
                    target.find($(".suburblist-open-div")).css({ top: t, display: "block" });
                    plugin._selectPlugin(target, target.data("selected"));
                    target.find($(".suburblist-filter")).click().focus();
                }
                else {
                    if (inst.options.collapse) {
                        target.find($(".suburblist-open-div")).css({ display: "none" });
                    }
                }
            });

            $(document).on("click." + this.propertyName, function () {
                if (inst.options.collapse) {
                    target.find($(".suburblist-open-div")).css({ display: "none" });
                }
            });

            target.find($("li")).on("click." + this.propertyName, function (event) {
                event.stopPropagation();
                plugin._psuedoLIClick(target, this);
                if (inst.options.collapse) {
                    target.find($(".suburblist-open-div")).css({ display: "none" });
                }
                if ($.isFunction(inst.options.onSelect)) {
                    inst.options.onSelect.apply(target, [plugin._selectedPlugin(target)]);
                }
            });

            target.find($(".suburblist-filter")).on("keyup." + this.propertyName + " click." + this.propertyName + " input." + this.propertyName + " paste." + this.propertyName, function (event) {
                event.stopPropagation();
                var search_term = $(this).val();
                if (search_term === "") {
                    plugin._clearFilter(target);
                }
                else {
                    var mains = [];
                    var re_search_term = new RegExp(search_term, "gi");
                    target.find($("li")).each(function () {
                        var $this = $(this);
                        var isSub = !($this.attr("data-sub") === "");
                        var sub_name = $this.attr(isSub ? "data-sub" : "data-main");
                        if (sub_name.search(re_search_term) === -1) {
                            $this.html(sub_name).addClass("hidden");
                        }
                        else {
                            $this.html(sub_name.replace(re_search_term, '<span class="hilight">' + search_term.toUpperCase() + '</span>'));
                            $this.removeClass("hidden");
                            if (isSub) {
                                target.find($("li[data-main='" + $this.attr("data-main") + "']")).first().removeClass("hidden");
                            }
                            else {
                                mains.push(sub_name);
                            }
                        }
                    });
                    $.each(mains, function (index, value) {
                        target.find($("li[data-main='" + value + "']")).removeClass("hidden");
                    });
                }
            });

            //target.on("keypress" + this.propertyName, function (event) {
            //    alert(event.which);
            //})

            plugin._clearFilter(target);
            plugin._clearSelection(target);

        },

        /* Retrieve or reconfigure the settings for a control.
           @param  target   (element) the control to affect
           @param  options  (object) the new options for this instance or
                            (string) an individual property name
           @param  value    (any) the individual property value (omit if options
                            is an object or to retrieve the value of a setting)
           @return  (any) if retrieving a value */
        _optionPlugin: function (target, options, value) {
            target = $(target);
            var inst = target.data(this.propertyName);
            if (!options || (typeof options == 'string' && value == null)) { // Get option
                var name = options;
                options = (inst || {}).options;
                return (options && name ? options[name] : options);
            }

            if (!target.hasClass(this.markerClassName)) {
                return;
            }
            options = options || {};
            if (typeof options == 'string') {
                var name = options;
                options = {};
                options[name] = value;
            }
            $.extend(inst.options, options);
            // Update target element based on new options here
            // Run main functionality here, if applicable
        },

        /* Add function for 'method' command.
           Called by $(selector).pluginname('method').
           @param  target  (element) the control to check */
        //_methodPlugin: function (target) {
        //    var inst = target.data(this.propertyName);
        //    // Implement functionality here
        //},
        _selectedPlugin: function (target) {
            //var inst = target.data(this.propertyName);
            return $(target).data("selected");
        },

        _selectPlugin: function (target, sn) {
            var result = sn;
            target = $(target);
            if (sn === "") {
                plugin._clearFilter(target);
                plugin._clearSelection(target);
            }
            else {
                var $li = target.find($('li[data-main="' + sn + '"]')).filter(':first').add(target.find($('li[data-sub="' + sn + '"]')));
                if ($li.length > 0) {
                    var $sod = target.find($(".suburblist-open-div"));
                    if ($sod.css("display") == "block") {
                        $li[0].scrollIntoView();
                        plugin._psuedoLIClick(target, $li);
                    }
                    $(target).data("selected", sn);
                    target.find($(".suburblist-display")).text(sn);
                }
                else {
                    result = 'Error: "' + sn + '" not found.';
                }
            }
            var inst = target.data(this.propertyName);
            if ($.isFunction(inst.options.onSelect)) {
                inst.options.onSelect.apply(target, [result]);
            }
        }

        ///* Enable the control.
        //   @param  target  (element) the control to affect */
        //_enablePlugin: function (target) {
        //    target = $(target);
        //    if (!target.hasClass(this.markerClassName)) {
        //        return;
        //    }
        //    target.prop('disabled', false).removeClass(this.propertyName + '-disabled');
        //    var inst = target.data(this.propertyName);
        //    // Additional changes here
        //},

        ///* Disable the control.
        //   @param  target  (element) the control to affect */
        //_disablePlugin: function (target) {
        //    target = $(target);
        //    if (!target.hasClass(this.markerClassName)) {
        //        return;
        //    }
        //    target.prop('disabled', true).addClass(this.propertyName + '-disabled');
        //    var inst = target.data(this.propertyName);
        //    // Additional changes here
        //},

        ///* Remove the plugin functionality from a control.
        //   @param  target  (element) the control to affect */
        //_destroyPlugin: function (target) {
        //    target = $(target);
        //    if (!target.hasClass(this.markerClassName)) {
        //        return;
        //    }
        //    var inst = target.data(this.propertyName);
        //    // Undo attachment and option changes
        //    target.removeClass(this.markerClassName).
        //        removeData(this.propertyName).
        //        unbind('.' + this.propertyName);
        //}
    });

    // The list of methods that return values and don't permit chaining
    var getters = ["selected"];

    /* Determine whether a method is a getter and doesn't permit chaining.
       @param  method     (string, optional) the method to run
       @param  otherArgs  ([], optional) any other arguments for the method
       @return  true if the method is a getter, false if not */
    function isNotChained(method, otherArgs) {
        if (method == 'option' && (otherArgs.length == 0 ||
                (otherArgs.length == 1 && typeof otherArgs[0] == 'string'))) {
            return true;
        }
        return $.inArray(method, getters) > -1;
    }

    /* Attach the plugin functionality to a jQuery selection.
       @param  options  (object) the new settings to use for these instances (optional) or
                        (string) the method to run (optional)
       @return  (jQuery) for chaining further calls or
                (any) getter value */
    $.fn.suburblist = function (options) {
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (isNotChained(options, otherArgs)) {
            return plugin['_' + options + 'Plugin'].apply(plugin, [this[0]].concat(otherArgs));
        }
        return this.each(function () {
            if (typeof options == 'string') {
                if (!plugin['_' + options + 'Plugin']) {
                    throw 'Unknown method: ' + options;
                }
                plugin['_' + options + 'Plugin'].apply(plugin, [this].concat(otherArgs));
            }
            else {
                plugin._attachPlugin(this, options || {});
            }
        });
    };

    /* Initialise the plugin functionality. */
    var plugin = $.suburblist = new SuburbList(); // Singleton instance

})(jQuery);
