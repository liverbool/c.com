Ext.define 'Magice.Cloud.view.server.form.CreateImage',
    extend: 'Ext.tab.Panel'
    xtype: 'creator-image'

    title: 'Images'

    defaults: border: no
    plain: yes
    items: [
        {
            title: 'Linux Distributions' #locale
            layout:
                type: 'vbox'
                pack: 'start'
                align: 'stretch'
            defaults: border: no

            items: [
                {
                    itemId: 'distributor'
                    xtype: 'dataview'
                    bind: store: '{creatorsDistributors}'
                    itemSelector: '.item'
                    multiSelect: no
                    selModel: allowDeselect: no
                    listeners:
                        selectionchange: 'on.creator.dist.selectionchange'
                        refresh: -> @selModel.select 0 if !@selModel.isSelected()
                    tpl: [
                        '<div class="ui horizontal list">'
                            '<tpl for=".">'
                                '<div class="item">'
                                    '<img class="ui avatar image" src="http://semantic-ui.com/images/demo/avatar.jpg">'
                                    '<div class="content">'
                                        '<div class="header">{name}</div>'
                                    '</div>'
                                '</div>'
                            '</tpl>'
                        '</div>'
                    ],

                    selectAt: (index) ->
                        rec = @store.getAt index
                        @getSelectionModel().select [rec], no
                }
                {
                    flex: 1
                    xtype: 'grid'
                    bind: store: '{creatorsDistributorsImages}'
                    selModel:
                        mode: 'SINGLE'
                        allowDeselect: no
                    listeners: selectionchange: 'on.creator.dist.image.selectionchange'
                    hideHeaders: yes
                    autoScroll: yes
                    columns: [ {dataIndex: 'name', flex: 1} ]
                }
            ]
        }
        {
            title: 'My Images' #locale
            html: 'Comming soon ..'
            disabled: yes
        }
        {
            title: 'My Backups' #locale
            html: 'Comming soon ..'
            disabled: yes
        }
    ]