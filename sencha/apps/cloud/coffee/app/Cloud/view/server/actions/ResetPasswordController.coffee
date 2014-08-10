Ext.define 'Magice.Cloud.view.server.actions.ResetPasswordController',

    actionResetPwdSelector:               'server-actions-resetpwd'
    'on.action.resetpwd':                 -> @takeAction @actionResetPwdSelector
    'on.action.resetpwd.action':          -> @['resetpwd.action']()
    'on.action.resetpwd.close':    (me)   -> @view.remove me
    #'on.action.resetpwd.error':           -> @server 'sync'
    #'on.action.resetpwd.success':         -> @server 'sync'

    'resetpwd.action': ->

        operation = @operation @actionResetPwdSelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/resetpwd'
            parameters: id: @server 'get', 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response