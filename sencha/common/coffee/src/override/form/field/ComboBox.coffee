Ext.define 'Ext.override.form.field.ComboBox',
    override: 'Ext.form.field.ComboBox'

    privates:
        # store origin value to set after store loaded
        valueBeforeLoaded: null

    setValue: (val, doSelect) ->
        #console.log '++setValue.' + @reference + ' - ' + @valueBeforeLoaded + ',' + val
        @valueBeforeLoaded = val if val
        @callParent arguments

    onLoad: ->
        #console.info '--onLoad.' + @reference + ' - ' + @valueBeforeLoaded + ',' + @value
        if @valueBeforeLoaded
            @value = @valueBeforeLoaded
            @valueBeforeLoaded = null

        @callParent arguments