Ext.define 'Ext.extend.form.field.VTypes', {}, ->

    domain = new RegExp /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/

    Ext.apply Ext.form.field.VTypes,

        domainText: 'This field should be a Domain Name in the format "www.example.com" or "example.com"'
        domain: (value) ->
            value.match domain

        zipcodeMask: /^\d{5}(-\d{4})?$/
        zipcodeText: 'The zip code format is wrong, e.g., 94105-0011 or 94105'
        zipcode: ->
            re.test v