Ext.define 'Magice.Cloud.view.server.form.Create',
    extend: 'Ext.window.Window'
    reference: 'creatorWindow'

    modelValidation: yes

    width: 670
    minWidth: 400
    #maxHeight: 500

    y: 0

    resizable: yes
    maximizable: yes
    modal: no
    shadow: no

    closeAction: 'destroy'

    title: 'Create New Server' #locale

    dockedItems: xtype: 'creator-dockedbar'

    activeItem: 1

    layout:
        type: 'card'
        deferredRender: yes

    listeners: show: -> @maximize yes

    defaults:
        xtype: 'container'
        layout: 'fit'
        autoScroll: yes
        border: no

    items: [
        {
            xtype: 'operation-panel'

            locales:
                warning:
                    header: 'Warning!'
                    message: 'Something happend while processing.
                              You will wait few munites and try to reload your browser.'

            listeners:
                'activate': 'on.create.step0'
                'on.error': 'on.create.ended'
                'on.warning': 'on.create.ended'
                'on.success': 'on.create.ended'
        }
        {
            layout:
                type: 'vbox'
                pack: 'start'
                align: 'stretch'

            defaults:
                layout: 'fit'
                border: no

            items: [
                { xtype: 'creator-hostname' }
                { xtype: 'creator-size', flex: 1 }
                { xtype: 'creator-image', flex: 1, split: yes }
                { xtype: 'creator-feature' }
            ]
            listeners: activate: 'on.create.step-select'
        }
        {
            xtype: 'creator-summary'
            listeners: activate: 'on.create.step-summary'
        }
    ]

    getOperation: -> @down('operation-panel').setParent(@)