Ext.define('Ext.override.button.Button', {
  override: 'Ext.button.Button',
  config: {
    record: null
  },
  setLoading: function(status) {
    if (typeof status === 'string') {
      this.originalText = this.getText();
      this.setText(status);
      status = true;
    }
    if (status === false && this.originalText) {
      this.setText(this.originalText);
      this.originalText = null;
    }
    return this.setDisabled(status);
  }
});
