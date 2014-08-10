Ext.define('Magice.Cloud.view.server.actions.Rebuild', {
  extend: 'Ext.window.Window',
  xtype: 'server-actions-rebuild',
  layout: 'card',
  activeItem: 1,
  width: 400,
  bind: {
    title: 'Rebuild - {server.name}'
  },
  locale: {
    header: 'Note!',
    description: "This will rebuild your machine using the original image you specified when you deployed. Please note that is just like new create machine with the same origin choosen configuration of this machine include same IP and be advised that all data will be lost.",
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
    close: 'on.action.rebuild.close'
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
          'on.failure': 'on.action.rebuild.error',
          'on.warning': 'on.action.rebuild.error',
          'when.errored': 'on.action.rebuild.errored',
          'when.completed': 'on.action.rebuild.completed'
        }
      }, {
        defaults: {
          border: false,
          xtype: 'container'
        },
        items: [
          {
            data: this.locale,
            tpl: ['<div class="ui warning message">', '<div class="header">{header}</div>', '<p>{description}</p>', '</div>']
          }, {
            layout: 'fit',
            padding: 20,
            defaults: {
              labelAlign: 'top'
            },
            items: [
              {
                reference: 'rebuildCheckbox',
                xtype: 'checkboxfield',
                fieldLabel: 'From origin',
                boxLabel: 'Rebuild using current running image.'
              }, {
                reference: 'rebuildCombox',
                xtype: 'combobox',
                queryMode: 'remote',
                displayField: 'name',
                valueField: 'id',
                editable: false,
                allowBlank: true,
                fieldLabel: 'Form image',
                bind: {
                  store: '{images}',
                  disabled: '{rebuildCheckbox.checked}'
                }
              }
            ]
          }
        ]
      }
    ];
    this.buttons = [
      {
        cls: 'x-btn-action',
        itemId: 'btnAction',
        handler: 'on.action.rebuild.action',
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
