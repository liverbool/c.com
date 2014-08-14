###
 The main application class. An instance of this class is created by app.js when it calls
 Ext.application(). This is the ideal place to handle application launch and initialization
 details.
###
MAGICE_URL = 'http://c.com/web';
sprintf = _.string.sprintf

Ext.define 'Magice.Application',
    extend: 'Ext.app.Application'

    name: 'Magice'

    # The tab we want to activate if there is no "#tag" in the URL.
    defaultToken: '!info'

    viewportId: 'viewport'

    uses: ['Ext.window.Toast']

    requires: [
        'Glyph'
        'Ext.bugfix.*'
        'Ext.override.*'
        'Ext.extend.*'
        'Ext.ux.jp.panel.TopBar'
    ]

    views: [
        'Magice.Main.view.View'
    ]

    launch: ->
        # Let's add a CSS class to body if flex box wrap is not implemented or broken
        # http://flexboxlayouts.com/flexboxlayout_tricks.html
        if Ext.browser.is.Gecko and Ext.browser.version.major < 28
            Ext.getBody().addCls 'x-flex-wrap-broken'

    handleForbidden: (conn, response, options, eOpts) ->
        #console.log @
        console.log response.json

    statics:
        URL: MAGICE_URL
        path: (path) ->
            Magice.Application.URL + path

        setLoading: (status) ->
            if Magice.Application.viewport
                Magice.Application.viewport.viewModel.set 'loading', status

# Ajax Global
# TODO: move to extend
Ext.humanize =
    text: (v) -> _.string.humanize v
    duration: (v) -> if v then moment.duration(v).humanize() + ' ago' else ''
    date: (v, format) -> if v then moment(v).format 'll' else ''
    datetime: (v, format) -> if v then moment(v).format 'lll' else ''
    diff: (a, b) -> console.info('this is contrains a bug!'); if !a or !b then null else moment.duration(moment(b).diff(a)).humanize()
    format: (v, format, input) ->
        if input is 'mb'
            v = v * Math.pow(1024, 2)

        numeral(v).format(format)

Ext.util.ObjectId = (val) ->
    if typeof val is 'object' then val.id else null

Ext.util.inArray = (value, collection) ->
    return no unless collection
    collection.indexOf(value) isnt -1;

Ext.util.bindParameter = (str, parameter) ->
    return str unless parameter
    str = str.replace /\[\w+\]/g, (k) ->
        key = k.replace '[', ''
        key = key.replace ']', ''
        parameter[key] || k

Ext.util.isFullyUrl = (str) ->
    return yes if /^\/\/.*/.test str or /^http(s?)\:\/\/.*/.test str

Ext.Ajax.setDefaultHeaders
    "X-Requested-With-Sencha": yes

Ext.Ajax.on 'beforerequest', (conn, options) ->
    Magice.Application.setLoading yes

    # `parameters` special on Magice provide parameters of load(options)
    # to bind into url holder
    # directly from Ext.Ajax.request
    parameters = options.parameters if options.parameters
    # pass throuth Ext.data.Model#save
    parameters = options.operation.config.parameters if options.operation and options.operation.config
    options.url = Ext.util.bindParameter options.url, parameters if parameters

    console.log arguments

    # symfony dev propose
    if !Ext.util.isFullyUrl options.url
        options.url = Magice.Application.path options.url

    if options.operation and options.operation.config.background
        # TODO: --
        console.info 'Running background process.'

Ext.Ajax.on 'requestcomplete', ->
    Magice.Application.setLoading no
###

Ext.Ajax.on 'requestexception', (conn, response, options, eOpts) ->
    Magice.Application.setLoading no

    # convert json string response to object
    if response.responseText
        response.json = Ext.decode(response.responseText)

    # exception handlers
    switch response.status
        # AccessDeniedException
        when 403 then @handleForbidden.apply Magice.Application, arguments
        else console.log arguments
###