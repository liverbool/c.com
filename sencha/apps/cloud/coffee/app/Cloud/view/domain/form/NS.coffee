Ext.define 'Magice.Cloud.view.domain.form.NS',
    extend: 'Ext.window.Window'
    xtype: 'dns-form-ns'

    title: 'Add Record NS'

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
        ]

    buttons: [
        {
            text: 'Save'
            handler: 'on.dns.save'
            dnstype: 'ns'
        }
    ]