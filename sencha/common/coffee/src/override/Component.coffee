Ext.define 'Ext.override.Component',
    override: 'Ext.Component'

    config:
        maskings:
            key: 'masking'
            stores: null

        popup: null

    privates:
        _maskings: no
        _loading: 0

    initComponent: ->
        @callParent arguments

        # setup popup
        # @see: http://semantic-ui.com/modules/popup.html#/examples
        if @popup
            @on 'afterrender', ->
                if typeof @popup is 'string'
                    @popup = content: @popup

                $(@el.dom).popup @popup
            , @, single: yes

        @on 'beforerender', @initMasking

    # fix for http://www.sencha.com/forum/showthread.php?288501
    initMasking: ->

        return unless @maskings.stores and @_maskings is no

        if @maskings.parent
            parent = @up(@maskings.parent) or @lookupReference @maskings.parent
            viewModel = parent.getViewModel()
        else viewModel = @getViewModel()

        if !viewModel
            return console.warn 'Cannot found viewModel.'

        for key in @maskings.stores
            # now assume is store
            store = viewModel.getStore key

            store.on 'beforeload', =>
                viewModel.set @maskings.key, !!(++@_loading) #need boolean
                @fireEvent 'masking.being', @ if @_loading is 1

            store.on 'load', =>
                viewModel.set @maskings.key, !!(--@_loading)
                @fireEvent 'masking.finish', @ if @_loading < 1
