Ext.define 'Magice.Cloud.view.server.ListBackupsController',

    'on.list.backups':         -> @takeAction 'server-list-backups'
    'on.list.backups.refresh': -> @model.get('backups').reload()

    'on.list.backups.edit': (ed, cell) ->
        win = ed.grid.up 'window'
        title = win.title

        win.setTitle sprintf '%s <i><small>%s</small></i>', title, @locale.backuplist.updating

        Ext.Ajax.request
            url: '/cloud/images/[id]/[img]'
            method: 'PUT'
            params: name: cell.value
            parameters:
                id: @server 'get', 'id'
                img: cell.record.get 'id'
            callback: -> win.setTitle title
            success: -> cell.record.commit()
            failure: =>
                cell.record.reject()
                Ext.Notify::error @locale.backuplist.renameError

