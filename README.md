The City PlugIn Helper
======================

##Usage##
 
Insert script in page anywhere after jQuery, then:

```
TheCity.PluginHelper.resizeIFrame({
  subdomain: 'www',    //Change this to your City subdomain
  useSSL: false,       //Whether or not your plugin uses SSL
  extra: 50,           //Extra number of pixels to expand iFrame height to 
                        (newHeight= documentHeight + extra)
  refresh: 250,        //How often to check for new documentHeight, 0 to disable
});
```