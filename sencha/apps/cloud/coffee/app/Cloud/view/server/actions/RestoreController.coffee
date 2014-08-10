Ext.define 'Magice.Cloud.view.server.actions.RestoreController',

    actionRestoreSelector: 'server-actions-restore'

    'on.action.restore': (btn) ->
        @restoreImageReferer = btn.referer
        @takeAction @actionRestoreSelector, title: @locale[@restoreImageReferer].restoreTitle

    'on.action.restore.action':          -> @['restore.action']()
    'on.action.restore.close':    (me)   -> @view.remove me
    'on.action.restore.error':           -> @server 'sync'
    'on.action.restore.success':         -> @server 'sync'

    'restore.action': ->

        rs = @lookup(@restoreImageReferer).getSelection()

        return Ext.Msg.alert @locale[@restoreImageReferer].noSelection if !rs.length

        operation = @operation @actionRestoreSelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/restore/[img]'
            parameters:
                id: @server 'get', 'id'
                img: rs[0].get 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response