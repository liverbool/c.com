Ext.define 'Magice.Cloud.view.domain.form.MX',
    extend: 'Ext.window.Window'
    xtype: 'dns-form-mx'

    bind: title: 'Add Record MX - {record.name}'

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
                minValue: 0
                maxValue: 65535
            }
        ]

    buttons: [
        {
            text: 'Save'
            handler: 'on.dns.save'
            dnstype: 'mx'
        }
    ]