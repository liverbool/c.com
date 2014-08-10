Ext.define 'Magice.Cloud.model.Server',
    extend: 'Magice.base.Model'
    rest: '/cloud/servers'

    fields: [
        {name: 'id', type: 'int'}
        {name: 'name', type: 'domain'}
        {name: 'image'}
        {name: 'status'}
        {name: 'size'}
        {name: 'kernel'}
        {name: 'originalKernel'}
        {name: 'features'}
        {name: 'createdAt'}
    ]
