Ext.define("Ext.ux.jp.panel.TopBar", {
  extend: "Ext.container.Container",
  alias: "widget.jp-topbar",
  dock: "top",
  config: {
    dockText: null,
    dockTools: null
  },
  layout: {
    type: "hbox",
    align: "stretch"
  },
  initComponent: function(config) {
    this.items = [];
    if (this.dockText) {
      this.items.push((typeof this.dockText === "object" ? this.dockText : {
        xtype: "container",
        cls: "jp-topbar-text",
        html: this.dockText,
        flex: 1
      }));
    }
    if (this.dockTools) {
      this.items.push({
        xtype: "container",
        cls: "jp-topbar-tools",
        items: this.dockTools,
        layout: {
          type: "hbox",
          pack: "end"
        },
        defaults: {
          margin: "0 0 0 5",
          xtype: 'button'
        },
        flex: 1
      });
    }
    Ext.apply(this, config);
    this.callParent(arguments);
  }
});
