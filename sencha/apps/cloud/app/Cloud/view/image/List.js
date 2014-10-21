Ext.define('Magice.Cloud.view.image.List', {
  extend: 'Ext.grid.Panel',
  xtype: 'image-list',
  reference: 'imagelist',
  selModel: {
    allowDeselect: true
  },
  loadMask: true,
  collapsible: false,
  features: [
    {
      ftype: 'grouping',
      enableGroupingMenu: false,
      groupHeaderTpl: [
        '{[this.renderer(values)]}', {
          renderer: function(values) {
            var r;
            r = values.children[0];
            return sprintf('%s - %s', r.data.machine.name, r.data.distribution);
          }
        }
      ]
    }
  ],
  bind: {
    store: '{images}'
  },
  initComponent: function() {
    this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
      listeners: {
        edit: 'on.edit'
      }
    });
    this.plugins = [this.editing];
    this.columns = [
      {
        hidden: true,
        text: 'ID',
        dataIndex: 'id'
      }, {
        hidden: true,
        text: 'Distribution',
        dataIndex: 'distribution'
      }, {
        flex: 1,
        text: 'Name',
        dataIndex: 'name',
        field: {
          type: 'textfield',
          allowBlank: false
        }
      }, {
        text: 'Type',
        dataIndex: 'type',
        renderer: humanize.text
      }, {
        flex: 1,
        text: 'created',
        dataIndex: 'createdAt',
        renderer: humanize.datetime
      }
    ];
    return this.callParent(arguments);
  }
});
