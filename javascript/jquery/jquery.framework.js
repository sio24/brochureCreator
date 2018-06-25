﻿/* http://keith-wood.name/pluginFramework.html
   Plugin framework code.
   Written by Keith Wood (kwood{at}iinet.com.au) February 2013.
   Available under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

/* Plugin manager. */
function Plugin() {
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[''] = { // Default regional settings (English/US)
		sampleText: 'maximum'
	};
	this._defaults = {
		sample: 100 // Maximum length
	};
	$.extend(this._defaults, this.regional['']);
}

$.extend(Plugin.prototype, {
	/* Class name added to elements to indicate already configured by this plugin. */
	markerClassName: 'hasPluginName',
	/* Name of the data property for instance settings. */
	propertyName: 'pluginName',

	/* Override the default settings for all plugin instances.
	   @param  options  (object) the new settings to use as defaults
	   @return  (Plugin) this object */
	setDefaults: function(options) {
		$.extend(this._defaults, options || {});
		return this;
	},

	/* Attach the plugin functionality.
	   @param  target   (element) the control to affect
	   @param  options  (object) the custom options for this instance */
	_attachPlugin: function(target, options) {
		target = $(target);
		if (target.hasClass(this.markerClassName)) {
			return;
		}
		var inst = {options: $.extend({}, this._defaults)};
		target.addClass(this.markerClassName).
			data(this.propertyName, inst);
		// Add event handlers for the target element if applicable,
		// using namespace this.propertyName
		this._optionPlugin(target, options);
	},

	/* Retrieve or reconfigure the settings for a control.
	   @param  target   (element) the control to affect
	   @param  options  (object) the new options for this instance or
	                    (string) an individual property name
	   @param  value    (any) the individual property value (omit if options
	                    is an object or to retrieve the value of a setting)
	   @return  (any) if retrieving a value */
	_optionPlugin: function(target, options, value) {
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
	_methodPlugin: function(target) {
		var inst = target.data(this.propertyName);
		// Implement functionality here
	},

	/* Enable the control.
	   @param  target  (element) the control to affect */
	_enablePlugin: function(target) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		target.prop('disabled', false).removeClass(this.propertyName + '-disabled');
		var inst = target.data(this.propertyName);
		// Additional changes here
	},

	/* Disable the control.
	   @param  target  (element) the control to affect */
	_disablePlugin: function(target) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		target.prop('disabled', true).addClass(this.propertyName + '-disabled');
		var inst = target.data(this.propertyName);
		// Additional changes here
	},

	/* Remove the plugin functionality from a control.
	   @param  target  (element) the control to affect */
	_destroyPlugin: function(target) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		var inst = target.data(this.propertyName);
		// Undo attachment and option changes
		target.removeClass(this.markerClassName).
			removeData(this.propertyName).
			unbind('.' + this.propertyName);
	}
});

// The list of methods that return values and don't permit chaining
var getters = [];

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
$.fn.pluginname = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (isNotChained(options, otherArgs)) {
		return plugin['_' + options + 'Plugin'].apply(plugin, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
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
var plugin = $.pluginname = new Plugin(); // Singleton instance

})(jQuery);
