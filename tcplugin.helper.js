if (TheCity == null || typeof(TheCity) != "object") { var TheCity = {}; }

TheCity.PluginHelper = function() {

    $(document).data('TheCity.PluginHelper.Settings',{
        subdomain: 'www',
        useSSL: false,
        extra: 50,
        refresh: 250
    });

    // Cross Domain Post Message
    var cache_bust = 1, window = this;
    var crossDomainPostMessage = function(message, target_url, target) {
        if (!target_url) return;
        target = target || parent;
        if (window['postMessage']){
            target['postMessage'](message, target_url.replace( /([^:]+:\/\/[^\/]+).*/, '$1'));
            return true;
        }
        else if (target_url){
            target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date) + (cache_bust++) + '&' + message;
            return true;
        }
    };

    return {
        // resize the containing IFrame to be tall enough to display all the content
        // in the child document
        initPlugin: function(subdomain) {
            var src = 'https://' + subdomain + '.onthecity.org/#' + encodeURIComponent(document.location.href);
            var documentHeight = $(document).height();
            crossDomainPostMessage(documentHeight, src, frames[0]);
        },

        resizeIFrame: function(options) {
            //Merge previous settings w/ passed options
            var settings = $.extend(
                $(document).data('TheCity.PluginHelper.Settings'),
                options
            );

            //Check to see if height has changed since last call -- if NOT and height > 0
            //This prevents an infinite loop where we keep expanding the iFrame size. We test for a difference of
            // > 50 because (at least on Chrome) an extra ~30 pixels are added to the height AFTER we've stored the new height
            var diff = Math.abs($(document).data('TheCity.PluginHelper.documentHeight') - $(document).height()) ;
            if ( diff < 50 && $(document).height()) {
                return;
            }

            //Overwrite saved settings with new ones
            $(document).data('TheCity.PluginHelper', settings);
            var schema = settings.useSSL ? "https" : "http";
            var src = schema + '://' + settings.subdomain + '.onthecity.org/#' + encodeURIComponent(document.location.href);
            if (crossDomainPostMessage($(document).height() + settings.extra, src, frames[0]) === true && settings.refresh !=0){
                $(document).data('TheCity.PluginHelper.documentHeight', $(document).height());
                setInterval(function(){TheCity.PluginHelper.resizeIFrame();}, settings.refresh);
            }
        }

    };
}();