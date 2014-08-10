Ext.define('Magice.Cloud.view.server.actions.ResetPasswordController', {
  actionResetPwdSelector: 'server-actions-resetpwd',
  'on.action.resetpwd': function() {
    return this.takeAction(this.actionResetPwdSelector);
  },
  'on.action.resetpwd.action': function() {
    return this['resetpwd.action']();
  },
  'on.action.resetpwd.close': function(me) {
    return this.view.remove(me);
  },
  'resetpwd.action': function() {
    var operation;
    operation = this.operation(this.actionResetPwdSelector);
    operation.prepare(this.processer);
    return Ext.Ajax.request({
      method: 'PUT',
      url: '/cloud/servers/[id]/resetpwd',
      parameters: {
        id: this.server('get', 'id')
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
