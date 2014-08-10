Ext.define('Magice.Cloud.view.sshkey.ViewToolbar', {
  extend: 'Ext.container.Container',
  xtype: 'view-sshkeys-toolbar',
  locale: {
    button: {
      refresh: 'Refresh'
    }
  },
  initComponent: function() {
    this.items = [
      {
        xtype: 'jp-topbar',
        dockText: 'SSH Keys',
        dockTools: [
          {
            text: 'Create',
            handler: 'on.create',
            create: true
          }, {
            disabled: true,
            text: 'Edit',
            glyph: Glyph.EDIT,
            bind: {
              disabled: '{!sshkeylist.selection}'
            },
            handler: 'on.edit'
          }, {
            disabled: true,
            text: 'Destroy',
            glyph: Glyph.DESTROY,
            bind: {
              disabled: '{!sshkeylist.selection}'
            },
            handler: 'on.destroy'
          }, {
            text: this.locale.button.refresh,
            handler: 'on.refresh'
          }
        ]
      }
    ];
    return this.callParent(arguments);
  }
});
