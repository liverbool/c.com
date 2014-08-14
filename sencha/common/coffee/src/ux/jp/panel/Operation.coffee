Ext.define 'Ext.ux.jp.panel.Operation',
    extend: 'Ext.container.Container'
    baseCls: 'x-operation-panel'

    xtype: 'operation-panel'
    layout: 'center'

    minWidth: 300
    border: no

    # default locale
    locale:
        prepare:
            header: 'Preparing'
            message: 'Prepare your operation.'
        processing:
            header: 'Processing'
        success:
            header: 'Congratulations!'
            message: 'Your operation have been done.'
        failure:
            header: 'Oops!'
            message: 'An error occurred. Please try again later.'
        warning:
            header: 'Warning!'
            message: 'Something happend while processing.'
        errored:
            message: 'Errored!'

    config:
        locales: null # to override locale
        parent: null
        locks: null #lock components on processing
        showPercentage: no
        showResponseMessage: yes
        tryAgainSelector: '#btnTryAgain'
        tryAgainItemIndex: 1
        itemIndex: 0
        toggleItems: null
        processer: Ext.emptyFn
        continuousId: 'id'
        firstContinuousId: null

    publishes:
        percentage: yes
        state: yes

    viewModel:
        data:
            operation:
                state: 'prepare'
                percentage: 0
                failureMessage: null
                warningMessage: null
                successMessage: null

    bind: data:
        bindTo: '{operation}'
        deep: yes

    getParent: -> @parent or @ownerCt

    setOperation: (key, value) ->
        operation = @getViewModel().get 'operation'
        operation[key] = value
        @getViewModel().set 'operation', operation

    getOperation: (key) ->
        operation = @getViewModel().get 'operation'
        operation[key]

    setState: (state, result) ->
        console.info state

        @setOperation 'state', state
        @setOperation 'errorMessage', null

        @handleResult result

        switch state
            when 'prepare' then @handlePrepare()
            when 'failure' then @handleFailure()
            when 'warning' then @handleWarning()
            when 'success' then @handleSuccess()
            # NOTE processing should not call
            # with out return `Action Resource`
            # it's need action_resource.id
            when 'processing' then @handleProcessing()

        @ # to chainable method return

    getState: -> @getOperation 'state'

    setPercentage: (value) ->
        value = 100 if @getPercentage() > 100
        @setOperation 'percentage', @percentage = value

    getPercentage: -> @getOperation 'percentage'

    updatePercentage: (value) ->
        value = value or @getPercentage()
        @setPercentage ++value

    isPrepare: -> @getState() is 'prepare'
    isSuccess: -> @getState() is 'success'
    isFailure: -> @getState() is 'failure'
    isWarning: -> @getState() is 'warning'
    isProcessing: -> @getState() is 'processing'

    # short hand of setState ...
    prepare: (opt) -> @setState 'prepare', opt
    success: (opt) -> @setState 'success', opt
    failure: (opt) -> @setState 'failure', opt
    warning: (opt) -> @setState 'warning', opt

    # NOTE processing should not call
    # with out return `Action Resource`
    # it's need action_resource.id
    processing: (opt) -> @setState 'processing', opt

    handlePrepare: ->
        @hideToggleItems()
        @getParent().setActiveItem @itemIndex

        @locker 'disable'

        if btn = @getParent().down @tryAgainSelector
            btn.hide()

            # auto add handler `click`
            if !btn.handler and !btn.hasListeners.click
                btn.on 'click', => @tryAgain()

        @fireEvent 'on.prepare'

    handleFailure: ->
        if btn = @getParent().down @tryAgainSelector
            btn.show()

        @locker 'enable'
        @fireEvent 'on.failure'

    handleWarning: ->
        @locker 'enable'
        @fireEvent 'on.warning'

    handleSuccess: ->
        @locker 'enable'
        @fireEvent 'on.success'

    handleProcessing: ->
        return if @isWarning() or @isFailure() or @isSuccess()

        @locker 'disable'
        @updatePercentage()
        @fireEvent 'on.processing'

    handleResult: (result) ->

        if @isPrepare() and typeof result is 'function'
            return @setProcesser result

        console.log result

        response = null
        responseder = new Object

        # Ext.data.operation exception
        if result and result.exception
            response = result.error.response
            console.log 'A'

        if result and result.isUpdateOperation and response is null
            response = result._response
            console.log 'B'

        # Ext.Ajax.request#callback(cfg, response, success)
        if result and result.getResponseHeader
            response = result
            console.log 'C'

        if response
            responseder.code = response.status
            responseder.msg = response.statusText
            console.log 'D'

            # try to get message
            if /json/i.test(response.getResponseHeader('Content-Type')) and response.responseText
                res = Ext.decode response.responseText
                responseder.code = res.code or res.statusCode or responseder.code
                responseder.msg = res.message or responseder.msg
                responseder.res = res
                console.log 'D.1'

                # being processing
                if @isProcessing() and res.actionIds
                    responseder.actionId = res.actionIds[0]
                    console.log 'D.1.1'

            # being processing (anather case)
            if @isProcessing() and actionId = response.getResponseHeader 'X-Action-Id'
                responseder.actionId = actionId if actionId isnt 'NO_VALUE'
                console.log 'D.2'

            # start being processing
            if @isProcessing() and responseder.actionId
                @whenProgress responseder
                console.log 'D.3'

            # success with 204
            if response.status is 204 and !responseder.actionId
                console.log 'D.4'
                return @success()

            # while prosessing (Action return)
            # MUST make syre this ony TRUE with response Action!
            if @isProcessing() and responseder.res
                console.log 'D.5'
                responseder.actionId = responseder.res[@getContinuousId()]
                switch responseder.res.status
                    when 'in-progress' then @whenProgress responseder
                    when 'completed' then @whenCompleted responseder
                    when 'errored' then @whenErrored responseder

            if @isWarning() then @setOperation 'warningMessage', ('[' +responseder.code+ '] ' + responseder.msg)
            if @isFailure() then @setOperation 'failureMessage', ('[' +responseder.code+ '] ' + responseder.msg)
            if @isSuccess() then @setOperation 'successMessage', responseder.msg

    whenProgress: (responseder) ->
        console.log 'whenProgress'
        if no isnt @fireEvent 'when.progress', responseder
            @processer @, responseder.actionId
            console.log 'whenProgress.1'

    whenCompleted: (responseder) ->
        @setPercentage 100
        Ext.defer ->  # wating for progress slide to 100
            if no isnt @fireEvent 'when.completed', responseder
                @success()
        , 500, @

    whenErrored: (responseder) ->
        if no isnt @fireEvent 'when.errored', responseder
            responseder.msg = @locale.errored.message
            @failure();

    tryAgain: ->
        @showToggleItems()
        @getParent().setActiveItem @tryAgainItemIndex

        if btn = @getParent().down @tryAgainSelector
            btn.hide()

    showToggleItems: ->
        return unless @toggleItems
        for item in @toggleItems
            @resolveItem(item).show()

    hideToggleItems: ->
        return unless @toggleItems
        for item in @toggleItems
            @resolveItem(item).hide()

    resolveItem: (item) ->
        if typeof item is 'string'
            @getParent().down item
        else item

    locker: (state) ->
        @locks = @parent.locks if !@locks and @parent

        if @locks
            @locks = [@locks] if Ext.isObject @locks
            for itm in @locks
                itm[state]() if itm

    constructor: (config) ->
        Ext.apply @locale, config.locales if config.locales

        @callParent [config]

    initComponent: ->

        @tpl = [
            '<tpl if="this.isPrepare()">'
                '<div class="ui icon message">'
                    '<i class="loading icon"></i>'
                    '<div class="content">'
                        '<div class="header">' +@locale.prepare.header+ '</div>'
                        '<p>' +@locale.prepare.message+ '</p>'
                    '</div>'
                '</div>'
            '</tpl>'

            '<tpl if="this.isProcessing()">'
                '<div class="ui message">'
                    '<div class="ui header">'
                        @locale.processing.header
                        ' {percentage}%' if @showPercentage
                    '</div>'
                    '<p>'
                        '<div class="ui active striped red progress">'
                            '<div class="bar" style="width: {percentage}%;"></div>'
                        '</div>'
                    '</p>'
                '</div>'
            '</tpl>'

            '<tpl if="this.isSuccess()">'
                '<div class="ui icon success message">'
                    '<i class="checkmark icon"></i>'
                    '<div class="content">'
                        '<div class="header">' +@locale.success.header+ '</div>'
                        '<p>'
                            @locale.success.message
                            '<tpl if="successMessage && this.showResponseMessage()">'
                                '<div class="ui segment">{successMessage}</div>'
                            '</tpl>'
                        '</p>'
                    '</div>'
                '</div>'
            '</tpl>'

            '<tpl if="this.isFailure()">'
                '<div class="ui icon error message">'
                    '<i class="attention icon"></i>'
                    '<div class="content">'
                        '<div class="header">' +@locale.failure.header+ '</div>'
                        '<p>'
                            @locale.failure.message
                            '<tpl if="failureMessage && this.showResponseMessage()">'
                                '<div class="ui segment">{failureMessage}</div>'
                            '</tpl>'
                        '</p>'
                    '</div>'
                '</div>'
            '</tpl>'

            '<tpl if="this.isWarning()">'
                '<div class="ui icon warning message">'
                    '<i class="warning icon"></i>'
                    '<div class="content">'
                        '<div class="header">' +@locale.warning.header+ '</div>'
                        '<p>'
                            @locale.warning.message
                            '<tpl if="warningMessage && this.showResponseMessage()">'
                                '<div class="ui segment">{warningMessage}</div>'
                            '</tpl>'
                        '</p>'
                    '</div>'
                '</div>'
            '</tpl>'
            # must define truly function (=>) to XTemplate
            isPrepare: => @isPrepare()
            isSuccess: => @isSuccess()
            isFailure: => @isFailure()
            isWarning: => @isWarning()
            isProcessing: => @isProcessing()
            showResponseMessage: => @getShowResponseMessage()
        ]

        @callParent arguments