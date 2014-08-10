Ext.define('Magice.Cloud.view.server.actions.Shutdown', {
  extend: 'Ext.window.Window',
  xtype: 'server-actions-shutdown',
  layout: 'card',
  activeItem: 1,
  width: 400,
  bind: {
    title: 'Shutdown - {server.name}'
  },
  locale: {
    header: 'Note!',
    description: "This will shutdown your machine.",
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
    close: 'on.action.shutdown.close'
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
          'on.failure': 'on.action.shutdown.error',
          'on.warning': 'on.action.shutdown.error',
          'on.success': 'on.action.shutdown.success'
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
        handler: 'on.action.shutdown.action',
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
