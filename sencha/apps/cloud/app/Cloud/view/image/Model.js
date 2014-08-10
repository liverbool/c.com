Ext.define('Magice.Cloud.view.image.Model', {
  extend: 'Magice.base.ViewModel',
  alias: 'viewmodel.images',
  data: {
    maskingimages: false
  },
  stores: {
    images: {
      model: 'Magice.Cloud.model.Image',
      url: '/cloud/images/me',
      groupField: 'machineId',
      autoLoad: true
    }
  }
});
