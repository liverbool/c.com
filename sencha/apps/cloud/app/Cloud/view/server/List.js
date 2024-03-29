Ext.define('Magice.Cloud.view.server.List', {
  extend: 'Ext.grid.Panel',
  xtype: 'server-list',
  reference: 'serverlist',
  selModel: {
    allowDeselect: true
  },
  listeners: {
    selectionchange: 'on.list.selection.change'
  },
  loadMask: true,
  columns: [
    {
      hidden: true,
      text: 'ID',
      dataIndex: 'id'
    }, {
      text: 'Distribution',
      dataIndex: 'image',
      renderer: function(v) {
        return v.distribution;
      }
    }, {
      flex: 1,
      text: 'Name',
      dataIndex: 'name'
    }, {
      text: 'Created',
      dataIndex: 'createdAt',
      renderer: humanize.date
    }, {
      width: 150,
      text: 'IP Address',
      dataIndex: 'networks',
      renderer: function(v) {
        var n, _i, _len;
        if (!v) {
          return;
        }
        if (v.v4) {
          v = v.v4;
        }
        for (_i = 0, _len = v.length; _i < _len; _i++) {
          n = v[_i];
          if (n.type === 'public') {
            return n.ipAddress;
          }
        }
      }
    }, {
      text: 'Memory',
      dataIndex: 'memory',
      renderer: function(v) {
        return humanize.format(v, '0b', 'mb');
      }
    }, {
      text: 'SSD Disk',
      dataIndex: 'disk',
      renderer: function(v) {
        return v + 'GB';
      }
    }, {
      text: 'CPU',
      dataIndex: 'vcpus',
      renderer: function(v) {
        return v + 'GB';
      }
    }, {
      hidden: true,
      text: 'Locked',
      dataIndex: 'locked'
    }, {
      text: 'Backups',
      dataIndex: 'backupsEnabled'
    }, {
      text: 'Status',
      dataIndex: 'status',
      renderer: humanize.text
    }
  ]
});
