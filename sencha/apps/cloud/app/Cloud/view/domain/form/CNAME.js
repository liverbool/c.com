Ext.define('Magice.Cloud.view.domain.form.CNAME', {
  extend: 'Ext.window.Window',
  xtype: 'dns-form-cname',
  title: 'Add Record CNAME',
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
        fieldLabel: 'Alias Name',
        bind: '{dns.name}'
      }, {
        name: 'data',
        xtype: 'textfield',
        fieldLabel: 'Target Hostname',
        bind: '{dns.data}'
      }
    ]
  },
  buttons: [
    {
      text: 'Save',
      handler: 'on.dns.save',
      dnstype: 'cname'
    }
  ]
});
