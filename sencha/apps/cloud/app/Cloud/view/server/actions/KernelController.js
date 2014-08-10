Ext.define('Magice.Cloud.view.server.actions.KernelController', {
  actionKernelSelector: 'server-actions-kernel',
  'on.action.kernel': function() {
    return this.takeAction(this.actionKernelSelector);
  },
  'on.action.kernel.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.kernel.action': function() {
    return this.callAction('kernel.action');
  },
  'on.action.kernel.error': function() {
    return this.server('sync');
  },
  'on.action.kernel.errored': function() {
    return this.server('sync');
  },
  'on.action.kernel.completed': function() {
    return this.server('sync');
  },
  'on.actions.kernel.beforeload': function(store, opt) {
    return opt.config.parameters = {
      id: this.server('get', 'id')
    };
  },
  'kernel.action': function() {
    var kernelId, operation, server;
    server = this.server();
    if (this.lookup('kernelCheckbox').checked) {
      kernelId = 'origin';
    } else {
      kernelId = this.lookup('kernelCombox').value;
    }
    if (!kernelId) {
      return Ext.Msg.error(this.locale.kernel.noSelectedImage);
    }
    operation = this.operation(this.actionKernelSelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/kernels/[kernelId]',
      parameters: {
        id: server.get('id'),
        kernelId: kernelId
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
