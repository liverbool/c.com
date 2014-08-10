Ext.define('Ext.override.container.DockingContainer', {
  override: 'Ext.container.DockingContainer',
  getDockedItems: function() {
    if (!this.getComponentLayout().getDockedItems) {
      return console.warn('Try to: Ext.container.DockingContainer#getComponentLayout().getDockedItems');
    } else {
      return this.callParent(arguments);
    }
  }
});
