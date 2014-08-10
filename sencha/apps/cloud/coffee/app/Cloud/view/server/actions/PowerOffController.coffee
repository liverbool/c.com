Ext.define 'Magice.Cloud.view.server.actions.PowerOffController',

    actionPowerOffSelector:               'server-actions-poweroff'
    'on.action.poweroff':                 -> @takeAction @actionPowerOffSelector
    'on.action.poweroff.action':          -> @['poweroff.action']()
    'on.action.poweroff.close':    (me)   -> @view.remove me
    'on.action.poweroff.error':           -> @server 'sync'
    'on.action.poweroff.success':         -> @server 'sync'

    'poweroff.action': ->

        return if @powerCurrentlyOff()

        operation = @operation @actionPowerOffSelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/poweroff'
            parameters: id: @server 'get', 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response