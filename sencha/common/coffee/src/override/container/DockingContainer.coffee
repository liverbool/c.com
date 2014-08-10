Ext.define 'Ext.override.container.DockingContainer',
    override: 'Ext.container.DockingContainer'

    getDockedItems: ->
        # BUG TODO: trace again
        if !@getComponentLayout().getDockedItems
            console.warn 'Try to: Ext.container.DockingContainer#getComponentLayout().getDockedItems'
        else @callParent arguments