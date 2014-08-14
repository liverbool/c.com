Ext.define 'Magice.Cloud.view.domain.form.TXT',
    extend: 'Ext.window.Window'
    xtype: 'dns-form-txt'

    title: 'Add Record TXT'

    width: 400

    modelValidation: yes
    modal: yes

    items:
        xtype: 'form'
        border: no
        padding: 20

        defaults:
            layout: 'anchor'
            anchor: '100%'
            labelAlign: 'top'

        items: [
            {
                name: 'name'
                xtype: 'textfield'
                fieldLabel: 'name'
                bind: '{dns.name}'
            }
            {
                name: 'data'
                xtype: 'textfield'
                fieldLabel: 'Text'
                bind: '{dns.data}'
            }
        ]

    buttons: [
        {
            text: 'Save'
            handler: 'on.dns.save'
            dnstype: 'txt'
        }
    ]