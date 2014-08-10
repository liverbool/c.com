Ext.define 'Magice.Cloud.model.Image',
    extend: 'Ext.data.Model'

    fields: [
        {name: 'id', type: 'int'}
        {name: 'name'}
        {name: 'distribution'}
        {name: 'slug'}
        {name: 'public', type: 'boolean'}
        {name: 'createdAt', type: 'date'}
        {name: 'type'}
        {name: 'machine'}
        {name: 'machineId', type: 'int'}
    ]
