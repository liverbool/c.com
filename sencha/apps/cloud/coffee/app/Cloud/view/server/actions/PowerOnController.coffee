Ext.define 'Magice.Cloud.view.server.actions.PowerOnController',

    actionPowerOnSelector:               'server-actions-poweron'
    'on.action.poweron':                 -> @takeAction @actionPowerOnSelector
    'on.action.poweron.action':          -> @['poweron.action']()
    'on.action.poweron.close':    (me)   -> @view.remove me
    'on.action.poweron.error':           -> @server 'sync'
    'on.action.poweron.success':         -> @server 'sync'

    'poweron.action': ->

        return if @powerCurrentlyOn()

        operation = @operation @actionPowerOnSelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/poweron'
            parameters: id: @server 'get', 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response