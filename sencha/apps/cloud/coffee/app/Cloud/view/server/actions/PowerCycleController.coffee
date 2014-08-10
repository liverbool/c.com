Ext.define 'Magice.Cloud.view.server.actions.PowerCycleController',

    actionCycleSelector:               'server-actions-cycle'
    'on.action.cycle':                 -> @takeAction @actionCycleSelector
    'on.action.cycle.action':          -> @['cycle.action']()
    'on.action.cycle.close':    (me)   -> @view.remove me
    'on.action.cycle.error':           -> @server 'sync'
    'on.action.cycle.success':         -> @server 'sync'

    'cycle.action': ->

        operation = @operation @actionCycleSelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/cycle'
            parameters: id: @server 'get', 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response