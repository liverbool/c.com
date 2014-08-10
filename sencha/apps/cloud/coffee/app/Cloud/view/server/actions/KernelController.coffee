Ext.define 'Magice.Cloud.view.server.actions.KernelController',

    actionKernelSelector:                   'server-actions-kernel'
    'on.action.kernel':                     -> @takeAction @actionKernelSelector
    'on.action.kernel.close':       (me)    -> @view.remove me
    'on.action.kernel.action':              -> @callAction 'kernel.action'
    'on.action.kernel.error':               -> @server 'sync'
    'on.action.kernel.errored':             -> @server 'sync'
    'on.action.kernel.completed':           -> @server 'sync'

    'on.actions.kernel.beforeload': (store, opt) ->
        opt.config.parameters = id: @server 'get', 'id'

    'kernel.action': ->
        server = @server()

        if @lookup('kernelCheckbox').checked
            kernelId = 'origin'
        else kernelId = @lookup('kernelCombox').value

        return Ext.Msg.error @locale.kernel.noSelectedImage if !kernelId

        operation = @operation @actionKernelSelector
        operation.prepare @processer

        Ext.Ajax.request
            method: 'PUT'
            url: '/cloud/servers/[id]/kernels/[kernelId]'
            parameters:
                id: server.get 'id'
                kernelId: kernelId
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response
