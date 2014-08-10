Ext.define "Ext.ux.jp.panel.TopBar",
    extend: "Ext.container.Container"
    alias: "widget.jp-topbar"
    dock: "top"

    config:
        dockText: null
        dockTools: null

    layout:
        type: "hbox"
        align: "stretch"

    initComponent: (config) ->
        @items = []

        if @dockText
            @items.push (if typeof @dockText is "object" then @dockText else
                xtype: "container"
                cls: "jp-topbar-text"
                html: @dockText
                flex: 1
            )

        if @dockTools
            @items.push
                xtype: "container"
                cls: "jp-topbar-tools"

                items: @dockTools

                layout:
                    type: "hbox"
                    pack: "end"

                defaults:
                    margin: "0 0 0 5"
                    xtype: 'button'

                flex: 1

        Ext.apply this, config

        @callParent arguments
        return
