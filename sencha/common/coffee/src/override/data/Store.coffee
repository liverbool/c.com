Ext.define "Ext.override.data.Store",
    override: "Ext.data.Store"

    pageSize: 0

    #config:
    #    masking: no

    constructor: (config) ->

        # share model proxy
        # store should share proxy from model (if model config proxy)
        # remove this if extjs-core provide
        if config.model and !config.proxy and !config.url and !@url
            model = Ext.create config.model
            config.proxy = model.proxy
            model = undefined

        # store should have only retrive url
        # api or rest should set in model
        if !config.proxy and (config.url or @url)
            config.proxy =
                type: 'ajax'
                url: config.url or @url
                reader: type: 'json'

        @callParent [config]

        ### NOT WORK FOR http://www.sencha.com/forum/showthread.php?288501
        ## use Component#masking
        @setMasking config.autoLoad
        @on 'beforeload',->
            @setMasking yes
            console.log @getMasking()
        , @
        @on 'load', ->
            #@setMasking no
            console.log 1
        , @
        ###

        # constructor mus return nothing
        return # end constructor