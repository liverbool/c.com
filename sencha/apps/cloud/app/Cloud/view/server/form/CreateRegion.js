Ext.define('Magice.Cloud.view.server.form.CreateRegion', {
  extend: 'Ext.panel.Panel',
  xtype: 'creator-region',
  title: 'Regions',
  items: {
    xtype: 'dataview',
    bind: {
      store: '{creators}'
    },
    itemSelector: '.item',
    listeners: {
      scope: 'controller',
      selectionchange: 'onCreatorRegionSelectionChange'
    },
    tpl: ['<div class="ui horizontal list">', '<tpl for=".">', '<div class="item">', '<img class="ui avatar image" src="http://semantic-ui.com/images/demo/avatar.jpg">', '<div class="content">', '<div class="header">{slug:uppercase}</div>', '{name}', '</div>', '</div>', '</tpl>', '</div>']
  }
});
