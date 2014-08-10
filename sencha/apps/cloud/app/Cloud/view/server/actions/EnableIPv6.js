Ext.define('Magice.Cloud.view.server.actions.EnableIPv6', {
  extend: 'Ext.window.Window',
  xtype: 'server-actions-enableipv6',
  layout: 'card',
  activeItem: 1,
  width: 400,
  bind: {
    title: 'Enable IPv6 - {server.name}'
  },
  locale: {
    header: 'Note!',
    description: "You must modify the network settings of your droplet for the new IPv6 address to be functional.",
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
    close: 'on.action.enableipv6.close'
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
          'on.failure': 'on.action.enableipv6.error',
          'on.warning': 'on.action.enableipv6.error',
          'on.success': 'on.action.enableipv6.success'
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
        handler: 'on.action.enableipv6.action',
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
