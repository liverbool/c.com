Ext.define "Magice.Main.view.View",
    extend: "Ext.container.Container"
    xtype: "main"

    controller: "main"
    viewModel: type: "main"

    header: no
    border: no

    layout: 'border'

    defaults:
        header: no
        border: no

    items: [
        {
            region: 'north'
            height: 42
            xtype: 'item-header'
        }
        {
            region: 'west'
            width: 250
            xtype: 'item-menu'
            split: yes
        }
        {
            region: 'center'
            xtype: 'container'
            layout: 'card'
            defaults:
                border: no
            items: [
                {
                    # This page has a hidden tab so we can only get here during initialization. This
                    # allows us to avoid rendering an initial activeTab only to change it immediately
                    # by routing
                    xtype: "component"
                    hidden: true
                }
            ]
        }
    ]