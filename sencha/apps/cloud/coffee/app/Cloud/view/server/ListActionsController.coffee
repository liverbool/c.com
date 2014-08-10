Ext.define 'Magice.Cloud.view.server.ListActionsController',

    'on.list.actions':          -> @takeAction 'server-list-actions'
    'on.list.actions.refresh':  -> @model.get('actions').reload()
