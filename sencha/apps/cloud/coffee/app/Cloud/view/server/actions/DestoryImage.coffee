Ext.define 'Magice.Cloud.view.server.actions.DestoryImage',
    extend: 'Ext.window.Window'

    xtype: 'server-actions-destroyimage'

    layout: 'card'
    activeItem: 1

    width: 400

    title: 'Destroy Image / Snapshot'

    locale:
        header: 'Note!'
        description: "This will destory your image. Do you wish to proceed?"
        button:
            action: 'Action'
            tryAgain: 'Try again'

    defaults:
        border: no
        xtype: 'container'

    listeners: close: 'on.action.destroyimage.close'

    getOperation: -> @down('operation-panel').setParent(@)

    initComponent: ->

        @items = [
            {
                xtype: 'operation-panel'
                toggleItems: ['#btnAction']

                locales:
                    warning:
                        header: 'Warning!'
                        message: 'Something happend while processing.
                                  You will try to reload your main window.'
                listeners:
                    'on.failure': 'on.action.destroyimage.error'
                    'on.warning': 'on.action.destroyimage.error'
                    'on.success': 'on.action.destroyimage.success'
            }
            {
                data: @locale
                tpl: [
                    '<div class="ui warning message">'
                        '<div class="header">{header}</div>'
                        '<p>{description}</p>'
                    '</div>'
                ]
            }
        ]

        @buttons = [
            {
                cls: 'x-btn-primary'
                itemId: 'btnAction'
                handler: 'on.action.destroyimage.action'
                text: @locale.button.action
            }
            {
                hidden: yes
                itemId: 'btnTryAgain'
                text: @locale.button.tryAgain
            }
        ]

        @callParent arguments
