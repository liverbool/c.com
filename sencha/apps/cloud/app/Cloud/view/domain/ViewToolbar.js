Ext.define('Magice.Cloud.view.domain.ViewToolbar', {
  extend: 'Ext.container.Container',
  xtype: 'view-domains-toolbar',
  locale: {
    button: {
      refresh: 'Refresh'
    }
  },
  initComponent: function() {
    this.items = [
      {
        xtype: 'jp-topbar',
        dockText: 'DNS',
        dockTools: [
          {
            text: 'Create',
            handler: 'on.create',
            create: true
          }, {
            disabled: true,
            text: 'Destroy',
            glyph: Glyph.DESTROY,
            bind: {
              disabled: '{!domainlist.selection}'
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
