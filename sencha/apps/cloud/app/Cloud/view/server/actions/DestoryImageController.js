Ext.define('Magice.Cloud.view.server.actions.DestoryImageController', {
  destroyImageSelector: 'server-actions-destroyimage',
  destroyImageCallback: function(state) {
    return this.lookup(this.destroyImageReferer).getStore().reload();
  },
  'on.action.destroyimage': function(btn) {
    this.destroyImageReferer = btn.referer;
    return this.takeAction(this.destroyImageSelector, {
      title: this.locale[this.destroyImageReferer].destoryTitle
    });
  },
  'on.action.destroyimage.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.destroyimage.error': function() {
    return this.destroyImageCallback('error');
  },
  'on.action.destroyimage.success': function() {
    return this.destroyImageCallback('success');
  },
  'on.action.destroyimage.action': function() {
    var operation, rs;
    rs = this.lookup(this.destroyImageReferer).getSelection();
    if (!rs.length) {
      return Ext.Msg.alert(this.locale[this.destroyImageReferer].noSelection);
    }
    operation = this.operation(this.destroyImageSelector);
    operation.prepare(Magice.Cloud.view.server.Controller.processer);
    return Ext.Ajax.request({
      method: 'DELETE',
      url: '/cloud/images/[id]/[img]/destroy',
      parameters: {
        id: rs[0].machineId || this.server('get', 'id'),
        img: rs[0].get('id')
      },
      success: function(response) {
        return operation.processing(response);
      },
      failure: function(response) {
        return operation.failure(response);
      }
    });
  }
});
