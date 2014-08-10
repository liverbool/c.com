Ext.define 'Magice.Cloud.view.image.List',
    extend: 'Ext.grid.Panel'
    xtype: 'image-list'
    reference: 'imagelist'

    selModel:
        allowDeselect: yes

    loadMask: yes
    collapsible: no

    features: [
        {
            ftype: 'grouping'
            enableGroupingMenu: no
            groupHeaderTpl: [
                '{[this.renderer(values)]}'
                renderer: (values) ->
                    r = values.children[0]
                    sprintf '%s - %s', r.data.machine.name, r.data.distribution
            ]
        }
    ]

    bind: store: '{images}'

    initComponent: ->

        @editing = Ext.create 'Ext.grid.plugin.CellEditing',
            listeners: edit: 'on.edit'

        @plugins = [@editing]

        @columns = [
            {
                hidden: yes
                text: 'ID' #locale
                dataIndex: 'id'
            }
            {
                hidden: yes
                text: 'Distribution'
                dataIndex: 'distribution'
            }
            {
                flex: 1
                text: 'Name' #locale
                dataIndex: 'name'
                field:
                    type: 'textfield'
                    allowBlank: no
            }
            {
                text: 'Type' #locale
                dataIndex: 'type'
                renderer: Ext.humanize.text
            }
            {
                flex: 1
                text: 'created' #locale
                dataIndex: 'createdAt'
                renderer: Ext.humanize.datetime
            }
        ]

        @callParent arguments