Ext.define 'Magice.Cloud.view.server.Model',
    extend: 'Magice.base.ViewModel'

    alias: 'viewmodel.servers'

    data:
        maskingservers: no
        maskingbackups: no
        maskingsnapshots: no
        maskingactions: no

        # set when creator loaded (create catreator win)
        creatorsImages: null
        summary: null
        steps:
            hostname: {icon: 'empty checkbox', active: no, label: 'Hostname'}
            size: {icon: 'empty checkbox', active: no, label: 'Size'}
            image: {icon: 'empty checkbox', active: no, label: 'Image'}
            feature: {icon: 'empty checkbox', active: no, label: 'Feature'}

    stores:
        creators:
            model: 'Magice.Cloud.model.Creator'
            url: '/cloud/creators'

        creatorsFeatures:
            fields: ['slug', 'name']

        creatorsSizes:
            model: 'Magice.Cloud.model.Size'

        creatorsDistributors:
            fields: ['slug', 'name']

        creatorsDistributorsImages:
            model: 'Magice.Cloud.model.Image'

        creatorsPrivateImages:
            model: 'Magice.Cloud.model.Image'

        creatorsBackupImages:
            model: 'Magice.Cloud.model.Image'

        servers:
            model: 'Magice.Cloud.model.Server'
            autoLoad: yes

        actions:
            model: 'Magice.Cloud.model.Action'
            url: '/cloud/servers/[id]/actions'

        snapshots:
            model: 'Magice.Cloud.model.Image'
            url: '/cloud/servers/[id]/snapshots'

        backups:
            model: 'Magice.Cloud.model.Image'
            url: '/cloud/servers/[id]/backups'

        images:
            model: 'Magice.Cloud.model.Image'
            url: '/cloud/images'
            sorters: 'name' # local sort

        kernels:
            model: 'Magice.Cloud.model.Kernel'
            url: '/cloud/servers/[id]/kernels'
            sorters: 'name' # local sort
            listeners: beforeload: 'on.actions.kernel.beforeload'

    formulas:
        server:
            bind: bindTo: '{serverlist.selection}', deep: yes
            get: (rec) -> rec
            set: (rec) -> console.log rec; console.log @

        networking:
            bind: bindTo: '{serverlist.selection.networks}', deep: yes
            get: (rec) -> console.log rec; return rec
            set: (rec) -> console.log rec

        serverselection:
            bind: '{serverlist.selection}'
            get: (rec) -> rec
