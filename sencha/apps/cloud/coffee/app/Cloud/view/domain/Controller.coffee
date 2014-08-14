Ext.define 'Magice.Cloud.view.domain.Controller',
    extend: 'Magice.base.ViewController'

    alias: 'controller.domains'

    locale:
        domain:
            destroyConfirm: 'This will remove your domain. Do you wish to proceed?'
        dns:
            destroyConfirm: 'This will remove your records. Do you wish to proceed?'

    takeAction: (name, config) ->
        config.locks = @view
        @view.add(Ext.widget(name, config)).show()

    record: ->
        rs = @lookup('domainlist').getSelection()

        return if rs.length then rs[0] else null

    'on.refresh': -> @model.get('domains').reload()

    'on.create': (btn) ->
        selModel = @lookup('domainlist').selModel;

        if btn.create then selModel.deselectAll()

        @view.add(Ext.widget 'domain-form').show()

        if !@record()
            rs = @model.get('domains').add new Magice.Cloud.model.Domain
            selModel.select rs

    'on.close': -> if @model.get 'isPhantom' then @model.get('domains').remove @record()

    'on.destroy': (btn) -> @record().erase @locale.domain.destroyConfirm

    'on.save': (btn) ->
        rec = @record()
        win = btn.up 'window'
        form = win.down 'form'

        console.log rec

        # NOTE! To create record after
        return if !rec.isValid()

        rec.save win

    'on.selectionchange': (sm, rs) ->
        @load 'records', parameters: domain: rs[0].get 'id'

    'on.dns.refresh': -> @model.get('records').reload()

    'on.dns.remove': (btn) ->

        return unless window.confirm @locale.dns.destroyConfirm

        ids = []
        for rec in @lookup('recordlist').getSelectionModel().getSelection()
            ids.push rec.get 'id'

        btn.setLoading 'Deleting ...'
        Ext.Ajax.request
            url: '/cloud/dns/[domain]'
            method: 'DELETE'
            parameters:
                domain: @model.get('record').get('id')
            jsonData: ids
            callback: -> btn.setLoading no
            success: => @model.get('records').reload()
            failure: Ext.Msg.error

    'on.dns.add.GMAIL': (btn) ->
        btn.setLoading 'Adding Gmail MX ...'

        Ext.Ajax.request
            url: '/cloud/dns/[domain]/gmail'
            method: 'POST'
            parameters:
                domain: @model.get('record').get('id')
            callback: -> btn.setLoading no
            success: => @model.get('records').reload()
            failure: Ext.Msg.error

    getRecordForm: (name, config) ->
        win = @view.add(Ext.widget(name, config))
        win.show()

    'on.dns.add': (btn) -> @getRecordForm 'dns-form-' + btn.dnstype
    'on.dns.save': (btn) ->
        btn.setLoading 'Adding Record ...'

        Ext.Ajax.request
            url: '/cloud/dns/[domain]/' + btn.dnstype
            method: 'POST'
            parameters:
                domain: @model.get('record').get('id')
            callback: -> btn.setLoading no
            success: => @model.get('records').reload()
            failure: Ext.Msg.error