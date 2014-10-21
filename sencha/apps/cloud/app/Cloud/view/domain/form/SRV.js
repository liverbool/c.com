Ext.define('Magice.Cloud.view.domain.form.SRV', {
  extend: 'Ext.window.Window',
  xtype: 'dns-form-srv',
  bind: {
    title: 'Add Record SRV - {record.name}'
  },
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
        fieldLabel: 'Name',
        bind: '{dns.name}'
      }, {
        name: 'data',
        xtype: 'textfield',
        fieldLabel: 'Hostname',
        bind: '{dns.data}'
      }, {
        name: 'priority',
        xtype: 'numberfield',
        fieldLabel: 'Priority',
        bind: '{dns.priority}'
      }, {
        name: 'port',
        xtype: 'numberfield',
        fieldLabel: 'Port',
        bind: '{dns.port}'
      }, {
        name: 'weight',
        xtype: 'numberfield',
        fieldLabel: 'Weight',
        bind: '{dns.weight}'
      }
    ]
  },
  buttons: [
    {
      text: 'Save',
      handler: 'on.dns.save',
      dnstype: 'srv'
    }
  ]
});
