Ext.define 'Magice.Info.model.Info',
    extend: 'Magice.base.Model'

    statics:
        MIN_AGE: 13
        MAX_AGE: 60

    api:
        read: '/account/info'
        update: '/account/info'

    fields: [
        'gender'
        'firstname'
        'lastname'
        'fullname'
        'displayName'
        'mobile'
        'telHome'
        'telWork'
        'telWorkExt'
        {
            name: 'personalId'
            type: 'string'
        }
        {
            name: 'birthday'
            type: 'date'
        }
    ]

    validators:
        firstname:
            type: 'length'
            min: 2
        lastname:
            type: 'length'
            min: 3
        displayName:
            type: 'length'
            min: 5
