Ext.define('Magice.Cloud.view.server.form.Create', {
  extend: 'Ext.window.Window',
  reference: 'creatorWindow',
  modelValidation: true,
  width: 670,
  minWidth: 400,
  y: 0,
  resizable: true,
  maximizable: true,
  modal: false,
  shadow: false,
  closeAction: 'destroy',
  title: 'Create New Server',
  dockedItems: {
    xtype: 'creator-dockedbar'
  },
  activeItem: 1,
  layout: {
    type: 'card',
    deferredRender: true
  },
  defaults: {
    xtype: 'container',
    layout: 'fit',
    autoScroll: true,
    border: false
  },
  items: [
    {
      xtype: 'operation-panel',
      locales: {
        warning: {
          header: 'Warning!',
          message: 'Something happend while processing. You will wait few munites and try to reload your browser.'
        }
      },
      listeners: {
        'activate': 'on.create.step0',
        'on.error': 'on.create.ended',
        'on.warning': 'on.create.ended',
        'on.success': 'on.create.ended'
      }
    }, {
      layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
      },
      defaults: {
        layout: 'fit',
        border: false
      },
      items: [
        {
          xtype: 'creator-hostname'
        }, {
          xtype: 'creator-size',
          flex: 1
        }, {
          xtype: 'creator-image',
          flex: 1,
          split: true
        }, {
          xtype: 'creator-feature'
        }
      ],
      listeners: {
        activate: 'on.create.step-select'
      }
    }, {
      xtype: 'creator-summary',
      listeners: {
        activate: 'on.create.step-summary'
      }
    }
  ],
  getOperation: function() {
    return this.down('operation-panel').setParent(this);
  }
});
