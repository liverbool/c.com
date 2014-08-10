Ext.define 'Magice.Info.view.form.Contact',
    extend: 'Ext.window.Window'
    reference: 'info-form-contact-window'

    title: 'Edit your contact' #locale

    # This connects bound form fields to the associated model validators:
    modelValidation: yes

    width: 300
    minWidth: 300

    resizable: yes
    autoScroll: yes
    modal: yes
    shadow: no

    defaultFocus: 'mobile'
    closeAction: 'hide'

    buttons: [
        {
            text: 'Save Change' #locale
            handler: 'saveContactChange'
        }
    ]

    getForm: ->
        @down('form')

    getBasicForm: ->
        @getForm().getForm()

    getFieldValue: (name) ->
        @getForm().getFieldValue name

    findField: (name) ->
        @getForm().findField name

    items: [
        xtype: 'form'
        bodyPadding: 20
        border: no

        layout: 'anchor'

        defaults:
            labelAlign: 'top'
            anchor: '100%'
            msgTarget: 'under'

        items: [
            {
                fieldLabel: 'Mobile' #locale
                anchor: '100%'
                labelAlign: 'top'
                xtype: 'textfield'
                name: 'mobile'
                bind: '{record.mobile}'
            }
            {
                fieldLabel: 'Home' #locale
                anchor: '100%'
                labelAlign: 'top'
                xtype: 'textfield'
                name: 'telHome'
                bind: '{record.telHome}'
            }
            {
                xtype: 'fieldcontainer'
                layout: 'hbox'

                items: [
                    {
                        fieldLabel: 'Work' #locale
                        flex: 1
                        labelAlign: 'top'
                        xtype: 'textfield'
                        name: 'telWork'
                        bind: '{record.telWork}'
                    }
                    {
                        fieldLabel: 'Ex.' #locale
                        width: 50
                        margin: '0 0 0 5'
                        labelAlign: 'top'
                        xtype: 'textfield'
                        name: 'telWorkExt'
                        bind: '{record.telWorkExt}'
                    }
                ]
            }
        ]
    ]
