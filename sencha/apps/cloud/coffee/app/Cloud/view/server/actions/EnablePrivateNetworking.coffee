Ext.define 'Magice.Cloud.view.server.actions.EnablePrivateNetworking',
    extend: 'Ext.window.Window'

    xtype: 'server-actions-enableprivatenetworking'

    layout: 'card'
    activeItem: 1

    width: 400

    bind: title: 'Enable Private Networking - {server.name}'
    locale:
        header: 'Note!'
        description: "You must reboot your droplet and then manually modify
                      the network settings for the new interface to be functional."
        button:
            action: 'Action'
            tryAgain: 'Try again'

    defaults:
        border: no
        xtype: 'container'

    listeners: close: 'on.action.enableprivatenetworking.close'

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
                    'on.failure': 'on.action.enableprivatenetworking.error'
                    'on.warning': 'on.action.enableprivatenetworking.error'
                    'on.success': 'on.action.enableprivatenetworking.success'
            }
            {
                data: @locale
                tpl: [
                    '<div class="ui info message">'
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
                handler: 'on.action.enableprivatenetworking.action'
                text: @locale.button.action
            }
            {
                hidden: yes
                itemId: 'btnTryAgain'
                text: @locale.button.tryAgain
            }
        ]

        @callParent arguments
