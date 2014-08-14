Ext.define 'Magice.Cloud.view.server.form.CreateSize',
    extend: 'Ext.grid.Panel'
    xtype: 'creator-size'

    title: 'Sizes' #locale
    bind: store: '{creatorsSizes}'

    listeners: selectionchange: 'on.creator.size.selectionchange'

    columns: [
        {
            sortable: no
            menuDisabled: yes
            text: 'CPU' #locale
            dataIndex: 'vcpus'
            renderer: (v) -> v + 'GB'
        }
        {
            sortable: no
            menuDisabled: yes
            text: 'Memory' #locale
            dataIndex: 'memory'
            renderer: (v) -> Ext.humanize.format v, '0b', 'mb'
        }
        {
            sortable: no
            menuDisabled: yes
            text: 'SSD Disk' #locale
            dataIndex: 'disk'
            renderer: (v) -> v + 'GB'
        }
        {
            sortable: no
            menuDisabled: yes
            text: 'Transfer' #locale
            dataIndex: 'transfer'
            renderer: (v) -> v + 'GB'
        }
        {
            sortable: no
            menuDisabled: yes
            text: 'Hourly' #locale
            dataIndex: 'priceHourly'
        }
        {
            sortable: no
            menuDisabled: yes
            text: 'Monthly' #locale
            dataIndex: 'priceMonthly'
            flex: 1
            # TODO: money render
        }
    ]