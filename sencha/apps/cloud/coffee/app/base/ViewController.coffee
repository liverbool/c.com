Ext.define 'Magice.base.ViewController',
    extend: 'Ext.app.ViewController'

    init: -> @model = @getViewModel()

    lookup: (key, valueTo) ->
        cmp = @lookupReference key

        # auto set value (shorthand)
        if cmp and cmp.setValue and valueTo isnt undefined
            cmp.setValue valueTo

        return cmp

    load: (store, callback) ->
        store = @model.get(store)

        return unless store

        if callback
            opts = if Ext.isObject callback then callback else callback: callback
        else opts = null

        store.load opts
        return store

    loadData: (store, data) -> @model.get(store).loadData data

    clearData: (store) -> @model.get(store).removeAll()

    callAction: ->
        # https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments
        args = Array::slice.call arguments
        fn = @[args.shift()]

        if !args.length then args = undefined

        fn.apply @, args

    operation: (selector) ->
        console.log selector
        console.log @view.down(selector)
        console.log @view.down(selector).getOperation()

        @view.down(selector).getOperation()

    showItems: (owner, items) ->
        for item in items
            owner.down(item).show()

    hideItems: (owner, items) ->
        for item in items
            owner.down(item).hide()