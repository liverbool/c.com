Ext.define('Magice.Addressing.view.Model', {
  extend: 'Magice.base.ViewModel',
  alias: 'viewmodel.addressing',
  geoSetter: function(id, key) {
    var name, origin;
    name = 'record.' + key;
    origin = this.get(name);
    if (origin && origin.id === id) {
      return;
    }
    if (!id) {
      return this.set(name, null);
    }
    return this.set(name, this.getStore(key + 's').getById(id).getData());
  },
  stores: {
    addresses: {
      model: 'Magice.Addressing.model.Address',
      autoLoad: true
    },
    provinces: {
      model: 'Magice.Addressing.model.Province',
      url: '/account/addressing/province'
    },
    amphurs: {
      model: 'Magice.Addressing.model.Amphur',
      url: '/account/addressing/province/[id]/amphur'
    },
    districts: {
      model: 'Magice.Addressing.model.District',
      url: '/account/addressing/amphur/[id]/district'
    }
  },
  data: {
    record: null
  },
  formulas: {
    geoprovince: {
      bind: {
        bindTo: '{record}',
        deep: true
      },
      get: function() {
        return this.get('record.province.id');
      },
      set: function(id) {
        return this.geoSetter(id, 'province');
      }
    },
    geoamphur: {
      bind: {
        bindTo: '{record}',
        deep: true
      },
      get: function() {
        return this.get('record.amphur.id');
      },
      set: function(id) {
        return this.geoSetter(id, 'amphur');
      }
    },
    gedistrict: {
      bind: {
        bindTo: '{record}',
        deep: true
      },
      get: function() {
        return this.get('record.district.id');
      },
      set: function(id) {
        return this.geoSetter(id, 'district');
      }
    },
    isDefaultAddress: {
      bind: {
        bindTo: '{record}',
        deep: true
      },
      get: function() {
        return {
          isDefault: this.get('record.isDefault')
        };
      },
      set: function(val) {
        return this.set('record.isDefault', val.isDefault);
      }
    }
  }
});
