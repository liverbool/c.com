Ext.define('Magice.Cloud.model.Record', {
  extend: 'Magice.base.Model',
  fields: [
    {
      name: 'id',
      type: 'int'
    }, {
      name: 'type'
    }, {
      name: 'name'
    }, {
      name: 'data'
    }, {
      name: 'priority',
      type: 'int'
    }, {
      name: 'port',
      type: 'int'
    }, {
      name: 'weight',
      type: 'int'
    }, {
      name: 'domain',
      type: 'int'
    }
  ]
});
