Ext.define('Magice.Cloud.view.server.ListSnapshots', {
  extend: 'Ext.window.Window',
  xtype: 'server-list-snapshots',
  width: 450,
  height: 300,
  maximizable: true,
  maskings: {
    parent: 'servers',
    key: 'maskingsnapshots',
    stores: ['snapshots']
  },
  bind: {
    title: 'Snapshots - {server.name}',
    loading: '{maskingsnapshots}'
  },
  layout: 'fit',
  initComponent: function() {
    this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
      listeners: {
        edit: 'on.list.snapshots.edit'
      }
    });
    this.items = {
      xtype: 'grid',
      reference: 'snapshotlist',
      plugins: [this.editing],
      border: false,
      selModel: {
        allowDeselect: true
      },
      bind: {
        store: '{snapshots}',
        reload: '{serverselection}'
      },
      setReload: function(rec) {
        return this.store.load({
          parameters: {
            id: rec.get('id')
          }
        });
      },
      columns: [
        {
          flex: 1,
          text: 'Name',
          dataIndex: 'name',
          field: {
            type: 'textfield',
            allowBlank: false
          }
        }, {
          text: 'Distribution',
          dataIndex: 'distribution'
        }, {
          hidden: true,
          text: 'Created At',
          dataIndex: 'createdAt',
          renderer: humanize.datetime
        }, {
          text: 'Created',
          dataIndex: 'createdAt',
          renderer: humanize.duration
        }
      ],
      tbar: [
        {
          text: 'Create',
          handler: 'on.action.snapshot',
          glyph: Glyph.CREATE
        }, {
          disabled: true,
          text: 'Restore',
          bind: {
            disabled: '{!snapshotlist.selection}'
          },
          glyph: Glyph.RESTORE,
          referer: 'snapshotlist',
          handler: 'on.action.restore'
        }, {
          disabled: true,
          text: 'Rename',
          glyph: Glyph.RENAME,
          bind: {
            disabled: '{!snapshotlist.selection}',
            record: '{snapshotlist.selection}'
          },
          handler: (function(_this) {
            return function(me) {
              var rec;
              rec = me.getRecord();
              if (!rec) {
                return;
              }
              _this.editing.cancelEdit();
              return _this.editing.startEdit(rec, 0);
            };
          })(this)
        }, {
          disabled: true,
          text: 'Destroy',
          glyph: Glyph.DESTROY,
          bind: {
            disabled: '{!snapshotlist.selection}'
          },
          referer: 'snapshotlist',
          handler: 'on.action.destroyimage'
        }, {
          text: 'Refresh',
          handler: 'on.list.snapshots.refresh',
          glyph: Glyph.REFRESH
        }
      ]
    };
    return this.callParent(arguments);
  }
});
