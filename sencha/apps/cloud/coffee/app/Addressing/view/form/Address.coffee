Ext.define 'Magice.Addressing.view.form.Address',
    extend: 'Ext.window.Window'

    reference: 'form-address-window'

    title: 'Edit Address' #locale

    # This connects bound form fields to the associated model validators:
    modelValidation: yes

    width: 480
    minWidth: 400

    resizable: yes
    autoScroll: yes
    modal: yes
    shadow: no

    closeAction: 'hide'

    listeners: beforehide: 'onBeforeHideFormWindow'

    #maskings:
    #    key: 'maskingWindow'
    #    stores: ['provinces', 'amphurs', 'districts']

    bind: disabled: '{maskingWindow}'

    buttons: [
        # {
        #    xtype: 'tbtext'
        #    bind:
        #        text: '{maskingWindow}'
        #}
        {
            text: 'Save Change' #locale
            handler: 'saveChange'
        }
    ]

    isValid: -> @down('form').isValid()
    reset: -> @down('form').reset()

    items: {
        xtype: 'form'
        padding: 20

        layout: type: 'hbox'

        items: [
            {
                flex: 2
                xtype: 'container'
                layout: 'anchor'

                defaults:
                    labelAlign: 'top'
                    anchor: '100%'

                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Personnel Contact' #locale
                        allowBlank: no
                        bind: '{record.personnel}'
                    }
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Company' #locale
                        bind: '{record.company}'
                    }
                    {
                        xtype: 'fieldcontainer'
                        layout: 'hbox'

                        defaults: labelAlign: 'top'

                        items: [
                            {
                                flex: 1
                                xtype: 'textfield'
                                fieldLabel: 'No.' #locale
                                allowBlank: no
                                bind: '{record.no}'
                            }
                            {
                                flex: 2
                                margin: '0 0 0 5'
                                xtype: 'textfield'
                                fieldLabel: 'Place/Building' #locale
                                bind: '{record.building}'
                            }
                        ]
                    }
                    {
                        xtype: 'textfield'
                        fieldLabel: 'Street' #locale
                        bind: '{record.street}'
                    }
                    {
                        xtype: 'textfield'
                        fieldLabel: 'Road' #locale
                        bind: '{record.road}'
                    }
                ]
            }
            {
                flex: 1.5
                xtype: 'container'
                layout: 'anchor'
                margin: '0 0 0 20'

                defaults:
                    labelAlign: 'top'
                    anchor: '100%'
                    allowBlank: no

                items: [
                    {
                        xtype: 'combobox'
                        fieldLabel: 'Province' #locale
                        reference: 'province'
                        queryMode: 'local'
                        editable: yes
                        forceSelection: yes
                        disabled: yes
                        displayField: 'name'
                        valueField: 'id'

                        bind:
                            store: '{provinces}'
                            value: '{geoprovince}'

                        listeners: change: 'onProvinceChange'
                    }
                    {
                        xtype: 'combobox'
                        fieldLabel: 'Amphur' #locale
                        reference: 'amphur'
                        queryMode: 'local'
                        editable: yes
                        forceSelection: yes
                        disabled: yes
                        displayField: 'name'
                        valueField: 'id'

                        #store:
                        #    type: 'amphurs'
                        bind:
                            store: '{amphurs}'
                            value: '{geoamphur}'

                        listeners: change: 'onAmphurChange'
                    }
                    {
                        xtype: 'combobox'
                        fieldLabel: 'District' #locale
                        reference: 'district'
                        queryMode: 'local'
                        editable: yes
                        forceSelection: yes
                        disabled: yes
                        displayField: 'name'
                        valueField: 'id'

                        bind:
                            store: '{districts}'
                            value: '{gedistrict}'

                        listeners:
                            change: 'onDistrictChange'
                            select: 'onDistrictSelectChange'
                    }
                    {
                        xtype: 'textfield'
                        fieldLabel: 'Zipcode' #locale
                        reference: 'zipcode'
                        disabled: yes
                        bind: '{record.zipcode}'
                    }
                    {
                        fieldLabel: 'Default Address?'
                        xtype: 'radiogroup'

                        bind: value: '{isDefaultAddress}'

                        defaults: name: 'isDefault'

                        items: [
                            {
                                boxLabel: 'Yes'
                                inputValue: yes
                            }
                            {
                                boxLabel: 'No'
                                inputValue: no
                            }
                        ]
                    }
                ]
            }
        ]
    }
