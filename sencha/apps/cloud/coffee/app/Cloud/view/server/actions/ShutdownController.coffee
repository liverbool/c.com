Ext.define 'Magice.Cloud.view.server.actions.ShutdownController',

    actionShutdownSelector:               'server-actions-shutdown'
    'on.action.shutdown':                 -> @takeAction @actionShutdownSelector
    'on.action.shutdown.action':          -> @['shutdown.action']()
    'on.action.shutdown.close':    (me)   -> @view.remove me
    'on.action.shutdown.error':           -> @server 'sync'
    'on.action.shutdown.success':         -> @server 'sync'

    'shutdown.action': ->

        return if @powerCurrentlyOff()

        operation = @operation @actionShutdownSelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/shutdown'
            parameters: id: @server 'get', 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response