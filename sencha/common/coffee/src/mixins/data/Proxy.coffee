# @Deprecated DONT USE
Ext.define 'Ext.mixins.data.Proxy',

    findApp: ->
        ns = (@entityName || @model.entityName || @$className).split '.'

        # found nothing
        return unless window[ns[0]]

        return window[ns[0]]['Application']

    isFullyUrl: (str) ->
        return yes if /^\/\/.*/.test str or /^http(s?)\:\/\/.*/.test str

    appendURL: (apis) ->
        APP = @findApp()

        if APP and APP['URL']
            # is set for url config
            if typeof apis is 'string'
                return apis if @isFullyUrl apis
                return APP['URL'] + apis

            for key, path of apis
                apis[key] = APP['URL'] + path unless @isFullyUrl path

        return apis

    bindParameter: (str, parameter) ->
        return str unless parameter
        str = str.replace /\[\w+\]/g, (k) ->
            key = k.replace '[', ''
            key = key.replace ']', ''
            parameter[key] || k

    bindUrl: (parameter) ->
        url = @url || (@api.read if @api)
        @proxy.setUrl @bindParameter(@appendURL(url), parameter)

    bindApi: (parameter) ->
        api = {}
        for key, url of @api
            api[key] = @bindParameter(@appendURL(url), parameter)
        @proxy.setApi api