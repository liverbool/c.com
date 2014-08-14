Ext.define('Magice.Cloud.view.domain.Record', {
  extend: 'Ext.grid.Panel',
  xtype: 'record-list',
  reference: 'recordlist',
  title: 'Records',
  bind: {
    title: 'Records - {record.name}'
  },
  selModel: {
    allowDeselect: true,
    mode: 'MULTI'
  },
  loadMask: true,
  collapsible: false,
  features: [
    {
      ftype: 'grouping',
      enableGroupingMenu: false,
      hideGroupedHeader: true,
      groupHeaderTpl: '{name}'
    }
  ],
  bind: {
    store: '{records}'
  },
  tbar: [
    {
      text: 'Add Gmail MX Record',
      handler: 'on.dns.add.GMAIL'
    }, {
      text: 'Add Record',
      menu: [
        {
          text: 'A',
          handler: 'on.dns.add',
          dnstype: 'a'
        }, {
          text: 'AAAA',
          handler: 'on.dns.add',
          dnstype: 'aaaa'
        }, {
          text: 'CNAME',
          handler: 'on.dns.add',
          dnstype: 'cname'
        }, {
          text: 'TXT',
          handler: 'on.dns.add',
          dnstype: 'txt'
        }, {
          text: 'NS',
          handler: 'on.dns.add',
          dnstype: 'ns'
        }, {
          text: 'MX',
          handler: 'on.dns.add',
          dnstype: 'mx'
        }, {
          text: 'SRV',
          handler: 'on.dns.add',
          dnstype: 'srv'
        }
      ]
    }, {
      text: 'Remove Records',
      handler: 'on.dns.remove',
      bind: {
        disabled: '{!recordlist.selection}'
      }
    }, {
      text: 'Refresh',
      handler: 'on.dns.refresh'
    }
  ],
  initComponent: function() {
    this.columns = [
      {
        text: 'Type',
        dataIndex: 'type'
      }, {
        text: 'Name',
        dataIndex: 'name'
      }, {
        flex: 1,
        text: 'Data',
        dataIndex: 'data'
      }, {
        text: 'Priority',
        dataIndex: 'priority',
        renderer: function(v) {
          if (v) {
            return v;
          }
        }
      }, {
        text: 'Port',
        dataIndex: 'port',
        renderer: function(v) {
          if (v) {
            return v;
          }
        }
      }, {
        text: 'Weight',
        dataIndex: 'weight',
        renderer: function(v) {
          if (v) {
            return v;
          }
        }
      }
    ];
    return this.callParent(arguments);
  }
});
