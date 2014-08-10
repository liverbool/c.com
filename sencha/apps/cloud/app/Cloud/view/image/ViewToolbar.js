Ext.define('Magice.Cloud.view.image.ViewToolbar', {
  extend: 'Ext.container.Container',
  xtype: 'view-images-toolbar',
  locale: {
    button: {
      refresh: 'Refresh'
    }
  },
  initComponent: function() {
    this.items = [
      {
        xtype: 'jp-topbar',
        dockText: 'Images',
        dockTools: [
          {
            itemId: 'filter-button',
            xtype: 'segmentedbutton',
            defaults: {
              handler: 'on.filter'
            },
            items: [
              {
                text: 'All',
                filter: 'all'
              }, {
                text: 'Backup',
                filter: 'backup'
              }, {
                text: 'Snapshot',
                filter: 'snapshot'
              }
            ]
          }, {
            disabled: true,
            text: 'Rename',
            glyph: Glyph.RENAME,
            bind: {
              disabled: '{!imagelist.selection}',
              record: '{imagelist.selection}'
            },
            handler: 'on.rename'
          }, {
            disabled: true,
            text: 'Destroy',
            referer: 'imagelist',
            glyph: Glyph.DESTROY,
            bind: {
              disabled: '{!imagelist.selection}',
              record: '{imagelist.selection}'
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
