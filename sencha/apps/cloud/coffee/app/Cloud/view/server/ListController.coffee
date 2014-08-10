Ext.define 'Magice.Cloud.view.server.ListController',

    'on.list.selection.change': (sm, rs)->
        # make sure record is not change without save by other UI
        # this will take effect e.g. window rename ui, by no model
        if rs.length and server = @model.get('server')
            server.reject()

    'on.list.refresh': -> @model.get('servers').reload()

