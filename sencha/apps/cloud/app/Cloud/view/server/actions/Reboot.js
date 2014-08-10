Ext.define('Magice.Cloud.view.server.actions.Reboot', {
  extend: 'Ext.window.Window',
  xtype: 'server-actions-reboot',
  layout: 'card',
  activeItem: 1,
  width: 400,
  bind: {
    title: 'Reboot - {server.name}'
  },
  locale: {
    header: 'Note!',
    description: "This will reboot your droplet. Do you wish to proceed?",
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
    close: 'on.action.reboot.close'
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
          'on.failure': 'on.action.reboot.error',
          'on.warning': 'on.action.reboot.error',
          'on.success': 'on.action.reboot.success'
        }
      }, {
        data: this.locale,
        tpl: ['<div class="ui info message">', '<div class="header">{header}</div>', '<p>{description}</p>', '</div>']
      }
    ];
    this.buttons = [
      {
        cls: 'x-btn-primary',
        itemId: 'btnAction',
        handler: 'on.action.reboot.action',
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
