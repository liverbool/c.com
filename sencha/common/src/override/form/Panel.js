Ext.define("Ext.override.form.Panel", {
  override: "Ext.form.Panel",
  getFieldValue: function(name) {
    return this.findField(name).getValue();
  },
  findField: function(name) {
    return this.getForm().findField(name);
  }
});
