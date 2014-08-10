Ext.define('Magice.Info.view.form.Info', {
  extend: 'Ext.window.Window',
  reference: 'info-form-window',
  title: 'Edit your info',
  modelValidation: true,
  width: 400,
  minWidth: 400,
  minHeight: 300,
  resizable: true,
  autoScroll: true,
  modal: true,
  shadow: false,
  defaultFocus: 'firstname',
  closeAction: 'hide',
  buttons: [
    {
      text: 'Save Change',
      handler: 'saveChange'
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
          fieldLabel: 'Gender',
          xtype: 'radiogroup',
          bind: {
            value: '{gender}'
          },
          layout: {
            autoFlex: false
          },
          defaults: {
            name: 'gender',
            margin: '0 15 0 0'
          },
          items: [
            {
              boxLabel: 'Male',
              inputValue: 'M'
            }, {
              boxLabel: 'Female',
              inputValue: 'F'
            }
          ]
        }, {
          fieldLabel: 'Firstname',
          xtype: 'textfield',
          name: 'firstname',
          bind: '{record.firstname}',
          allowBlank: false
        }, {
          fieldLabel: 'Lanstname',
          xtype: 'textfield',
          name: 'lastname',
          bind: '{record.lastname}',
          allowBlank: false
        }, {
          fieldLabel: 'Personal Id',
          xtype: 'textfield',
          name: 'personalId',
          bind: '{record.personalId}',
          allowBlank: true
        }, {
          fieldLabel: 'Birth Day (d/m/Y)',
          xtype: 'datefield',
          name: 'birthday',
          bind: '{record.birthday}',
          format: 'd/m/Y',
          allowBlank: false,
          minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -Magice.Info.model.Info.MAX_AGE),
          maxValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -Magice.Info.model.Info.MIN_AGE)
        }
      ]
    }
  ]
});
