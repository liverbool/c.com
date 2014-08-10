Ext.define 'Magice.base.ViewModel',
    extend: 'Ext.app.ViewModel'

    # short hand to create Module's model
    # this's must have same namespace with this model
    create: (model, data) ->
        ns = @$className.split '.'
        len = ns.length
        ns[len-1] = model
        ns[len-2] = 'model'

        Ext.create ns.join('.'), data

    # @param Ext.data.Model|string
    #   - record Data model or data key
    # @param Ext.data.Opareation|object|Ext.Component
    #   - options Oparation/object config for oparation/component like form/window-form
    # @param object
    #   - callback Custom callback listeners for proxy callback avalible:
    #       * saved.finish.success
    save: (record, options, callback) ->
        record = @get record if typeof record is 'string'
        record.save options
        record.on callback if callback
