Ext.define 'Magice.Cloud.view.server.actions.PowerCycle',
    extend: 'Ext.window.Window'

    xtype: 'server-actions-cycle'

    layout: 'card'
    activeItem: 1

    width: 400

    bind: title: 'Power Cycle - {server.name}'
    locale:
        header: 'Note!'
        description: "This will reboot your droplet.<br><br>
                      We recommend rebooting your droplet through the command line,
                      as this action is the same as hard resetting the server
                      and may cause data corruption.<br><br>
                      Do you wish to proceed?"
        button:
            action: 'Action'
            tryAgain: 'Try again'

    defaults:
        border: no
        xtype: 'container'

    listeners: close: 'on.action.cycle.close'

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
                    'on.failure': 'on.action.cycle.error'
                    'on.warning': 'on.action.cycle.error'
                    'on.success': 'on.action.cycle.success'
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
                handler: 'on.action.cycle.action'
                text: @locale.button.action
            }
            {
                hidden: yes
                itemId: 'btnTryAgain'
                text: @locale.button.tryAgain
            }
        ]

        @callParent arguments
