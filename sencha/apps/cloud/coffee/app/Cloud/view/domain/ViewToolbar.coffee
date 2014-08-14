Ext.define 'Magice.Cloud.view.domain.ViewToolbar',
    extend: 'Ext.container.Container'

    xtype: 'view-domains-toolbar'

    locale:
        button:
            refresh: 'Refresh'


    initComponent: ->

        @items = [
            {
                xtype: 'jp-topbar'
                dockText: 'DNS' #locale

                dockTools: [
                    {
                        text: 'Create'
                        handler: 'on.create'
                        create: yes
                    }
                    {
                        disabled: yes
                        text: 'Destroy'
                        glyph: Glyph.DESTROY
                        bind: disabled: '{!domainlist.selection}'
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

