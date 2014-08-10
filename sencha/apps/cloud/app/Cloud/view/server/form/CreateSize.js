Ext.define('Magice.Cloud.view.server.form.CreateSize', {
  extend: 'Ext.grid.Panel',
  xtype: 'creator-size',
  title: 'Sizes',
  bind: {
    store: '{creatorsSizes}'
  },
  listeners: {
    selectionchange: 'on.creator.size.selectionchange'
  },
  columns: [
    {
      sortable: false,
      menuDisabled: true,
      text: 'CPU',
      dataIndex: 'vcpus'
    }, {
      sortable: false,
      menuDisabled: true,
      text: 'Memory',
      dataIndex: 'memory'
    }, {
      sortable: false,
      menuDisabled: true,
      text: 'SSD Disk',
      dataIndex: 'disk'
    }, {
      sortable: false,
      menuDisabled: true,
      text: 'Transfer',
      dataIndex: 'transfer'
    }, {
      sortable: false,
      menuDisabled: true,
      text: 'Hourly',
      dataIndex: 'priceHourly'
    }, {
      sortable: false,
      menuDisabled: true,
      text: 'Monthly',
      dataIndex: 'priceMonthly',
      flex: 1
    }
  ]
});
