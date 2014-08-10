Ext.define('Magice.Cloud.view.server.actions.Restore', {
  extend: 'Ext.window.Window',
  xtype: 'server-actions-restore',
  layout: 'card',
  activeItem: 1,
  width: 400,
  bind: {
    title: 'Restore - {server.name}'
  },
  locale: {
    header: 'Note!',
    description: "This will restore your machine from selected image. Do you wish to proceed?",
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
    close: 'on.action.restore.close'
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
          'on.failure': 'on.action.restore.error',
          'on.warning': 'on.action.restore.error',
          'on.success': 'on.action.restore.success'
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
        handler: 'on.action.restore.action',
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
