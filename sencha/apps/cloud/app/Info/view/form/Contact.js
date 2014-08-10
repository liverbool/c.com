Ext.define('Magice.Info.view.form.Contact', {
  extend: 'Ext.window.Window',
  reference: 'info-form-contact-window',
  title: 'Edit your contact',
  modelValidation: true,
  width: 300,
  minWidth: 300,
  resizable: true,
  autoScroll: true,
  modal: true,
  shadow: false,
  defaultFocus: 'mobile',
  closeAction: 'hide',
  buttons: [
    {
      text: 'Save Change',
      handler: 'saveContactChange'
    }
  ],
  getForm: function() {
    return this.down('form');
  },
  getBasicForm: function() {
    return this.getForm().getForm();
  },
  getFieldValue: function(name) {
    return this.getForm().getFieldValue(name);
  },
  findField: function(name) {
    return this.getForm().findField(name);
  },
  items: [
    {
      xtype: 'form',
      bodyPadding: 20,
      border: false,
      layout: 'anchor',
      defaults: {
        labelAlign: 'top',
        anchor: '100%',
        msgTarget: 'under'
      },
      items: [
        {
          fieldLabel: 'Mobile',
          anchor: '100%',
          labelAlign: 'top',
          xtype: 'textfield',
          name: 'mobile',
          bind: '{record.mobile}'
        }, {
          fieldLabel: 'Home',
          anchor: '100%',
          labelAlign: 'top',
          xtype: 'textfield',
          name: 'telHome',
          bind: '{record.telHome}'
        }, {
          xtype: 'fieldcontainer',
          layout: 'hbox',
          items: [
            {
              fieldLabel: 'Work',
              flex: 1,
              labelAlign: 'top',
              xtype: 'textfield',
              name: 'telWork',
              bind: '{record.telWork}'
            }, {
              fieldLabel: 'Ex.',
              width: 50,
              margin: '0 0 0 5',
              labelAlign: 'top',
              xtype: 'textfield',
              name: 'telWorkExt',
              bind: '{record.telWorkExt}'
            }
          ]
        }
      ]
    }
  ]
});
