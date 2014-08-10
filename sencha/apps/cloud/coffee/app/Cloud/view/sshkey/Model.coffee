Ext.define 'Magice.Cloud.view.sshkey.Model',
    extend: 'Magice.base.ViewModel'

    alias: 'viewmodel.sshkeys'

    data:
        maskingsshkeys: no

    stores:
        sshkeys:
            model: 'Magice.Cloud.model.Key'
            url: '/cloud/keys'
            autoLoad: yes

    formulas:
        record:
            bind: bindTo: '{sshkeylist.selection}', deep: yes
            get: (rec) -> rec
            set: (rec) -> console.log arguments

        isPhantom:
            bind: bindTo: '{record}'
            get: (rec) -> rec and rec.phantom
