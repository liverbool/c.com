Ext.define("Magice.Main.view.View", {
  extend: "Ext.container.Container",
  xtype: "main",
  controller: "main",
  viewModel: {
    type: "main"
  },
  header: false,
  border: false,
  layout: 'border',
  defaults: {
    header: false,
    border: false
  },
  items: [
    {
      region: 'north',
      height: 42,
      xtype: 'item-header'
    }, {
      region: 'west',
      width: 250,
      xtype: 'item-menu',
      split: true
    }, {
      region: 'center',
      xtype: 'container',
      layout: 'card',
      defaults: {
        border: false
      },
      items: [
        {
          xtype: "component",
          hidden: true
        }
      ]
    }
  ]
});
