Ext.define('Ext.override.data.reader.Reader', {
  override: 'Ext.data.reader.Reader',
  fixed_deprecated_to_be_remove_read: function(response, readOptions) {
    if (response.status === 204) {
      return this.nullResultSet;
    } else {
      return this.callParent(arguments);
    }
  }
});
