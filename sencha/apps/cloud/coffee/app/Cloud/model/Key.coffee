Ext.define 'Magice.Cloud.model.Key',
    extend: 'Magice.base.Model'
    rest: '/cloud/keys'

    fields: [
        {name: 'id', type: 'int'}
        {name: 'name'}
        {name: 'publicKey'}
    ]

    validators:
        name: { type: 'length', min: 2 }
        publicKey: { type: 'length', min: 2 }
