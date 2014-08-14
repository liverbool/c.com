Ext.define 'Magice.Cloud.model.Domain',
    extend: 'Magice.base.Model'
    rest: '/cloud/domains'

    fields: [
        {name: 'id', type: 'int'}
        {name: 'name'}
        {name: 'ip'}
    ]
