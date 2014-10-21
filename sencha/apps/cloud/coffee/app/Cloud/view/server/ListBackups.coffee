Ext.define 'Magice.Cloud.view.server.ListBackups',
    extend: 'Ext.window.Window'
    xtype: 'server-list-backups'

    width: 450
    height: 300

    maximizable: yes

    maskings:
        parent: 'servers'
        key: 'maskingbackups'
        stores: ['backups']

    bind:
        title: 'Backups - {server.name}'
        loading: '{maskingbackups}'

    layout: 'fit'

    initComponent: ->

        @editing = Ext.create 'Ext.grid.plugin.CellEditing',
            listeners: edit: 'on.list.backups.edit'

        @items =
            xtype: 'grid'
            reference: 'backuplist'

            plugins: [@editing]

            border: no

            selModel:
                allowDeselect: yes

            bind:
                store: '{backups}'
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
                    renderer: humanize.datetime
                }
                {
                    text: 'Created'
                    dataIndex: 'createdAt'
                    renderer: humanize.duration
                }
            ]

            # inside grid to disabled on loading
            tbar: [
                {
                    disabled: yes
                    text: 'Restore'
                    bind: disabled: '{!backuplist.selection}'
                    glyph: Glyph.RESTORE
                    referer: 'backuplist'
                    handler: 'on.action.restore'
                }
                {
                    disabled: yes
                    text: 'Rename'
                    glyph: Glyph.RENAME

                    bind:
                        disabled: '{!backuplist.selection}'
                        record: '{backuplist.selection}'

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
                    bind: disabled: '{!backuplist.selection}'
                    referer: 'backuplist'
                    handler: 'on.action.destroyimage'
                }
                {
                    text: 'Refresh'
                    handler: 'on.list.backups.refresh'
                    glyph: Glyph.REFRESH
                }
            ]

        @callParent arguments