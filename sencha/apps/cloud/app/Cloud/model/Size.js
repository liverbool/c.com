Ext.define('Magice.Cloud.model.Size', {
  extend: 'Ext.data.Model',
  fields: [
    {
      name: 'slug'
    }, {
      name: 'memory'
    }, {
      name: 'vcpus'
    }, {
      name: 'disk'
    }, {
      name: 'transfer'
    }, {
      name: 'priceMonthly'
    }, {
      name: 'priceHourly'
    }
  ]
});
