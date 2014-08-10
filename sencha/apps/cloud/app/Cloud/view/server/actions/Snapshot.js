Ext.define('Magice.Cloud.view.server.actions.Snapshot', {
  extend: 'Ext.window.Window',
  xtype: 'server-actions-snapshot',
  layout: 'card',
  activeItem: 1,
  width: 400,
  bind: {
    title: 'Snapshot - {server.name}'
  },
  locale: {
    header: 'Note!',
    label: 'Enter Snapshot Name',
    description: "This may take more than an hour, depending on how much content is on your droplet and how large the disk is.",
    button: {
      save: 'Take Snapshot',
      tryAgain: 'Try again'
    }
  },
  defaults: {
    border: false,
    xtype: 'container'
  },
  listeners: {
    close: 'on.action.snapshot.close'
  },
  getOperation: function() {
    return this.down('operation-panel').setParent(this);
  },
  initComponent: function() {
    this.items = [
      {
        xtype: 'operation-panel',
        toggleItems: ['#btnSave'],
        listeners: {
          'on.failure': 'on.action.snapshot.error',
          'on.warning': 'on.action.snapshot.error',
          'on.success': 'on.action.snapshot.success'
        }
      }, {
        defaults: {
          border: false,
          xtype: 'container'
        },
        items: [
          {
            data: this.locale,
            tpl: ['<div class="ui info message">', '<div class="header">{header}</div>', '<p>{description}</p>', '</div>']
          }, {
            layout: 'fit',
            padding: 20,
            items: {
              xtype: 'textfield',
              labelAlign: 'top',
              allowBlank: false,
              fieldLabel: this.locale.label,
              value: null
            }
          }
        ]
      }
    ];
    this.buttons = [
      {
        cls: 'x-btn-save',
        itemId: 'btnSave',
        handler: 'on.action.snapshot.save',
        text: this.locale.button.save
      }, {
        hidden: true,
        itemId: 'btnTryAgain',
        text: this.locale.button.tryAgain
      }
    ];
    return this.callParent(arguments);
  }
});
