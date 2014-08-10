Ext.define('Magice.Cloud.view.server.ViewToolbar', {
  extend: 'Ext.container.Container',
  xtype: 'view-servers-toolbar',
  locale: {
    button: {
      actions: 'Actions',
      create: 'Create',
      refresh: 'Refresh',
      history: 'History',
      snapshots: 'Snapshots',
      backups: 'Backups',
      kernel: 'Kernel'
    },
    menu: {
      actions: {
        rename: 'Rename',
        rebuild: 'Rebuild',
        reboot: 'Reboot',
        cycle: 'Power Cycle',
        poweroff: 'Power Off',
        poweron: 'Power On',
        shutdown: 'Shutdown',
        resetpwd: 'Reset Password',
        snapshot: 'Snapshot',
        enableipv6: 'Enable IPv6',
        enableprivatenetworking: 'Enable Private Networking',
        disablebackups: 'Disable Backups',
        destroy: 'Destroy'
      }
    }
  },
  initComponent: function() {
    this.items = [
      {
        xtype: 'jp-topbar',
        dockText: 'Cloud Server',
        dockTools: [
          {
            disabled: true,
            text: this.locale.button.actions,
            bind: {
              disabled: '{!serverlist.selection}'
            },
            menu: [
              {
                handler: 'on.action.rename',
                text: this.locale.menu.actions.rename,
                glyph: Glyph.RENAME
              }, {
                handler: 'on.action.rebuild',
                text: this.locale.menu.actions.rebuild,
                glyph: Glyph.REBUILD
              }, {
                handler: 'on.action.reboot',
                text: this.locale.menu.actions.reboot,
                glyph: Glyph.RENAME
              }, {
                handler: 'on.action.cycle',
                text: this.locale.menu.actions.cycle,
                glyph: Glyph.RENAME
              }, {
                handler: 'on.action.poweroff',
                text: this.locale.menu.actions.poweroff,
                glyph: Glyph.RENAME
              }, {
                handler: 'on.action.poweron',
                text: this.locale.menu.actions.poweron,
                glyph: Glyph.RENAME
              }, {
                handler: 'on.action.shutdown',
                text: this.locale.menu.actions.shutdown,
                glyph: Glyph.RENAME
              }, {
                handler: 'on.action.resetpwd',
                text: this.locale.menu.actions.resetpwd,
                glyph: Glyph.RENAME
              }, {
                handler: 'on.action.snapshot',
                text: this.locale.menu.actions.snapshot,
                glyph: Glyph.RENAME
              }, {
                handler: 'on.action.enableipv6',
                text: this.locale.menu.actions.enableipv6,
                glyph: Glyph.RENAME
              }, {
                handler: 'on.action.enableprivatenetworking',
                text: this.locale.menu.actions.enableprivatenetworking,
                glyph: Glyph.RENAME
              }, {
                handler: 'on.action.disablebackups',
                text: this.locale.menu.actions.disablebackups,
                glyph: Glyph.RENAME
              }, {
                handler: 'on.action.destroy',
                text: this.locale.menu.actions.destroy,
                glyph: Glyph.DESTROY
              }
            ]
          }, {
            disabled: true,
            bind: {
              disabled: '{!serverlist.selection}'
            },
            text: this.locale.button.kernel,
            handler: 'on.action.kernel'
          }, {
            disabled: true,
            bind: {
              disabled: '{!serverlist.selection}'
            },
            text: this.locale.button.history,
            handler: 'on.list.actions'
          }, {
            disabled: true,
            bind: {
              disabled: '{!serverlist.selection}'
            },
            text: this.locale.button.snapshots,
            handler: 'on.list.snapshots'
          }, {
            disabled: true,
            bind: {
              disabled: '{!serverlist.selection}'
            },
            text: this.locale.button.backups,
            handler: 'on.list.backups'
          }, {
            text: this.locale.button.create,
            handler: 'on.create.new'
          }, {
            text: this.locale.button.refresh,
            handler: 'on.list.refresh'
          }
        ]
      }
    ];
    return this.callParent(arguments);
  }
});
