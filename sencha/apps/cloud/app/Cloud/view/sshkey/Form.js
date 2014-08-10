Ext.define('Magice.Cloud.view.sshkey.Form', {
  extend: 'Ext.window.Window',
  xtype: 'sshkey-form',
  title: 'SSH Key',
  width: 400,
  modelValidation: true,
  modal: true,
  listeners: {
    close: 'on.close'
  },
  items: {
    xtype: 'form',
    border: false,
    padding: 20,
    defaults: {
      layout: 'anchor',
      anchor: '100%',
      labelAlign: 'top'
    },
    items: [
      {
        name: 'name',
        xtype: 'textfield',
        fieldLabel: 'Name',
        bind: '{record.name}'
      }, {
        name: 'publicKey',
        xtype: 'textarea',
        fieldLabel: 'Public SSH Key',
        bind: {
          value: '{record.publicKey}',
          disabled: '{!isPhantom}'
        },
        height: 160
      }
    ]
  },
  buttons: [
    {
      text: 'Save',
      handler: 'on.save'
    }
  ]
});
