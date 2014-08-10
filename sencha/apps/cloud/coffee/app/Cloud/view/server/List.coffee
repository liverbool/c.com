Ext.define 'Magice.Cloud.view.server.List',
    extend: 'Ext.grid.Panel'
    xtype: 'server-list'
    reference: 'serverlist'

    selModel:
        allowDeselect: yes

    listeners:
        selectionchange: 'on.list.selection.change'

    loadMask: yes

    columns: [
        {
            hidden: yes
            text: 'ID' #locale
            dataIndex: 'id'
        }
        {
            text: 'Distribution'
            dataIndex: 'image'
            renderer: (v) -> v.distribution
        }
        {
            flex: 1
            text: 'Name' #locale
            dataIndex: 'name'
        }
        {
            text: 'Created'
            dataIndex: 'createdAt'
            renderer: Ext.humanize.date
        }
        {
            width: 150
            text: 'IP Address' #locale
            dataIndex: 'networks'
            renderer: (v) ->
                return unless v
                v = v.v4 if v.v4
                for n in v
                    return n.ipAddress if n.type is 'public'
        }
        {
            text: 'Memory' #locale
            dataIndex: 'size'
            renderer: (v) -> if v then v.memory + 'MB' else null
        }
        {
            text: 'SSD Disk' #locale
            dataIndex: 'size'
            renderer: (v) -> if v then v.disk + 'GB' else null
        }
        {
            text: 'CPU' #locale
            dataIndex: 'size'
            renderer: (v) -> if v and v.slug then v.slug.toUpperCase() else null
        }
        {
            hidden: yes
            text: 'Locked' #locale
            dataIndex: 'locked'
        }
        {
            text: 'Backups' #locale
            dataIndex: 'isEnableBackups'
        }
        {
            text: 'Status' #locale
            dataIndex: 'status'
            renderer: Ext.humanize.text
        }
    ]