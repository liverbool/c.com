Ext.define 'XXX.view.View',
    extend: 'Ext.panel.Panel'

    xtype: 'AAA'
    itemId: 'AAA'

    controller: 'AAA'

    session: yes
    viewModel:
        type: 'AAA'

    dockedItems:
        xtype: 'jp-topbar'
        ###<locale>###
        dockText: 'BBB'
        ###</locale>###

        dockTools: [
            {
                ###<locale>###
                text: 'Create'
                ###</locale>###
                xtype: 'button'
            }
        ]
