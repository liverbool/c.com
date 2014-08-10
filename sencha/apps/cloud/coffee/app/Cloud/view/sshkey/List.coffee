Ext.define 'Magice.Cloud.view.sshkey.List',
    extend: 'Ext.grid.Panel'
    xtype: 'sshkey-list'
    reference: 'sshkeylist'

    selModel:
        allowDeselect: yes

    loadMask: yes
    collapsible: no

    bind: store: '{sshkeys}'

    initComponent: ->

        @columns = [
            {
                flex: 1
                text: 'Name' #locale
                dataIndex: 'name'
            }
        ]

        @callParent arguments