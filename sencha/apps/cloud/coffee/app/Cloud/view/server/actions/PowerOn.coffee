Ext.define 'Magice.Cloud.view.server.actions.PowerOn',
    extend: 'Ext.window.Window'

    xtype: 'server-actions-poweron'

    layout: 'card'
    activeItem: 1

    width: 400

    bind: title: 'Power On - {server.name}'
    locale:
        header: 'Note!'
        description: "This will boot your droplet."
        button:
            action: 'Action'
            tryAgain: 'Try again'

    defaults:
        border: no
        xtype: 'container'

    listeners: close: 'on.action.poweron.close'

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
                    'on.failure': 'on.action.poweron.error'
                    'on.warning': 'on.action.poweron.error'
                    'on.success': 'on.action.poweron.success'
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
                handler: 'on.action.poweron.action'
                text: @locale.button.action
            }
            {
                hidden: yes
                itemId: 'btnTryAgain'
                text: @locale.button.tryAgain
            }
        ]

        @callParent arguments
