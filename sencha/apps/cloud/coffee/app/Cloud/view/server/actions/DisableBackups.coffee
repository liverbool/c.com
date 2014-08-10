Ext.define 'Magice.Cloud.view.server.actions.DisableBackups',
    extend: 'Ext.window.Window'

    xtype: 'server-actions-disablebackups'

    layout: 'card'
    activeItem: 1

    width: 400

    bind: title: 'Disable Backups - {server.name}'
    locale:
        header: 'Warning!'
        description: 'This will disable your automatic backup.
                      You can not enable it again (for now).
                      But to get back backup on <a href="#" target="_blank">see this information.</a>'
        button:
            action: 'Action'
            tryAgain: 'Try again'

    defaults:
        border: no
        xtype: 'container'

    listeners: close: 'on.action.disablebackups.close'

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
                    'on.failure': 'on.action.disablebackups.error'
                    'on.warning': 'on.action.disablebackups.error'
                    'on.success': 'on.action.disablebackups.success'
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
                handler: 'on.action.disablebackups.action'
                text: @locale.button.action
            }
            {
                hidden: yes
                itemId: 'btnTryAgain'
                text: @locale.button.tryAgain
            }
        ]

        @callParent arguments
