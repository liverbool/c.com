Ext.define 'Magice.Cloud.view.server.actions.DisableBackupsController',

    actionDisableBackupsSelector:               'server-actions-disablebackups'
    'on.action.disablebackups':                 -> @takeAction @actionDisableBackupsSelector
    'on.action.disablebackups.action':          -> @['disablebackups.action']()
    'on.action.disablebackups.close':    (me)   -> @view.remove me
    'on.action.disablebackups.error':           -> @server 'sync'
    'on.action.disablebackups.success':         -> @server 'sync'

    'disablebackups.action': ->

        operation = @operation @actionDisableBackupsSelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/disablebackups'
            parameters: id: @server 'get', 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response