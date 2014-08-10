Ext.define 'Magice.Cloud.view.server.ListSnapshotsController',

    'on.list.snapshots':         -> @takeAction 'server-list-snapshots'
    'on.list.snapshots.refresh': -> @model.get('snapshots').reload()

    'on.list.snapshots.edit': (ed, cell) ->
        win = ed.grid.up 'window'
        title = win.title

        win.setTitle sprintf '%s <i><small>%s</small></i>', title, @locale.snapshotlist.updating

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
                Ext.Notify::error @locale.snapshotlist.renameError

