Ext.define 'Magice.Cloud.view.server.actions.Kernel',
    extend: 'Ext.window.Window'

    xtype: 'server-actions-kernel'

    layout: 'card'
    activeItem: 1

    width: 400

    bind: title: 'Kernel - {server.name}'

    locale:
        header: 'Note!'
        description: "This will update your configuration. Then poweroff the server from the commandline
                      and boot it from the Control Panel and the new kernel will be active.
                      To revert, simply select 'Original Kernel' and follow the same process."
        button:
            action: 'Action'
            tryAgain: 'Try again'

        kernel:
            original: 'Original'
            current: 'Current'
            name: 'Name'
            version: 'Version'

    defaults:
        border: no
        xtype: 'container'

    listeners: close: 'on.action.kernel.close'

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
                    'on.failure': 'on.action.kernel.error'
                    'on.warning': 'on.action.kernel.error'
                    'when.errored': 'on.action.kernel.errored'
                    'when.completed': 'on.action.kernel.completed'
            }
            {
                defaults:
                    border: no
                    xtype: 'container'

                items: [
                    {
                        data: @locale
                        tpl: [
                            '<div class="ui warning message">'
                                '<div class="header">{header}</div>'
                                '<p>{description}</p>'
                            '</div>'
                        ]
                    }
                    {
                        bind: data: '{server}'
                        tpl: [
                            '<fieldset>'
                                '<legend>' +@locale.kernel.original+ '</legend>'
                                '<table class="ui definition table"><tbody>'
                                    '<tr><th>' +@locale.kernel.name+ '</th><td>{originalKernel.name}</td></tr>'
                                    '<tr><th>' +@locale.kernel.version+ '</th><td>{originalKernel.version}</td></tr>'
                                '</tbody></table>'
                            '</fieldset>'
                            '<fieldset>'
                                '<legend>' +@locale.kernel.current+ '</legend>'
                                '<table class="ui definition table"><tbody>'
                                    '<tr><th>' +@locale.kernel.name+ '</th><td>{kernel.name}</td></tr>'
                                    '<tr><th>' +@locale.kernel.version+ '</th><td>{kernel.version}</td></tr>'
                                '</tbody></table>'
                            '</fieldset>'
                        ]
                    }
                    {
                        layout: 'fit'
                        padding: 20
                        defaults: labelAlign: 'top'
                        items: [
                            {
                                reference: 'kernelCheckbox'
                                xtype: 'checkboxfield'
                                fieldLabel: 'From original'
                                boxLabel: 'Change kernel using Original Kernel.'
                            }
                            {
                                reference: 'kernelCombox'
                                xtype: 'combobox'
                                queryMode: 'remote'
                                displayField: 'name'
                                valueField: 'id'
                                editable: no
                                allowBlank: yes
                                fieldLabel: 'Select a kernel'
                                pageSize: 20
                                bind:
                                    store: '{kernels}'
                                    disabled: '{kernelCheckbox.checked}'
                            }
                        ]
                    }
                ]
            }
        ]

        @buttons = [
            {
                cls: 'x-btn-action'
                itemId: 'btnAction'
                handler: 'on.action.kernel.action'
                text: @locale.button.action
            }
            {
                hidden: yes
                itemId: 'btnTryAgain'
                text: @locale.button.tryAgain
            }
        ]

        @callParent arguments
