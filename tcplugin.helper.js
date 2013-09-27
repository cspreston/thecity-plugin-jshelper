if (TheCity == null || typeof(TheCity) != "object") { var TheCity = {}; }

TheCity.PluginHelper = function() {
		
	// Cross Domain Post Message 
	var cache_bust = 1, window = this;
	var crossDomainPostMessage = function(message, target_url, target) {
		if (!target_url) return;
		target = target || parent;
		if (window['postMessage']) target['postMessage'](message, target_url.replace( /([^:]+:\/\/[^\/]+).*/, '$1'));
		else if (target_url) target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date) + (cache_bust++) + '&' + message;
	};
	
    return {
		// resize the containing IFrame to be tall enough to display all the content
		// in the child documemnt
		initPlugin: function(subdomain) {
			var src = 'https://' + subdomain + '.onthecity.org/#' + encodeURIComponent(document.location.href);
			var documentHeight = $(document).height();
			crossDomainPostMessage(documentHeight, src, frames[0]);
		}
    };
}();