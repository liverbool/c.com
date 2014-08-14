Ext.define('Magice.Cloud.view.domain.View', {
  extend: 'Ext.panel.Panel',
  xtype: 'domains',
  itemId: 'domains',
  border: false,
  controller: 'domains',
  viewModel: {
    type: 'domains'
  },
  dockedItems: {
    xtype: 'view-domains-toolbar'
  },
  bind: {
    loading: '{maskingdomains}'
  },
  defaults: {
    border: false
  },
  maskings: {
    key: 'maskingdomains',
    stores: ['domains']
  },
  items: [
    {
      xtype: 'domain-list'
    }, {
      xtype: 'record-list'
    }
  ]
});
