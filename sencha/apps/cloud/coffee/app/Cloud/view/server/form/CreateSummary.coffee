Ext.define 'Magice.Cloud.view.server.form.CreateSummary',
    extend: 'Ext.panel.Panel'
    xtype: 'creator-summary'

    locale:
        header: 'Summary'
        title:
            hostname: 'Hostname'
            size: 'Size'
            image: 'Image'
            feature: 'Feature'
        emptyFeature:
            title: 'No feature selected!'
            message: 'You will create server with no feature selected.'

    bind:
        data: bindTo: '{summary}', deep: yes

    initComponent: ->

        @tpl = [
            '<h2 class="ui dividing header">' +@locale.header+ '</h2>'
            '<h4 class="ui header">' +@locale.title.hostname+ '</h4>'
            '<p>{hostname}</p>'
            '<h4 class="ui header">' +@locale.title.size+ '</h4>'
            '<div>'
                '<div><b>{size.slug}</b></div>'
                '<div><b>CPU:</b> {size.vcpus}GB</div>'
                '<div><b>Memory:</b> {size.memory:this.format}</div>'
                '<div><b>SSD Disk:</b> {size.disk}GB</div>'
                '<div><b>Transfer:</b> {size.transfer}MB</div>'
                '<div><b>Hourly Price:</b> {size.priceHourly}</div>'
                '<div><b>Monthly Price:</b> {size.priceMonthly}</div>'
            '</div>'
            '<h4 class="ui header">' +@locale.title.image+ '</h4>'
            '<p>{image.distribution}</p>'
            '<p>{image.name}</p>'
            '<h4 class="ui header">' +@locale.title.feature+ '</h4>'
            '<div class="ui list">'
                '<tpl for="features">'
                    '<div class="item"><i class="icon checkmark"></i> {data.name}</div>'
                '</tpl>'
            '</div>'
            '<tpl if="!features">'
                '<div class="ui warning message">'
                    '<div class="header">' +@locale.emptyFeature.title+ '</div>'
                    @locale.emptyFeature.message
                '</div>'
            '</tpl>'
            format: (v) -> humanize.format v, '0b', 'mb'
        ]

        @callParent arguments