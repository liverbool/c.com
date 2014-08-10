Ext.define('Magice.Addressing.model.District', {
  extend: 'Ext.data.Model',
  fields: [
    {
      name: 'id',
      type: 'int'
    }, {
      name: 'name'
    }, {
      name: 'zipcode',
      type: 'int'
    }
  ]
});
