Ext.define 'Magice.Cloud.view.sshkey.Controller',
    extend: 'Magice.base.ViewController'

    alias: 'controller.sshkeys'

    locale:
        sshkey:
            destroyConfirm: 'This will remove your key. Do you wish to proceed?'

    takeAction: (name, config) ->
        config.locks = @view
        @view.add(Ext.widget(name, config)).show()

    record: ->
        rs = @lookup('sshkeylist').getSelection()

        return if rs.length then rs[0] else null

    'on.refresh': -> @model.get('sshkeys').reload()

    'on.create': (btn) ->
        selModel = @lookup('sshkeylist').selModel;

        if btn.create then selModel.deselectAll()

        @view.add(Ext.widget 'sshkey-form').show()

        if !@record()
            rs = @model.get('sshkeys').add new Magice.Cloud.model.Key
            selModel.select rs

    'on.close': -> if @model.get 'isPhantom' then @model.get('sshkeys').remove @record()

    'on.edit': (btn) -> @callAction 'on.create', btn

    'on.destroy': (btn) -> @record().erase @locale.sshkey.destroyConfirm

    'on.save': (btn) ->
        rec = @record()
        win = btn.up 'window'
        form = win.down 'form'

        console.log rec

        # NOTE! To create record after
        return if !rec.isValid()

        rec.save win
