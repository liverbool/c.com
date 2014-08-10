Ext.define 'Magice.Cloud.view.server.ViewToolbar',
    extend: 'Ext.container.Container'

    xtype: 'view-servers-toolbar'

    locale:
        button:
            actions: 'Actions'
            create: 'Create'
            refresh: 'Refresh'
            history: 'History'
            snapshots: 'Snapshots'
            backups: 'Backups'
            kernel: 'Kernel'
        menu:
            actions:
                rename: 'Rename'
                rebuild: 'Rebuild'
                reboot: 'Reboot'
                cycle: 'Power Cycle'
                poweroff: 'Power Off'
                poweron: 'Power On'
                shutdown: 'Shutdown'
                resetpwd: 'Reset Password'
                snapshot: 'Snapshot'
                enableipv6: 'Enable IPv6'
                enableprivatenetworking: 'Enable Private Networking'
                disablebackups: 'Disable Backups'
                destroy: 'Destroy'

    initComponent: ->

        @items = [
            {
                xtype: 'jp-topbar'
                dockText: 'Cloud Server' #locale

                dockTools: [
                    {
                        disabled: yes
                        text: @locale.button.actions
                        bind: disabled: '{!serverlist.selection}'
                        menu: [
                            {
                                handler: 'on.action.rename'
                                text: @locale.menu.actions.rename
                                glyph: Glyph.RENAME
                            }
                            {
                                handler: 'on.action.rebuild'
                                text: @locale.menu.actions.rebuild
                                glyph: Glyph.REBUILD
                            }
                            {
                                handler: 'on.action.reboot'
                                text: @locale.menu.actions.reboot
                                glyph: Glyph.RENAME
                            }
                            {
                                handler: 'on.action.cycle'
                                text: @locale.menu.actions.cycle
                                glyph: Glyph.RENAME
                            }
                            {
                                handler: 'on.action.poweroff'
                                text: @locale.menu.actions.poweroff
                                glyph: Glyph.RENAME
                            }
                            {
                                handler: 'on.action.poweron'
                                text: @locale.menu.actions.poweron
                                glyph: Glyph.RENAME
                            }
                            {
                                handler: 'on.action.shutdown'
                                text: @locale.menu.actions.shutdown
                                glyph: Glyph.RENAME
                            }
                            {
                                handler: 'on.action.resetpwd'
                                text: @locale.menu.actions.resetpwd
                                glyph: Glyph.RENAME
                            }
                            {
                                handler: 'on.action.snapshot'
                                text: @locale.menu.actions.snapshot
                                glyph: Glyph.RENAME
                            }
                            {
                                handler: 'on.action.enableipv6'
                                text: @locale.menu.actions.enableipv6
                                glyph: Glyph.RENAME
                            }
                            {
                                handler: 'on.action.enableprivatenetworking'
                                text: @locale.menu.actions.enableprivatenetworking
                                glyph: Glyph.RENAME
                            }
                            {
                                handler: 'on.action.disablebackups'
                                text: @locale.menu.actions.disablebackups
                                glyph: Glyph.RENAME
                            }
                            {
                                handler: 'on.action.destroy'
                                text: @locale.menu.actions.destroy
                                glyph: Glyph.DESTROY
                            }
                        ]
                    }
                    {
                        disabled: yes
                        bind: disabled: '{!serverlist.selection}'
                        text: @locale.button.kernel
                        handler: 'on.action.kernel'
                    }
                    {
                        disabled: yes
                        bind: disabled: '{!serverlist.selection}'
                        text: @locale.button.history
                        handler: 'on.list.actions'
                    }
                    {
                        disabled: yes
                        bind: disabled: '{!serverlist.selection}'
                        text: @locale.button.snapshots
                        handler: 'on.list.snapshots'
                    }
                    {
                        disabled: yes
                        bind: disabled: '{!serverlist.selection}'
                        text: @locale.button.backups
                        handler: 'on.list.backups'
                    }
                    {
                        text: @locale.button.create
                        handler: 'on.create.new'
                    }
                    {
                        text: @locale.button.refresh
                        handler: 'on.list.refresh'
                    }
                ]
            }
        ]

        # call parent
        @callParent arguments

