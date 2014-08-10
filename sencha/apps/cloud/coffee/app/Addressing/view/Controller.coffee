Ext.define 'Magice.Addressing.view.Controller',
    extend: 'Magice.base.ViewController'

    alias: 'controller.addressing'

    locale:
        invalidForm:
            title: 'Error!'
            message: 'Please fullil the form.'
        dirtyConfirm:
            title: 'Data changed!'
            message: 'Your have change data. Do you want to save changed?'
        noDirty:
            title: 'Oops!'
            message: 'Nothing to save.'

    privates:
        load: (store, options) ->
            @getViewModel().getStore(store).load options

        getAddressForm: (btn) ->
            win = @lookup 'form-address-window'

            unless win
                win = @view.add new Magice.Addressing.view.form.Address locale: @locale
                # first create load provinces store
                @load 'provinces', callback: => @enableFields 'province'

            if btn
                record = if btn.create then @model.create 'Address' else btn.getWidgetRecord()
                @model.set 'record', record
                win.reset() if btn.create

            return win

        clearAndDisableFields: ->
            for n, field of arguments
                field = @lookup field
                field.store.removeAll() if field.store
                field.setDisabled yes

        enableFields: ->
            for n, field of arguments
                field = @lookup field
                field.setDisabled no

    showEditForm: (btn) ->
        @getAddressForm(btn).show()

    saveChange: ->
        win = @getAddressForm()

        if !win.isValid()
            return Ext.Msg.error @locale.invalidForm

        @model.save 'record', win, 'saved.finish.success': fn: (phantom, record) =>
            @model.get('addresses').add record if phantom
        , single: yes

    onBeforeHideFormWindow: ->
        record = @model.get 'record'

        if record.phantom
            return @model.set 'record', null

        return unless record.dirty

        msg = @locale.dirtyConfirm
        Ext.Msg.confirm msg.title, msg.message, (pressed) =>
            if pressed is 'yes' then @saveChange() else record.reject()

    onProvinceChange: (cmp, newVal) ->
        @clearAndDisableFields 'amphur', 'district', 'zipcode'

        return unless Ext.isNumeric newVal

        # load aumphurs store
        @load 'amphurs',
            parameters: id: newVal
            callback: => @enableFields 'amphur'

    onAmphurChange: (cmp, newVal) ->
        @clearAndDisableFields 'district', 'zipcode'

        return unless Ext.isNumeric newVal

        # load districts store
        @load 'districts',
            parameters: id: newVal
            callback: => @enableFields 'district'

    onDistrictChange: (cmp, newVal) ->
        @clearAndDisableFields 'zipcode'

        return unless Ext.isNumeric newVal

        item = cmp.findRecordByValue newVal

        # zipcode combobox
        # don't change if have value this useful when set form for edit
        # to change value of zipcode by use change district use `onDistrictSelectChange`
        zipcode = @lookup 'zipcode'
        zipcode.setValue item.get 'zipcode' unless zipcode.value

        @enableFields 'zipcode'

    onDistrictSelectChange: (cmp, rs) ->
        item = if rs.length then rs[0] else null
        @lookup 'zipcode', if item is null then null else item.get 'zipcode'

    onGridEditClick: (btn) -> @showEditForm btn
