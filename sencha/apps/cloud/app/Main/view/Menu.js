Ext.define("Magice.Main.view.Menu", {
  extend: "Ext.container.Container",
  xtype: "item-menu",
  cls: 'item-menu',
  items: {
    xtype: 'dataview',
    store: {
      autoLoad: true,
      type: 'array',
      fields: ['id', 'label', 'icon'],
      data: [['info', 'Info', 'basic id'], ['addressing', 'Address', 'basic book'], ['servers', 'Servers', 'desktop'], ['images', 'Images', 'desktop'], ['sshkeys', 'SSH Keys', 'desktop'], ['domains', 'DNS', 'desktop']]
    },
    listeners: {
      selectionchange: 'onMenuChange'
    },
    itemSelector: '.item',
    selectedItemCls: 'active',
    trackOver: false,
    multiSelect: false,
    selModel: {
      allowDeselect: false
    },
    tpl: ['<div class="ui vertical teal menu">', '<tpl for=".">', '<a class="item" data-href="{route}">', '<i class="icon {icon}"></i> {label}', '</a>', '</tpl>', '</div>']
  },
  setActiveMenu: function(id, suppressEvent) {
    var dataview, rec;
    dataview = this.down('dataview');
    rec = dataview.store.getById(id);
    return dataview.getSelectionModel().select([rec], false, suppressEvent);
  }
});
