Ext.define('Magice.Cloud.view.domain.form.A', {
  extend: 'Ext.window.Window',
  xtype: 'dns-form-a',
  title: 'Add Record A',
  width: 400,
  modelValidation: true,
  modal: true,
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
        fieldLabel: 'Hostname',
        bind: '{dns.name}'
      }, {
        name: 'data',
        xtype: 'textfield',
        fieldLabel: 'IP Address',
        bind: '{dns.data}'
      }
    ]
  },
  buttons: [
    {
      text: 'Save',
      handler: 'on.dns.save',
      dnstype: 'a'
    }
  ]
});
