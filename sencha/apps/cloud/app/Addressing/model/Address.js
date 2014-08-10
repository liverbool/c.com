Ext.define('Magice.Addressing.model.Address', {
  extend: 'Magice.base.Model',
  rest: '/account/addressing',
  fields: [
    {
      name: 'id',
      type: 'int'
    }, {
      name: 'personnel'
    }, {
      name: 'company'
    }, {
      name: 'no'
    }, {
      name: 'building'
    }, {
      name: 'street'
    }, {
      name: 'road'
    }, {
      name: 'country'
    }, {
      name: 'province'
    }, {
      name: 'amphur'
    }, {
      name: 'district'
    }, {
      name: 'zipcode',
      type: 'int'
    }, {
      name: 'isDefault',
      type: 'boolean'
    }
  ]
});
