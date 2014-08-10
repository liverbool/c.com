Ext.define 'Magice.Cloud.view.server.form.CreateDockedBar',
    extend: 'Ext.container.Container'
    xtype: 'creator-dockedbar'

    dock: 'bottom'

    items: {
        xtype: 'container'
        layout: 'hbox'
        defaults:
            xtype: 'container'
            border: no
        items: [
            {
                defaults: xtype: 'button'
                layout:
                    type: 'hbox'
                    pack: 'start'
                items: [
                    {
                        hidden: yes
                        itemId: 'btnBack'
                        text: 'Back' #locale
                        handler: 'on.create.back'
                    }
                    {
                        hidden: no
                        itemId: 'btnNext'
                        text: 'Next' #locale
                        handler: 'on.create.next'
                    }
                    {
                        hidden: yes
                        itemId: 'btnStart'
                        text: 'Create' #locale
                        handler: 'on.create.start'
                    }
                ]
            }
            {
                itemId: 'stepBar'
                flex: 1
                layout:
                    type: 'hbox'
                    pack: 'end'
                    align: 'end'

                defaults:
                    border: no
                    xtype: 'component'
                    cls: 'ui step'
                    tpl: ['<i class="icon {icon}"></i> {label}']
                    setIsActive: (active) ->
                        @el[if active then 'addCls' else 'removeCls']('active')

                cls: 'ui small steps no-pointing'
                items: [
                    {
                        bind:
                            data: bindTo: '{steps.hostname}', deep: yes
                            isActive: bindTo: '{steps.hostname.active}', deep: yes
                        popup:
                            title: sprintf '<i class="icon red asterisk"></i> %s', 'Hostname [REQUIRED]' #locale
                            content: 'You must to enter hostname.' #locale
                    }
                    {
                        bind:
                            data: bindTo: '{steps.size}', deep: yes
                            isActive: bindTo: '{steps.size.active}', deep: yes
                        popup:
                            title: sprintf '<i class="icon red asterisk"></i> %s',  'Size [REQUIRED]' #locale
                            content: 'You must to enter size.' #locale
                    }
                    {
                        bind:
                            data: bindTo: '{steps.image}', deep: yes
                            isActive: bindTo: '{steps.image.active}', deep: yes
                        popup:
                            title: sprintf '<i class="icon red asterisk"></i> %s',  'Image [REQUIRED]' #locale
                            content: 'You must to enter image.' #locale
                    }
                    {
                        bind:
                            data: bindTo: '{steps.feature}', deep: yes
                            isActive: bindTo: '{steps.feature.active}', deep: yes
                        popup:
                            title: 'Size [OPTIONAL]' #locale
                            content: 'Recommend you to set Enable VirtIO to your server performance.' #locale
                    }
                ]
            }
        ]
    }


