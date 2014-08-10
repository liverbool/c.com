Ext.define 'Magice.Cloud.view.server.actions.SnapshotController',

    actionSnapshotelector: 'server-actions-snapshot'
    getSnapshotLabel: -> @view.down(@actionSnapshotelector).down('[xtype="textfield"]')

    snapshotCallback: (state) ->
        # after snapshot manchin will on by automatic
        # we must to sync to update our status
        @server 'sync'

        if snapshotlist = @lookup 'snapshotlist'
            snapshotlist.store.reload()

    'on.action.snapshot':                     -> @takeAction @actionSnapshotelector, yes
    'on.action.snapshot.close':       (me)    -> @view.remove me
    'on.action.snapshot.save':                -> @['snapshot.action']()
    'on.action.snapshot.error':               -> @snapshotCallback 'error'
    'on.action.snapshot.success':             -> @snapshotCallback 'success'

    'snapshot.action': ->

        return if @confirmPowerOff()

        if @getSnapshotLabel().isValid() isnt yes
            return Ext.Msg.error @locale.snapshot.notValid

        operation = @operation @actionSnapshotelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/snapshot'
            params: name: @getSnapshotLabel().getValue()
            parameters: id: @server 'get', 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response