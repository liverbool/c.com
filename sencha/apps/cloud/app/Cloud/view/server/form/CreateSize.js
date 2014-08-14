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
      dataIndex: 'vcpus',
      renderer: function(v) {
        return v + 'GB';
      }
    }, {
      sortable: false,
      menuDisabled: true,
      text: 'Memory',
      dataIndex: 'memory',
      renderer: function(v) {
        return Ext.humanize.format(v, '0b', 'mb');
      }
    }, {
      sortable: false,
      menuDisabled: true,
      text: 'SSD Disk',
      dataIndex: 'disk',
      renderer: function(v) {
        return v + 'GB';
      }
    }, {
      sortable: false,
      menuDisabled: true,
      text: 'Transfer',
      dataIndex: 'transfer',
      renderer: function(v) {
        return v + 'GB';
      }
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
