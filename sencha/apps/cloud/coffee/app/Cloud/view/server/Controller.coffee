Ext.define 'Magice.Cloud.view.server.Controller',
    extend: 'Magice.base.ViewController'

    mixins: [
        'Magice.Cloud.view.server.Locale'
        'Magice.Cloud.view.server.CreateController'
        'Magice.Cloud.view.server.ListController'
        'Magice.Cloud.view.server.ListActionsController'
        'Magice.Cloud.view.server.ListSnapshotsController'
        'Magice.Cloud.view.server.ListBackupsController'
        'Magice.Cloud.view.server.actions.RenameController'
        'Magice.Cloud.view.server.actions.RebootController'
        'Magice.Cloud.view.server.actions.PowerCycleController'
        'Magice.Cloud.view.server.actions.PowerOffController'
        'Magice.Cloud.view.server.actions.PowerOnController'
        'Magice.Cloud.view.server.actions.ShutdownController'
        'Magice.Cloud.view.server.actions.ResetPasswordController'
        'Magice.Cloud.view.server.actions.SnapshotController'
        'Magice.Cloud.view.server.actions.EnableIPv6Controller'
        'Magice.Cloud.view.server.actions.EnablePrivateNetworkingController'
        'Magice.Cloud.view.server.actions.DisableBackupsController'
        'Magice.Cloud.view.server.actions.DestoryImageController'
        'Magice.Cloud.view.server.actions.RebuildController'
        'Magice.Cloud.view.server.actions.DestroyController'
        'Magice.Cloud.view.server.actions.KernelController'
        'Magice.Cloud.view.server.actions.RestoreController'
    ]

    alias: 'controller.servers'

    statics:
        # to shareable with other controller
        processer: (operation, actionId) ->

            return operation.warning() if !actionId

            Ext.Ajax.request
                url: '/cloud/actions/[id]'
                parameters: id: actionId
                method: 'GET'
                success: (response) -> operation.processing response
                failure: (response) -> operation.warning response

    server: (action, opts) ->
        server = @model.get 'server'
        return server if action is undefined
        console.log action

        switch action
            when undefined then server
            when 'sync' then @sync server
            else server[action](opts if opts isnt undefined)

    confirmPowerOff: ->
        if @server('get', 'status') isnt 'off'
            @locale.reqiurePowerOff.message = sprintf @locale.reqiurePowerOff.message, @server('get', 'name')
            return Ext.Msg.alert @locale.reqiurePowerOff

    powerCurrentlyOff: ->
        if @server('get', 'status') is 'off'
            @locale.powerCurrentlyOff.message = sprintf @locale.powerCurrentlyOff.message, @server('get', 'name')
            return Ext.Msg.alert @locale.powerCurrentlyOff

    powerCurrentlyOn: ->
        if @server('get', 'status') is 'off'
            @locale.powerCurrentlyOn.message = sprintf @locale.powerCurrentlyOn.message, @server('get', 'name')
            return Ext.Msg.alert @locale.powerCurrentlyOn

    takeAction: (name, powerOff, config) ->

        if Ext.isObject powerOff
            config = powerOff
            powerOff = null

        return if powerOff and @confirmPowerOff()

        config = config or {}
        config.locks = @view

        @view.add(Ext.widget(name, config)).show()

    sync: (server, params) ->
        if !server or !server.get 'id'
            return console.warn 'Empty server to sync!'

        console.info 'Being sync server id: ' + server.get 'id'

        # this should run in background
        Ext.Ajax.request
            background: yes
            url: '/cloud/servers/[id]/sync'
            params: params
            parameters: id: server.get 'id'
            success: (response) ->
                server.set Ext.decode response.responseText
                server.commit()
            failure: =>
                @locale.syncError.message = sprintf(@locale.syncError.message, server.get 'name')
                Ext.Notify::error @locale.syncError
