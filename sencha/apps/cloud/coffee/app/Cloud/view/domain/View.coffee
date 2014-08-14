Ext.define 'Magice.Cloud.view.domain.View',
    extend: 'Ext.panel.Panel'

    xtype: 'domains'
    itemId: 'domains'

    border: no

    controller: 'domains'
    viewModel: type: 'domains'
    dockedItems: xtype: 'view-domains-toolbar'

    bind: loading: '{maskingdomains}'

    defaults:
        border: no

    maskings:
        key: 'maskingdomains'
        stores: ['domains']

    items: [
        {
            xtype: 'domain-list'
        }
        {
            xtype: 'record-list'
        }
    ]
