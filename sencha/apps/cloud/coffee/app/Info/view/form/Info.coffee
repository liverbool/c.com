Ext.define 'Magice.Info.view.form.Info',
    extend: 'Ext.window.Window'
    reference: 'info-form-window'

    title: 'Edit your info'

    # This connects bound form fields to the associated model validators:
    modelValidation: yes

    width: 400
    minWidth: 400
    minHeight: 300

    resizable: yes
    autoScroll: yes
    modal: yes
    shadow: no

    defaultFocus: 'firstname'
    closeAction: 'hide'

    buttons: [
        {
            text: 'Save Change' #locale
            handler: 'saveChange'
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
                fieldLabel: 'Gender' #locale
                xtype: 'radiogroup'

                # http://www.sencha.com/forum/showthread.php?287770-How-to-bind-data-links-to-radiogroup&p=1051992
                bind:
                    value: '{gender}'

                layout:
                    autoFlex: no

                defaults:
                    name: 'gender'
                    margin: '0 15 0 0'

                items: [
                    {
                        boxLabel: 'Male'
                        inputValue: 'M'
                    }
                    {
                        boxLabel: 'Female'
                        inputValue: 'F'
                    }
                ]
            }
            {
                fieldLabel: 'Firstname' #locale
                xtype: 'textfield'
                name: 'firstname'
                bind: '{record.firstname}'
                allowBlank: no
            }
            {
                fieldLabel: 'Lanstname' #locale
                xtype: 'textfield'
                name: 'lastname'
                bind: '{record.lastname}'
                allowBlank: no
            }
            {
                fieldLabel: 'Personal Id' #locale
                xtype: 'textfield'
                name: 'personalId'
                bind: '{record.personalId}'
                allowBlank: yes
            }
            {
                fieldLabel: 'Birth Day (d/m/Y)' #locale
                xtype: 'datefield'
                name: 'birthday'
                bind: '{record.birthday}'
                format: 'd/m/Y'
                allowBlank: no
                minValue: Ext.Date.add new Date(), Ext.Date.YEAR, -Magice.Info.model.Info.MAX_AGE
                maxValue: Ext.Date.add new Date(), Ext.Date.YEAR, -Magice.Info.model.Info.MIN_AGE
            }
        ]
    ]
