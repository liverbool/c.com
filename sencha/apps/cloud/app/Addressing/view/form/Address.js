Ext.define('Magice.Addressing.view.form.Address', {
  extend: 'Ext.window.Window',
  reference: 'form-address-window',
  title: 'Edit Address',
  modelValidation: true,
  width: 480,
  minWidth: 400,
  resizable: true,
  autoScroll: true,
  modal: true,
  shadow: false,
  closeAction: 'hide',
  listeners: {
    beforehide: 'onBeforeHideFormWindow'
  },
  bind: {
    disabled: '{maskingWindow}'
  },
  buttons: [
    {
      text: 'Save Change',
      handler: 'saveChange'
    }
  ],
  isValid: function() {
    return this.down('form').isValid();
  },
  reset: function() {
    return this.down('form').reset();
  },
  items: {
    xtype: 'form',
    padding: 20,
    layout: {
      type: 'hbox'
    },
    items: [
      {
        flex: 2,
        xtype: 'container',
        layout: 'anchor',
        defaults: {
          labelAlign: 'top',
          anchor: '100%'
        },
        items: [
          {
            xtype: 'textfield',
            fieldLabel: 'Personnel Contact',
            allowBlank: false,
            bind: '{record.personnel}'
          }, {
            xtype: 'textfield',
            fieldLabel: 'Company',
            bind: '{record.company}'
          }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            defaults: {
              labelAlign: 'top'
            },
            items: [
              {
                flex: 1,
                xtype: 'textfield',
                fieldLabel: 'No.',
                allowBlank: false,
                bind: '{record.no}'
              }, {
                flex: 2,
                margin: '0 0 0 5',
                xtype: 'textfield',
                fieldLabel: 'Place/Building',
                bind: '{record.building}'
              }
            ]
          }, {
            xtype: 'textfield',
            fieldLabel: 'Street',
            bind: '{record.street}'
          }, {
            xtype: 'textfield',
            fieldLabel: 'Road',
            bind: '{record.road}'
          }
        ]
      }, {
        flex: 1.5,
        xtype: 'container',
        layout: 'anchor',
        margin: '0 0 0 20',
        defaults: {
          labelAlign: 'top',
          anchor: '100%',
          allowBlank: false
        },
        items: [
          {
            xtype: 'combobox',
            fieldLabel: 'Province',
            reference: 'province',
            queryMode: 'local',
            editable: true,
            forceSelection: true,
            disabled: true,
            displayField: 'name',
            valueField: 'id',
            bind: {
              store: '{provinces}',
              value: '{geoprovince}'
            },
            listeners: {
              change: 'onProvinceChange'
            }
          }, {
            xtype: 'combobox',
            fieldLabel: 'Amphur',
            reference: 'amphur',
            queryMode: 'local',
            editable: true,
            forceSelection: true,
            disabled: true,
            displayField: 'name',
            valueField: 'id',
            bind: {
              store: '{amphurs}',
              value: '{geoamphur}'
            },
            listeners: {
              change: 'onAmphurChange'
            }
          }, {
            xtype: 'combobox',
            fieldLabel: 'District',
            reference: 'district',
            queryMode: 'local',
            editable: true,
            forceSelection: true,
            disabled: true,
            displayField: 'name',
            valueField: 'id',
            bind: {
              store: '{districts}',
              value: '{gedistrict}'
            },
            listeners: {
              change: 'onDistrictChange',
              select: 'onDistrictSelectChange'
            }
          }, {
            xtype: 'textfield',
            fieldLabel: 'Zipcode',
            reference: 'zipcode',
            disabled: true,
            bind: '{record.zipcode}'
          }, {
            fieldLabel: 'Default Address?',
            xtype: 'radiogroup',
            bind: {
              value: '{isDefaultAddress}'
            },
            defaults: {
              name: 'isDefault'
            },
            items: [
              {
                boxLabel: 'Yes',
                inputValue: true
              }, {
                boxLabel: 'No',
                inputValue: false
              }
            ]
          }
        ]
      }
    ]
  }
});
