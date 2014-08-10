Ext.define('Magice.Cloud.view.server.actions.RebuildController', {
  actionRebuildSelector: 'server-actions-rebuild',
  'on.action.rebuild': function() {
    return this.takeAction(this.actionRebuildSelector);
  },
  'on.action.rebuild.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.rebuild.action': function() {
    return this.callAction('rebuild.action');
  },
  'on.action.rebuild.error': function() {
    return this.server('sync');
  },
  'on.action.rebuild.errored': function() {
    return this.server('sync');
  },
  'on.action.rebuild.completed': function() {
    return this.server('sync');
  },
  'rebuild.action': function() {
    var imageId, operation, server;
    server = this.server();
    if (this.lookup('rebuildCheckbox').checked) {
      imageId = server.get('image').id;
    } else {
      imageId = this.lookup('rebuildCombox').value;
    }
    if (!imageId) {
      return Ext.Msg.error(this.locale.rebuild.noSelectedImage);
    }
    operation = this.operation(this.actionRebuildSelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/rebuild/[img]',
      parameters: {
        id: server.get('id'),
        img: imageId
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
