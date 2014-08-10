Ext.define 'Magice.Cloud.view.sshkey.ViewToolbar',
    extend: 'Ext.container.Container'

    xtype: 'view-sshkeys-toolbar'

    locale:
        button:
            refresh: 'Refresh'


    initComponent: ->

        @items = [
            {
                xtype: 'jp-topbar'
                dockText: 'SSH Keys' #locale

                dockTools: [
                    {
                        text: 'Create'
                        handler: 'on.create'
                        create: yes
                    }
                    {
                        disabled: yes
                        text: 'Edit'
                        glyph: Glyph.EDIT
                        bind: disabled: '{!sshkeylist.selection}'
                        handler: 'on.edit'
                    }
                    {
                        disabled: yes
                        text: 'Destroy'
                        glyph: Glyph.DESTROY
                        bind: disabled: '{!sshkeylist.selection}'
                        handler: 'on.destroy'
                    }
                    {
                        text: @locale.button.refresh
                        handler: 'on.refresh'
                    }
                ]
            }
        ]

        # call parent
        @callParent arguments

