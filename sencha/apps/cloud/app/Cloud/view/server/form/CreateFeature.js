Ext.define('Magice.Cloud.view.server.form.CreateFeature', {
  extend: 'Ext.panel.Panel',
  xtype: 'creator-feature',
  title: 'Features',
  items: {
    xtype: 'dataview',
    bind: {
      store: '{creatorsFeatures}'
    },
    itemSelector: '.item',
    listeners: {
      selectionchange: 'on.creator.feature.selectionchange'
    },
    selModel: {
      multiSelect: true,
      mode: 'SIMPLE'
    },
    tpl: ['<div class="ui horizontal list">', '<tpl for=".">', '<div class="item">', '<input type="checkbox"/>', '<div class="content">', '<div class="header">{name}</div>', '</div>', '</div>', '</tpl>', '</div>']
  }
});
