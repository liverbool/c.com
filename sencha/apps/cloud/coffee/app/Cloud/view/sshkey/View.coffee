Ext.define 'Magice.Cloud.view.sshkey.View',
    extend: 'Ext.panel.Panel'

    xtype: 'sshkeys'
    itemId: 'sshkeys'

    border: no

    controller: 'sshkeys'
    viewModel: type: 'sshkeys'
    dockedItems: xtype: 'view-sshkeys-toolbar'

    bind: loading: '{maskingsshkeys}'

    defaults:
        border: no

    maskings:
        key: 'maskingsshkeys'
        stores: ['sshkeys']

    items: [
        {
            xtype: 'sshkey-list'
        }
    ]
