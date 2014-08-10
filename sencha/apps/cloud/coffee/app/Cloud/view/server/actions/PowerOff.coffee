Ext.define 'Magice.Cloud.view.server.actions.PowerOff',
    extend: 'Ext.window.Window'

    xtype: 'server-actions-poweroff'

    layout: 'card'
    activeItem: 1

    width: 400

    bind: title: 'Power Off - {server.name}'
    locale:
        header: 'Note!'
        description: "This will power off your droplet.<br><br>
                      We recommend powering off your droplet through the command line,
                      as this action is the same as hard resetting the server
                      and may cause data corruption.<br><br>
                      Note that when you power off your droplet you are still billed for it.
                      This is because your diskspace, CPU, RAM, and IP address are all reserved
                      while it is powered off.<br><br>
                      Do you wish to proceed?"
        button:
            action: 'Action'
            tryAgain: 'Try again'

    defaults:
        border: no
        xtype: 'container'

    listeners: close: 'on.action.poweroff.close'

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
                    'on.failure': 'on.action.poweroff.error'
                    'on.warning': 'on.action.poweroff.error'
                    'on.success': 'on.action.poweroff.success'
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
                handler: 'on.action.poweroff.action'
                text: @locale.button.action
            }
            {
                hidden: yes
                itemId: 'btnTryAgain'
                text: @locale.button.tryAgain
            }
        ]

        @callParent arguments
