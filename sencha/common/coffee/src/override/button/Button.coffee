Ext.define 'Ext.override.button.Button',
    override: 'Ext.button.Button'

    # to bindable (bind: record: '{refgrid.selection}')
    config: record: null

    setLoading: (status) ->
        if typeof status is 'string'
            @originalText = @getText()
            @setText status
            status = yes

        if status is no and @originalText
            @setText @originalText
            @originalText = null

        @setDisabled status
