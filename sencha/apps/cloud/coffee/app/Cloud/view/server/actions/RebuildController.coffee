Ext.define 'Magice.Cloud.view.server.actions.RebuildController',

    actionRebuildSelector:                   'server-actions-rebuild'
    'on.action.rebuild':                     -> @takeAction @actionRebuildSelector
    'on.action.rebuild.close':       (me)    -> @view.remove me
    'on.action.rebuild.action':              -> @callAction 'rebuild.action'
    'on.action.rebuild.error':               -> @server 'sync'
    'on.action.rebuild.errored':             -> @server 'sync'
    'on.action.rebuild.completed':           -> @server 'sync'

    'rebuild.action': ->
        server = @server()

        if @lookup('rebuildCheckbox').checked
            imageId = server.get('image').id
        else imageId = @lookup('rebuildCombox').value

        return Ext.Msg.error @locale.rebuild.noSelectedImage if !imageId

        operation = @operation @actionRebuildSelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/rebuild/[img]'
            parameters:
                id: server.get 'id'
                img: imageId
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response
