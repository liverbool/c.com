Ext.define('Magice.Cloud.view.server.Model', {
  extend: 'Magice.base.ViewModel',
  alias: 'viewmodel.servers',
  data: {
    maskingservers: false,
    maskingbackups: false,
    maskingsnapshots: false,
    maskingactions: false,
    creatorsImages: null,
    summary: null,
    steps: {
      hostname: {
        icon: 'empty checkbox',
        active: false,
        label: 'Hostname'
      },
      size: {
        icon: 'empty checkbox',
        active: false,
        label: 'Size'
      },
      image: {
        icon: 'empty checkbox',
        active: false,
        label: 'Image'
      },
      feature: {
        icon: 'empty checkbox',
        active: false,
        label: 'Feature'
      }
    }
  },
  stores: {
    creators: {
      model: 'Magice.Cloud.model.Creator',
      url: '/cloud/creators'
    },
    creatorsFeatures: {
      fields: ['slug', 'name']
    },
    creatorsSizes: {
      model: 'Magice.Cloud.model.Size'
    },
    creatorsDistributors: {
      fields: ['slug', 'name']
    },
    creatorsDistributorsImages: {
      model: 'Magice.Cloud.model.Image'
    },
    creatorsPrivateImages: {
      model: 'Magice.Cloud.model.Image'
    },
    creatorsBackupImages: {
      model: 'Magice.Cloud.model.Image'
    },
    servers: {
      model: 'Magice.Cloud.model.Server',
      autoLoad: true
    },
    actions: {
      model: 'Magice.Cloud.model.Action',
      url: '/cloud/servers/[id]/actions'
    },
    snapshots: {
      model: 'Magice.Cloud.model.Image',
      url: '/cloud/servers/[id]/snapshots'
    },
    backups: {
      model: 'Magice.Cloud.model.Image',
      url: '/cloud/servers/[id]/backups'
    },
    images: {
      model: 'Magice.Cloud.model.Image',
      url: '/cloud/images',
      sorters: 'name'
    },
    kernels: {
      model: 'Magice.Cloud.model.Kernel',
      url: '/cloud/servers/[id]/kernels',
      sorters: 'name',
      listeners: {
        beforeload: 'on.actions.kernel.beforeload'
      }
    }
  },
  formulas: {
    server: {
      bind: {
        bindTo: '{serverlist.selection}',
        deep: true
      },
      get: function(rec) {
        return rec;
      },
      set: function(rec) {
        console.log(rec);
        return console.log(this);
      }
    },
    networking: {
      bind: {
        bindTo: '{serverlist.selection.networks}',
        deep: true
      },
      get: function(rec) {
        console.log(rec);
        return rec;
      },
      set: function(rec) {
        return console.log(rec);
      }
    },
    serverselection: {
      bind: '{serverlist.selection}',
      get: function(rec) {
        return rec;
      }
    }
  }
});
