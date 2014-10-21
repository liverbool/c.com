Ext.define('Magice.Cloud.view.server.ListActions', {
  extend: 'Ext.window.Window',
  xtype: 'server-list-actions',
  width: 450,
  height: 300,
  maximizable: true,
  bind: {
    title: 'History - {server.name}',
    loading: '{maskingactions}'
  },
  layout: 'fit',
  maskings: {
    parent: 'servers',
    key: 'maskingactions',
    stores: ['actions']
  },
  items: {
    xtype: 'grid',
    border: false,
    disableSelection: true,
    bind: {
      store: '{actions}',
      reload: '{serverselection}'
    },
    viewConfig: {
      listeners: {
        render: Ext.grid.tooltip
      }
    },
    setReload: function(rec) {
      return this.store.load({
        parameters: {
          id: rec.get('id')
        }
      });
    },
    columns: [
      {
        flex: 1,
        text: 'Event',
        dataIndex: 'type',
        renderer: humanize.text
      }, {
        hidden: true,
        text: 'Started At',
        dataIndex: 'startedAt',
        renderer: humanize.datetime
      }, {
        hidden: true,
        text: 'Completed At',
        dataIndex: 'completedAt',
        renderer: humanize.datetime
      }, {
        text: 'Status',
        dataIndex: 'status',
        renderer: humanize.text
      }, {
        text: 'Started',
        dataIndex: 'startedAt',
        renderer: humanize.duration
      }, {
        text: 'Duration',
        dataIndex: 'duration'
      }
    ]
  },
  buttons: [
    {
      text: 'Refresh',
      handler: 'on.list.actions.refresh'
    }
  ]
});
