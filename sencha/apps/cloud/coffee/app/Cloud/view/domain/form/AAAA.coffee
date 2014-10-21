Ext.define 'Magice.Cloud.view.domain.form.AAAA',
    extend: 'Ext.window.Window'
    xtype: 'dns-form-aaaa'

    bind: title: 'Add Record AAAA - {record.name}'

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
                fieldLabel: 'Hostname'
                bind: '{dns.name}'
            }
            {
                name: 'data'
                xtype: 'textfield'
                fieldLabel: 'IPv6 Address'
                bind: '{dns.data}'
            }
        ]

    buttons: [
        {
            text: 'Save'
            handler: 'on.dns.save'
            dnstype: 'aaaa'
        }
    ]