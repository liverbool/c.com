Ext.define 'Magice.Cloud.view.server.actions.RebootController',

    actionRebootSelector:               'server-actions-reboot'
    'on.action.reboot':                 -> @takeAction @actionRebootSelector
    'on.action.reboot.action':          -> @['reboot.action']()
    'on.action.reboot.close':    (me)   -> @view.remove me
    'on.action.reboot.error':           -> @server 'sync'
    'on.action.reboot.success':         -> @server 'sync'

    'reboot.action': ->

        operation = @operation @actionRebootSelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/reboot'
            parameters: id: @server 'get', 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response