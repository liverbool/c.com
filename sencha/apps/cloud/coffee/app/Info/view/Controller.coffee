Ext.define 'Magice.Info.view.Controller',
    extend: 'Ext.app.ViewController'
    alias: 'controller.info'

    locale:
        invalidForm:
            title: 'Error!'
            message: 'Please fullil the form.'

    getInfoRecord: ->
        @getViewModel().get 'infoData'

    getFormSessionInfo: ->
        @getWindowFormInfo().getSession()

    showEditFormInfo: ->
        @getWindowFormInfo().show()

    getWindowFormInfo: ->
        win = @lookupReference 'info-form-window'

        unless win
            win = Ext.create 'Magice.Info.view.form.Info',
                session: yes
                viewModel:
                    links:
                        record: @getInfoRecord()
                    # http://www.sencha.com/forum/showthread.php?287770-How-to-bind-data-links-to-radiogroup
                    formulas:
                        gender:
                            get: -> gender: @get('record').get 'gender'
                            set: (gender) -> @get('record').set gender


            # A Window is a floating component, so by default it is not connected
            # to our main View in any way. By adding it, we are creating this link
            # and allow the window to be controlled by the main ViewController,
            # as well as be destroyed automatically along with the main View.
            @getView().add win

        return win

    saveChange: (btn) ->
        # check form status
        unless @getWindowFormInfo().getForm().isValid()
            Ext.Msg.error @locale.invalidForm
            return

        info = @getInfoRecord()
        session = @getFormSessionInfo()

        # @BugFix: http://www.sencha.com/forum/showthread.php?287770-How-to-bind-data-links-to-radiogroup
        console.warn 'BUG: Gender in radiogroup now constraint bug see: http://www.sencha.com/forum/showthread.php?287770-How-to-bind-data-links-to-radiogroup'

        # session save to parent
        session.save()

        # @BugFix: http://www.sencha.com/forum/showthread.php?287763-Databinding-date-type-bug.
        console.warn 'BugFix: Constraint bug in this line see: http://www.sencha.com/forum/showthread.php?287763-Databinding-date-type-bug.'
        info.set 'birthday', @getWindowFormInfo().getFieldValue('birthday')

        # save parent (model.save)
        info.save
            form: @getWindowFormInfo().getForm()
            callback: ->
                console.log arguments
                console.log session


    getFormSessionContact: ->
        @getWindowFormContact().getSession()

    showEditFormContact: ->
        @getWindowFormContact().show()

    getWindowFormContact: ->
        win = @lookupReference 'info-form-contact-window'

        unless win
            win = Ext.create 'Magice.Info.view.form.Contact',
                session: yes
                viewModel:
                    links:
                        record: @getInfoRecord()
            @getView().add win

        return win

    saveContactChange: (btn) ->
        # check form status
        unless @getWindowFormContact().getForm().isValid()
            Ext.Msg.error @locale.invalidForm
            return

        info = @getInfoRecord()
        session = @getFormSessionContact()

        # session save to parent
        session.save()

        # save parent (model.save)
        info.save
            form: @getWindowFormInfo().getForm()
            callback: ->
                console.log arguments
                console.log session
