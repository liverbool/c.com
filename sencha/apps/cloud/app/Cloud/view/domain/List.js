Ext.define('Magice.Cloud.view.domain.List', {
  extend: 'Ext.grid.Panel',
  xtype: 'domain-list',
  reference: 'domainlist',
  selModel: {
    allowDeselect: true
  },
  loadMask: true,
  collapsible: false,
  bind: {
    store: '{domains}'
  },
  listeners: {
    selectionchange: 'on.selectionchange'
  },
  initComponent: function() {
    this.columns = [
      {
        width: 200,
        text: 'Domain',
        dataIndex: 'name'
      }, {
        flex: 1,
        text: 'IP',
        dataIndex: 'ip'
      }
    ];
    return this.callParent(arguments);
  }
});
