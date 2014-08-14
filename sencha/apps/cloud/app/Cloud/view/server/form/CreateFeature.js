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
    tpl: ['<div class="ui horizontal list">', '<tpl for=".">', '<div class="item">', '<div class="ui toggle checkbox">', '<input name="pet" type="checkbox">', '<label>{name}</label>', '</div>', '</div>', '</tpl>', '</div>']
  }
});
