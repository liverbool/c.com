Ext.define "Magice.base.Model",
    extend: "Ext.data.Model"

    mixins: {
        observable: 'Ext.util.Observable'
    }

    locale:
        saveCallback:
            success:
                title: 'Yoos!'
                message: 'Your operation was successfull.'
            error:
                title: 'Oops!'
                message: 'Oops an error occurred. Please try again later.'

    isDirty: -> @dirty

    constructor: (config) ->
        # add event listener ability to model
        @mixins.observable.constructor.call @, config

        @callParent arguments

        # handle short config
        # @api and @rest
        if @api or @rest

            if @rest
                type = 'rest'
                @api = read: undefined, create: undefined, update: undefined, destroy: undefined
            else
                type = 'ajax'
                # shorthand config
                @api = read: @api if typeof @api is 'string'

            @self.setProxy
                type: type
                api: @api
                url: @rest
                writer: type: 'json'

        # constructor must return nothing
        return # end constructor

    # if options is component you can define custom config:
    #   - disableErrorMessage       to disable alert message
    #   - preventRejectOnError      to disable reject record when user close UI like window form
    #   - preventCommitOnSuccess    to disable commit record on success
    #   - closeOnSuccess            to close UI (only window) on success
    save: (options) ->

        if options and options.isComponent
            comp = options

            # auto ignore if nothing changed
            if @phantom is no and @dirty is no
                return Ext.Msg.alert comp.locale.noDirty if comp.locale and comp.locale.noDirty
                return # return nothing

            form = if comp.form then comp else comp.down 'form'
            options = if form then form: form else {}

            comp.setLoading yes if comp.isVisible()
            options.callback = (rec, operation, success) ->
                console.log arguments
                @saveCallback.apply @, [rec, operation, success, comp, form]

        @_phantom = @phantom
        @callParent [options]

    saveCallback: (rec, operation, success, comp, form) ->
        comp.setLoading no if comp.isVisible()

        rec.commit() if success and comp.preventCommitOnSuccess isnt yes

        successTitle = @locale.saveCallback.success.title

        if comp.alerter and comp.alerter.success
            handleType = typeof comp.alerter.success
            if handleType is 'function' then comp.alerter.success.apply @, arguments
            else if handleType is 'string' then Ext.Msg.success successTitle, comp.alerter.success
            else if handleType is 'object' then Ext.Msg.success comp.alerter.success
            else if handleType is yes then Ext.Msg.success @locale.saveCallback.success
            else # nothing to do

        if !comp.alerter
            Ext.Msg.success @locale.saveCallback.success

        if success and comp.isWindow and comp.closeOnSuccess isnt no
            comp.close()

        @fireEvent 'saved.finish.success', @_phantom, rec, operation, success, comp, form
        @_phantom = no
        # end of success handle
        return if success

        # now hanndle only exception type
        # this mean server response will throw status ~400, ~500
        return unless operation.exception
        res = operation.error.response
        title = operation.error.statusText
        msg = @locale.saveCallback.error.message

        if res.responseText
            data = Ext.decode res.responseText
            msg = data.message if data.message

            # handle form error
            if form and data.errors
                for key of data.errors
                    field = form.getForm().findField(key);

                    if field
                        # pass invalid to field's validation
                        field.reset()

                        # mask invalid with new messages
                        field.markInvalid(data.errors[key])

        # custom config to disable this error
        if comp.disableErrorMessage isnt yes
            Ext.Msg.error title, msg

        if comp.preventRejectOnError isnt yes and comp.isVisible() is no
            # good idea to reject data if user form is not present (closed)
            rec.reject()
