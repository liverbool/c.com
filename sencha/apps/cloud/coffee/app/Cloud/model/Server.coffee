Ext.define 'Magice.Cloud.model.Server',
    extend: 'Magice.base.Model'
    rest: '/cloud/servers'

    fields: [
        {name: 'id', type: 'int'}
        {name: 'name', type: 'domain'}
        {name: 'image'}
        {name: 'memory', type: 'int'}
        {name: 'disk', type: 'int'}
        {name: 'vcpus', type: 'int'}
        {name: 'status'}
        {name: 'size'} # deprecated
        {name: 'kernel'}
        {name: 'originalKernel'}
        {name: 'features'}
        {name: 'createdAt'}
        {name: 'backupsEnabled', type: 'boolean'}
    ]
