Ext.define 'Magice.Addressing.view.View',
    extend: 'Ext.panel.Panel'

    xtype: 'addressing'
    itemId: 'addressing'

    controller: 'addressing'

    viewModel: type: 'addressing'

    dockedItems: [
        {
            xtype: 'jp-topbar'
            dockText: 'Your Addresses' #locale

            dockTools: [
                {
                    text: 'Create' #locale
                    xtype: 'button'
                    handler: 'showEditForm'
                    create: yes
                }
            ]
        }
    ]

    items: [
        {
            xtype: 'dataview'
            bind: store: '{addresses}'
            itemSelector: '.ui.list .item'
            autoScroll: yes

            tpl: [
                '<div class="ui horizontal list">'
                    '<tpl for=".">'
                        '<div class="item">'
                            '<h3>{personnel}</h3>'
                            '<div>'
                                '<h4>{company}</h4>'
                                '<address>{province.name}</address>'
                            '</div>'
                        '</div>'
                    '</tpl>'
                '</div>'
            ]
        }
    ]

