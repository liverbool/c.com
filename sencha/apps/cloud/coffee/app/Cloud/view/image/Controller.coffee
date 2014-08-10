Ext.define 'Magice.Cloud.view.image.Controller',
    extend: 'Magice.base.ViewController'

    alias: 'controller.images'

    mixins: [
        'Magice.Cloud.view.server.actions.DestoryImageController'
    ]

    locale:
        renameError:
            title: 'Oops!'
            message: 'Unable to update your image name.'
        imagelist:
            destoryTitle: 'Destroy image.'
            noSelection:
                title: 'Oops!'
                message: "Cannot destroy empty record. You may lost backup's selection."

    init: (view) ->
        @callParent arguments

        # updateActiveState is magic method of Ext.Config
        # it called when setter fire
        view.updateActiveState = this.updateActiveState.bind @

    updateActiveState: (activeState) ->
        @load 'images', params: type: activeState
        @fireEvent 'changeroute', @, 'images/' + activeState
        @getView().down('#filter-button').down(sprintf '[filter="%s"]', activeState).setPressed yes

    takeAction: (name, config) ->
        config.locks = @view
        @view.add(Ext.widget(name, config)).show()

    'on.refresh': -> @model.get('images').reload()

    'on.edit': (ed, field) ->
        #win = ed.grid.up 'window'
        #title = win.title

        #win.setTitle sprintf '%s <i><small>%s</small></i>', title, @locale.updating

        Ext.Ajax.request
            url: '/cloud/images/[id]/[img]/edit'
            method: 'PUT'
            params: name: field.value
            parameters:
                id: field.record.get 'machineId'
                img: field.record.get 'id'
            #callback: -> win.setTitle title
            success: -> field.record.commit()
            failure: =>
                field.record.reject()
                Ext.Notify::error @locale.renameError

    'on.rename': (btn) ->
        rec = btn.getRecord()

        return if !rec

        imagelist = @lookup 'imagelist'
        imagelist.editing.cancelEdit()
        imagelist.editing.startEdit rec, 2

    'on.destroy': (btn) -> @callAction 'on.action.destroyimage', btn

    'on.filter': (btn) -> @getView().setActiveState btn.filter