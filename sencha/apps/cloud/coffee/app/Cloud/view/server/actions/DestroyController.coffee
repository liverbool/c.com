Ext.define 'Magice.Cloud.view.server.actions.DestroyController',

    actionDestroySelector:               'server-actions-destroy'
    'on.action.destroy':                 -> @takeAction @actionDestroySelector
    'on.action.destroy.action':          -> @callAction 'destroy.action'
    'on.action.destroy.close':    (me)   -> @view.remove me
    'on.action.destroy.error':           -> @server 'sync'
    'on.action.destroy.success':         -> @model.get('servers').remove @server()

    'destroy.action': ->

        operation = @operation @actionDestroySelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'DELETE'
            url: '/cloud/servers/[id]'
            parameters: id: @server 'get', 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response