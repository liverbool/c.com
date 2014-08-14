Ext.define 'Magice.Cloud.view.domain.Model',
    extend: 'Magice.base.ViewModel'

    alias: 'viewmodel.domains'

    data:
        maskingsshkeys: no

    stores:
        domains:
            model: 'Magice.Cloud.model.Domain'
            url: '/cloud/domains'
            autoLoad: yes

        records:
            model: 'Magice.Cloud.model.Record'
            url: '/cloud/dns/[domain]'
            groupField: 'type'

    formulas:
        record:
            bind: bindTo: '{domainlist.selection}', deep: yes
            get: (rec) -> rec
            set: (rec) -> console.log arguments

        isPhantom:
            bind: bindTo: '{record}'
            get: (rec) -> rec and rec.phantom
