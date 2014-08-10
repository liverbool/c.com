Ext.define 'Magice.Cloud.view.server.actions.EnableIPv6Controller',

    actionEnableIPv6Selector:               'server-actions-enableipv6'
    'on.action.enableipv6':                 -> @takeAction @actionEnableIPv6Selector
    'on.action.enableipv6.action':          -> @['enableipv6.action']()
    'on.action.enableipv6.close':    (me)   -> @view.remove me
    'on.action.enableipv6.error':           -> @server 'sync'
    'on.action.enableipv6.success':         -> @server 'sync'

    'enableipv6.action': ->

        operation = @operation @actionEnableIPv6Selector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/enableipv6'
            parameters: id: @server 'get', 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response