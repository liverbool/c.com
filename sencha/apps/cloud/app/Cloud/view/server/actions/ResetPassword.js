Ext.define('Magice.Cloud.view.server.actions.ResetPassword', {
  extend: 'Ext.window.Window',
  xtype: 'server-actions-resetpwd',
  layout: 'card',
  activeItem: 1,
  width: 400,
  bind: {
    title: 'Reset Password - {server.name}'
  },
  locale: {
    header: 'Note!',
    description: "This will resetpwd your droplet.",
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
    close: 'on.action.resetpwd.close'
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
        handler: 'on.action.resetpwd.action',
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
