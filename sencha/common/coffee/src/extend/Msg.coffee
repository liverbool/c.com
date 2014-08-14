Ext.define "Ext.extend.Msg", {requires: 'Ext.Msg'}, ->

    Ext.Msg.shadow = no

    Ext.Msg.error = (title, message, fn, scope) ->
        if Ext.isString title
            title = title: title, message: message

        if Ext.isObject(title) && title['getResponseHeader']
            try
                res = Ext.JSON.decode title.responseText
                message = res.message
            catch e
                message = title.statusText

            title =
                title: '[' + title.status + '] ' + title.statusText
                message: message

        Ext.Msg.show Ext.apply({
            buttons: Ext.Msg.OK
            icon: Ext.Msg.ERROR
            fn: fn
            scope: scope
            minWidth: Ext.Msg.minWidth
        }, title)

    Ext.Msg.SUCCESS = Ext.baseCSSPrefix + 'message-box-success'
    Ext.Msg.success = (title, message, fn, scope) ->

        if Ext.isString title
            title = title: title, message: message

        Ext.Msg.show Ext.apply({
            buttons: Ext.Msg.OK
            icon: Ext.Msg.SUCCESS
            fn: fn
            scope: scope
            minWidth: Ext.Msg.minWidth
        }, title)

    Ext.Msg.alert = (title, message, fn, scope) ->

        if Ext.isString title
            title = title: title, message: message

        Ext.Msg.show Ext.apply({
            buttons: Ext.Msg.OK
            fn: fn
            scope: scope
            minWidth: Ext.Msg.minWidth
        }, title)

    Ext.Notify = (title, message, align, iconCls) ->
        if Ext.isString title
            title = title: title, html: message

        if title.message
            title.html = title.message
            delete title.message

        Ext.toast Ext.apply({
            iconCls: iconCls
            align: align or 'br'
            minWidth: Ext.Notify.minWidth
            slideInAnimation: 'elasticIn'
            slideBackAnimation: 'elasticOut'
        }, title)

    Ext.Notify.minWidth = 200 if !Ext.Notify.minWidth

    Ext.Notify::error = (title, message, align) ->
        Ext.Notify title, message, align, 'x-notify-error'

    Ext.Notify::warning = (title, message, align) ->
        Ext.Notify title, message, align, 'x-notify-warning'

    Ext.Notify::success = (title, message, align) ->
        Ext.Notify title, message, align, 'x-notify-success'

    Ext.Notify::info = (title, message, align) ->
        Ext.Notify title, message, align, 'x-notify-info'