Ext.define 'Magice.Cloud.view.server.actions.EnablePrivateNetworkingController',

    actionEnablePrivateNetworkingSelector:               'server-actions-enableprivatenetworking'
    'on.action.enableprivatenetworking':                 -> @takeAction @actionEnablePrivateNetworkingSelector, yes
    'on.action.enableprivatenetworking.action':          -> @['enableprivatenetworking.action']()
    'on.action.enableprivatenetworking.close':    (me)   -> @view.remove me
    'on.action.enableprivatenetworking.error':           -> @server 'sync'
    'on.action.enableprivatenetworking.success':         -> @server 'sync'

    'enableprivatenetworking.action': ->

        return if @confirmPowerOff()

        operation = @operation @actionEnablePrivateNetworkingSelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/enableprivatenetworking'
            parameters: id: @server 'get', 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response