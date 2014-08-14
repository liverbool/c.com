Ext.define 'Magice.Cloud.view.domain.form.MX',
    extend: 'Ext.window.Window'
    xtype: 'dns-form-mx'

    title: 'Add Record MX'

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
                name: 'data'
                xtype: 'textfield'
                fieldLabel: 'Hostname'
                bind: '{dns.data}'
            }
            {
                name: 'priority'
                xtype: 'numberfield'
                fieldLabel: 'Priority'
                bind: '{dns.priority}'
            }
        ]

    buttons: [
        {
            text: 'Save'
            handler: 'on.dns.save'
            dnstype: 'mx'
        }
    ]