Ext.define('Magice.Cloud.view.server.ListBackups', {
  extend: 'Ext.window.Window',
  xtype: 'server-list-backups',
  width: 450,
  height: 300,
  maximizable: true,
  maskings: {
    parent: 'servers',
    key: 'maskingbackups',
    stores: ['backups']
  },
  bind: {
    title: 'Backups - {server.name}',
    loading: '{maskingbackups}'
  },
  layout: 'fit',
  initComponent: function() {
    this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
      listeners: {
        edit: 'on.list.backups.edit'
      }
    });
    this.items = {
      xtype: 'grid',
      reference: 'backuplist',
      plugins: [this.editing],
      border: false,
      selModel: {
        allowDeselect: true
      },
      bind: {
        store: '{backups}',
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
          renderer: Ext.humanize.datetime
        }, {
          text: 'Created',
          dataIndex: 'createdAt',
          renderer: Ext.humanize.duration
        }
      ],
      tbar: [
        {
          disabled: true,
          text: 'Restore',
          bind: {
            disabled: '{!backuplist.selection}'
          },
          glyph: Glyph.RESTORE,
          referer: 'backuplist',
          handler: 'on.action.restore'
        }, {
          disabled: true,
          text: 'Rename',
          glyph: Glyph.RENAME,
          bind: {
            disabled: '{!backuplist.selection}',
            record: '{backuplist.selection}'
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
            disabled: '{!backuplist.selection}'
          },
          referer: 'backuplist',
          handler: 'on.action.destroyimage'
        }, {
          text: 'Refresh',
          handler: 'on.list.backups.refresh',
          glyph: Glyph.REFRESH
        }
      ]
    };
    return this.callParent(arguments);
  }
});
