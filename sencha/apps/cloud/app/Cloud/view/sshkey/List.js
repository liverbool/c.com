Ext.define('Magice.Cloud.view.sshkey.List', {
  extend: 'Ext.grid.Panel',
  xtype: 'sshkey-list',
  reference: 'sshkeylist',
  selModel: {
    allowDeselect: true
  },
  loadMask: true,
  collapsible: false,
  bind: {
    store: '{sshkeys}'
  },
  initComponent: function() {
    this.columns = [
      {
        flex: 1,
        text: 'Name',
        dataIndex: 'name'
      }
    ];
    return this.callParent(arguments);
  }
});
