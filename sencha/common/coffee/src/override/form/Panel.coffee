Ext.define "Ext.override.form.Panel",
    override: "Ext.form.Panel"

    getFieldValue: (name) ->
        @findField(name).getValue()

    findField: (name) ->
        @getForm().findField name