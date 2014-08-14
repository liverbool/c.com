Ext.define 'Magice.Cloud.view.domain.List',
    extend: 'Ext.grid.Panel'
    xtype: 'domain-list'
    reference: 'domainlist'

    selModel:
        allowDeselect: yes

    loadMask: yes
    collapsible: no

    bind: store: '{domains}'

    listeners: selectionchange: 'on.selectionchange'

    initComponent: ->

        @columns = [
            {
                width: 200
                text: 'Domain' #locale
                dataIndex: 'name'
            }
            {
                flex: 1
                text: 'IP' #locale
                dataIndex: 'ip'
            }
        ]

        @callParent arguments