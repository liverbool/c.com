Ext.define 'Magice.Cloud.view.server.actions.Reboot',
    extend: 'Ext.window.Window'

    xtype: 'server-actions-reboot'

    layout: 'card'
    activeItem: 1

    width: 400

    bind: title: 'Reboot - {server.name}'
    locale:
        header: 'Note!'
        description: "This will reboot your droplet. Do you wish to proceed?"
        button:
            action: 'Action'
            tryAgain: 'Try again'

    defaults:
        border: no
        xtype: 'container'

    listeners: close: 'on.action.reboot.close'

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
                    'on.failure': 'on.action.reboot.error'
                    'on.warning': 'on.action.reboot.error'
                    'on.success': 'on.action.reboot.success'
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
                handler: 'on.action.reboot.action'
                text: @locale.button.action
            }
            {
                hidden: yes
                itemId: 'btnTryAgain'
                text: @locale.button.tryAgain
            }
        ]

        @callParent arguments
