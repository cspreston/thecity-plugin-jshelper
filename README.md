The City PlugIn Helper
======================

##Usage##
 
Insert script in page anywhere after jQuery, then:

```
TheCity.PluginHelper.resizeIFrame({
  subdomain: 'www',    //Change this to your City subdomain
  useSSL: false,       //Whether or not your plugin uses SSL
  extra: 50,           //Extra number of pixels to expand iFrame height to 
                       //(newHeight= documentHeight + extra)
  refresh: 250,        //How often to check for new documentHeight, 0 to disable,
  forceResize: false  //By default the plugin doesn't resize if the height is within
                      //85px of the last time it was called. Set to true to override
});
```

##Looping##
The plugin tries to avoid situations where it is infinitely expanding the page but it could still happen. Just
call the plugin with refresh: 0 to disable the automatic loops and call it manually after you've changed the
iFrame's content.