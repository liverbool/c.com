Ext.define('Magice.Cloud.view.server.actions.Destroy', {
  extend: 'Ext.window.Window',
  xtype: 'server-actions-destroy',
  layout: 'card',
  activeItem: 1,
  width: 400,
  bind: {
    title: 'Destroy - {server.name}'
  },
  locale: {
    header: 'Warning!',
    description: "This is irreversible. We will destroy your machine and all associated backups. Do you wish to proceed?",
    button: {
      action: 'Action',
      tryAgain: 'Try again'
    }
  },
  defaults: {
    border: false,
    xtype: 'container'
  },
  listeners: {
    close: 'on.action.destroy.close'
  },
  getOperation: function() {
    return this.down('operation-panel').setParent(this);
  },
  initComponent: function() {
    this.items = [
      {
        xtype: 'operation-panel',
        toggleItems: ['#btnAction'],
        locales: {
          warning: {
            header: 'Warning!',
            message: 'Something happend while processing. You will wait few munites and try to reload your browser.'
          }
        },
        listeners: {
          'on.failure': 'on.action.destroy.error',
          'on.warning': 'on.action.destroy.error',
          'on.success': 'on.action.destroy.success'
        }
      }, {
        data: this.locale,
        tpl: ['<div class="ui warning message">', '<div class="header">{header}</div>', '<p>{description}</p>', '</div>']
      }
    ];
    this.buttons = [
      {
        cls: 'x-btn-primary',
        itemId: 'btnAction',
        handler: 'on.action.destroy.action',
        text: this.locale.button.action
      }, {
        hidden: true,
        itemId: 'btnTryAgain',
        text: this.locale.button.tryAgain
      }
    ];
    return this.callParent(arguments);
  }
});
