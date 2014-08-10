Ext.define('Ext.override.form.field.ComboBox', {
  override: 'Ext.form.field.ComboBox',
  privates: {
    valueBeforeLoaded: null
  },
  setValue: function(val, doSelect) {
    if (val) {
      this.valueBeforeLoaded = val;
    }
    return this.callParent(arguments);
  },
  onLoad: function() {
    if (this.valueBeforeLoaded) {
      this.value = this.valueBeforeLoaded;
      this.valueBeforeLoaded = null;
    }
    return this.callParent(arguments);
  }
});
