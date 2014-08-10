#
# this controller share with ImageController
#
Ext.define 'Magice.Cloud.view.server.actions.DestoryImageController',

    destroyImageSelector: 'server-actions-destroyimage'
    destroyImageCallback: (state) -> @lookup(@destroyImageReferer).getStore().reload()

    'on.action.destroyimage': (btn) ->
        @destroyImageReferer = btn.referer
        @takeAction @destroyImageSelector, title: @locale[@destroyImageReferer].destoryTitle

    'on.action.destroyimage.close':    (me)   -> @view.remove me
    'on.action.destroyimage.error':           -> @destroyImageCallback 'error'
    'on.action.destroyimage.success':         -> @destroyImageCallback 'success'

    'on.action.destroyimage.action': ->

        rs = @lookup(@destroyImageReferer).getSelection()

        return Ext.Msg.alert @locale[@destroyImageReferer].noSelection if !rs.length

        operation = @operation @destroyImageSelector
        operation.prepare Magice.Cloud.view.server.Controller.processer

        Ext.Ajax.request
            method: 'DELETE'
            url: '/cloud/images/[id]/[img]/destroy'
            parameters:
                id: rs[0].machineId or @server 'get', 'id'
                img: rs[0].get 'id'
            success: (response) -> operation.processing response
            failure: (response) -> operation.failure response