Ext.define 'Magice.Cloud.view.server.actions.Destroy',
    extend: 'Ext.window.Window'

    xtype: 'server-actions-destroy'

    layout: 'card'
    activeItem: 1

    width: 400

    bind: title: 'Destroy - {server.name}'
    locale:
        header: 'Warning!'
        description: "This is irreversible. We will destroy your machine and all associated backups.
                      Do you wish to proceed?"
        button:
            action: 'Action'
            tryAgain: 'Try again'

    defaults:
        border: no
        xtype: 'container'

    listeners: close: 'on.action.destroy.close'

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
                                  You will wait few munites and try to reload your browser.'
                listeners:
                    'on.failure': 'on.action.destroy.error'
                    'on.warning': 'on.action.destroy.error'
                    'on.success': 'on.action.destroy.success'
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
                handler: 'on.action.destroy.action'
                text: @locale.button.action
            }
            {
                hidden: yes
                itemId: 'btnTryAgain'
                text: @locale.button.tryAgain
            }
        ]

        @callParent arguments
