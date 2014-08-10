Ext.define 'Magice.Cloud.view.server.actions.RenameController',

    actionRenameSelector:                   'server-actions-rename'
    'on.action.rename':                     -> @takeAction @actionRenameSelector
    'on.action.rename.close':       (me)    -> @view.remove me
    'on.action.rename.save':                -> @['rename.action']()
    'on.action.rename.error':               -> @server 'reject'
    'on.action.rename.errored':             -> @server 'sync'
    'on.action.rename.completed':           -> @server 'commit'
    'on.action.rename.beforeclose': (me)    ->

        return unless @server 'isDirty'

        locale = @locale.rename.confirm

        Ext.Msg.confirm locale.title, locale.message, (btn) =>
            if btn is 'no'
                @server 'reject'
                me.close()
            else
                if @server('isValid') isnt yes
                    Ext.Msg.error @locale.rename.notValid
                    return no
                @['rename.action']()
        return no

    'rename.action': ->

        return Ext.Msg.alert @locale.rename.notDirty if @server('isDirty') isnt yes
        return Ext.Msg.error @locale.rename.notValid if @server('isValid') isnt yes

        operation = @operation @actionRenameSelector
        operation.prepare @processer

        @server 'save',
            params: type: 'rename'
            success: (rec, Operation) -> operation.processing Operation
            failure: (rec, Operation)-> operation.failure Operation