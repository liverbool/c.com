Ext.define "Magice.Main.view.Menu",
    extend: "Ext.container.Container"
    xtype: "item-menu"

    cls: 'item-menu'

    # to prevent allowDeselect not work
    # must split dataview into child item of some panel
    # and do not set data view layout to 'fit'
    items:
        xtype: 'dataview'

        store: {
            autoLoad: yes
            type: 'array'
            fields: ['id', 'label', 'icon']
            data: [
                ['info', 'Info', 'basic id']
                ['addressing', 'Address', 'basic book']
                ['servers', 'Servers', 'desktop']
                ['images', 'Images', 'desktop']
                ['sshkeys', 'SSH Keys', 'desktop']
            ]
        }

        listeners:
            selectionchange: 'onMenuChange'

        itemSelector: '.item'
        selectedItemCls: 'active'

        trackOver: no
        multiSelect: no

        selModel:
            allowDeselect: no

        tpl: [
            '<div class="ui vertical teal menu">'
                '<tpl for=".">'
                    '<a class="item" data-href="{route}">'
                        '<i class="icon {icon}"></i> {label}'
                    '</a>'
                '</tpl>'
            '</div>'
        ]

    setActiveMenu: (id, suppressEvent) ->
        dataview = @down 'dataview'
        rec = dataview.store.getById id
        dataview.getSelectionModel().select [rec], no, suppressEvent