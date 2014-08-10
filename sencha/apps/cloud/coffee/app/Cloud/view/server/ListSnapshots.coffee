Ext.define 'Magice.Cloud.view.server.ListSnapshots',
    extend: 'Ext.window.Window'
    xtype: 'server-list-snapshots'

    width: 450
    height: 300

    maximizable: yes

    maskings:
        parent: 'servers'
        key: 'maskingsnapshots'
        stores: ['snapshots']

    bind:
        title: 'Snapshots - {server.name}'
        loading: '{maskingsnapshots}'

    layout: 'fit'

    initComponent: ->

        @editing = Ext.create 'Ext.grid.plugin.CellEditing',
            listeners: edit: 'on.list.snapshots.edit'

        @items =
            xtype: 'grid'
            reference: 'snapshotlist'

            plugins: [@editing]

            border: no

            selModel:
                allowDeselect: yes

            bind:
                store: '{snapshots}'
                reload: '{serverselection}'

            setReload: (rec) ->
                @store.load parameters: id: rec.get('id')

            columns: [
                {
                    flex: 1
                    text: 'Name'
                    dataIndex: 'name'
                    field:
                        type: 'textfield'
                        allowBlank: no
                }
                {
                    text: 'Distribution'
                    dataIndex: 'distribution'
                }
                {
                    hidden: yes
                    text: 'Created At'
                    dataIndex: 'createdAt'
                    renderer: Ext.humanize.datetime
                }
                {
                    text: 'Created'
                    dataIndex: 'createdAt'
                    renderer: Ext.humanize.duration
                }
            ]

            # inside grid to disabled on loading
            tbar: [
                {
                    text: 'Create'
                    handler: 'on.action.snapshot'
                    glyph: Glyph.CREATE
                }
                {
                    disabled: yes
                    text: 'Restore'
                    bind: disabled: '{!snapshotlist.selection}'
                    glyph: Glyph.RESTORE
                    referer: 'snapshotlist'
                    handler: 'on.action.restore'
                }
                {
                    disabled: yes
                    text: 'Rename'
                    glyph: Glyph.RENAME

                    bind:
                        disabled: '{!snapshotlist.selection}'
                        record: '{snapshotlist.selection}'

                    handler: (me) =>
                        rec = me.getRecord()

                        return if !rec

                        @editing.cancelEdit()
                        @editing.startEdit rec, 0
                }
                {
                    disabled: yes
                    text: 'Destroy'
                    glyph: Glyph.DESTROY
                    bind: disabled: '{!snapshotlist.selection}'
                    referer: 'snapshotlist'
                    handler: 'on.action.destroyimage'
                }
                {
                    text: 'Refresh'
                    handler: 'on.list.snapshots.refresh'
                    glyph: Glyph.REFRESH
                }
            ]

        @callParent arguments