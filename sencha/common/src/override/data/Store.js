Ext.define("Ext.override.data.Store", {
  override: "Ext.data.Store",
  pageSize: 0,
  constructor: function(config) {
    var model;
    if (config.model && !config.proxy && !config.url && !this.url) {
      model = Ext.create(config.model);
      config.proxy = model.proxy;
      model = void 0;
    }
    if (!config.proxy && (config.url || this.url)) {
      config.proxy = {
        type: 'ajax',
        url: config.url || this.url,
        reader: {
          type: 'json'
        }
      };
    }
    this.callParent([config]);

    /* NOT WORK FOR http://www.sencha.com/forum/showthread.php?288501
     *# use Component#masking
    @setMasking config.autoLoad
    @on 'beforeload',->
        @setMasking yes
        console.log @getMasking()
    , @
    @on 'load', ->
         *@setMasking no
        console.log 1
    , @
     */
  }
});
