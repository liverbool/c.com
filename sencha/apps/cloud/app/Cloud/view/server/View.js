Ext.define('Magice.Cloud.view.server.View', {
  extend: 'Ext.panel.Panel',
  xtype: 'servers',
  itemId: 'servers',
  border: false,
  controller: 'servers',
  viewModel: {
    type: 'servers'
  },
  dockedItems: {
    xtype: 'view-servers-toolbar'
  },
  bind: {
    loading: '{maskingservers}'
  },
  maskings: {
    key: 'maskingservers',
    stores: ['servers']
  },
  layout: {
    type: 'vbox',
    pack: 'start',
    align: 'stretch'
  },
  defaults: {
    flex: 1,
    border: false
  },
  items: [
    {
      xtype: 'server-list',
      bind: {
        store: '{servers}'
      }
    }
  ]
});
