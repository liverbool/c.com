Ext.define 'Magice.Info.view.View',
    extend: 'Ext.panel.Panel'
    xtype: 'info'
    itemId: 'info'

    controller: 'info'

    session: yes
    viewModel:
        type: 'info'

    dockedItems:
        xtype: 'jp-topbar'
        ###<locale>###
        dockText: 'Your Info'
        ###</locale>###

        dockTools: [
            {
                ###<locale>###
                text: 'Edit info'
                ###</locale>###
                xtype: 'button'
                handler: 'showEditFormInfo'
            }
            {
                ###<locale>###
                text: 'Edit contact'
                ###</locale>###
                xtype: 'button'
                handler: 'showEditFormContact'
            }
        ]

    bind:
        data: '{infoData}'

    constructor: ->

        @tpl = [
            'Fullname: <b>{fullname}</b><br>'
            'Firstname: <b>{firstname}</b><br>'
            'Lastname: <b>{lastname}</b><br>'
        ]

        @callParent arguments
