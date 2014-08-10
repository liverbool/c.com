Ext.define('Magice.Cloud.view.server.actions.Rename', {
  extend: 'Ext.window.Window',
  xtype: 'server-actions-rename',
  layout: 'card',
  activeItem: 1,
  width: 400,
  bind: {
    title: 'Rename - {server.name}'
  },
  locale: {
    header: 'Note!',
    label: 'Enter New Hostname',
    description: "This will update the displayed hostname of your droplet and the automatically generated PTR record. It will not however modify your actual hostname inside of the system.",
    button: {
      save: 'Save',
      tryAgain: 'Try again'
    }
  },
  defaults: {
    border: false,
    xtype: 'container'
  },
  listeners: {
    close: 'on.action.rename.close',
    beforeclose: 'on.action.rename.beforeclose'
  },
  getOperation: function() {
    return this.down('operation-panel').setParent(this);
  },
  initComponent: function() {
    this.items = [
      {
        xtype: 'operation-panel',
        toggleItems: ['#btnSave'],
        locales: {
          warning: {
            header: 'Warning!',
            message: 'Something happend while processing. You will wait few munites and try to reload your browser.'
          }
        },
        listeners: {
          'on.failure': 'on.action.rename.error',
          'on.warning': 'on.action.rename.error',
          'when.errored': 'on.action.rename.errored',
          'when.completed': 'on.action.rename.completed'
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
              vtype: 'domain',
              bind: '{server.name}',
              labelAlign: 'top',
              fieldLabel: this.locale.label
            }
          }
        ]
      }
    ];
    this.buttons = [
      {
        cls: 'x-btn-save',
        itemId: 'btnSave',
        handler: 'on.action.rename.save',
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
