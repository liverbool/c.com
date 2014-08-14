Ext.define 'Magice.Cloud.view.domain.Form',
    extend: 'Ext.window.Window'
    xtype: 'domain-form'

    title: 'Domain'

    width: 400

    modelValidation: yes
    modal: yes

    listeners: close: 'on.close'

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
                fieldLabel: 'Domain'
                bind: '{record.name}'
            }
            {
                name: 'ip'
                xtype: 'textfield'
                fieldLabel: 'IP Address'
                bind: '{record.ip}'
            }
            # TODO: add server compo for choosh for IP
        ]

    buttons: [
        {
            text: 'Save'
            handler: 'on.save'
        }
    ]