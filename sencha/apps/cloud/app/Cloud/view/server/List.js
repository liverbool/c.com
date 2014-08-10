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
      renderer: Ext.humanize.date
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
      dataIndex: 'size',
      renderer: function(v) {
        if (v) {
          return v.memory + 'MB';
        } else {
          return null;
        }
      }
    }, {
      text: 'SSD Disk',
      dataIndex: 'size',
      renderer: function(v) {
        if (v) {
          return v.disk + 'GB';
        } else {
          return null;
        }
      }
    }, {
      text: 'CPU',
      dataIndex: 'size',
      renderer: function(v) {
        if (v && v.slug) {
          return v.slug.toUpperCase();
        } else {
          return null;
        }
      }
    }, {
      hidden: true,
      text: 'Locked',
      dataIndex: 'locked'
    }, {
      text: 'Backups',
      dataIndex: 'isEnableBackups'
    }, {
      text: 'Status',
      dataIndex: 'status',
      renderer: Ext.humanize.text
    }
  ]
});
