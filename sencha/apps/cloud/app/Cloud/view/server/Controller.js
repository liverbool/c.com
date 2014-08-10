Ext.define('Magice.Cloud.view.server.Controller', {
  extend: 'Magice.base.ViewController',
  mixins: ['Magice.Cloud.view.server.Locale', 'Magice.Cloud.view.server.CreateController', 'Magice.Cloud.view.server.ListController', 'Magice.Cloud.view.server.ListActionsController', 'Magice.Cloud.view.server.ListSnapshotsController', 'Magice.Cloud.view.server.ListBackupsController', 'Magice.Cloud.view.server.actions.RenameController', 'Magice.Cloud.view.server.actions.RebootController', 'Magice.Cloud.view.server.actions.PowerCycleController', 'Magice.Cloud.view.server.actions.PowerOffController', 'Magice.Cloud.view.server.actions.PowerOnController', 'Magice.Cloud.view.server.actions.ShutdownController', 'Magice.Cloud.view.server.actions.ResetPasswordController', 'Magice.Cloud.view.server.actions.SnapshotController', 'Magice.Cloud.view.server.actions.EnableIPv6Controller', 'Magice.Cloud.view.server.actions.EnablePrivateNetworkingController', 'Magice.Cloud.view.server.actions.DisableBackupsController', 'Magice.Cloud.view.server.actions.DestoryImageController', 'Magice.Cloud.view.server.actions.RebuildController', 'Magice.Cloud.view.server.actions.DestroyController', 'Magice.Cloud.view.server.actions.KernelController', 'Magice.Cloud.view.server.actions.RestoreController'],
  alias: 'controller.servers',
  statics: {
    processer: function(operation, actionId) {
      if (!actionId) {
        return operation.warning();
      }
      return Ext.Ajax.request({
        url: '/cloud/actions/[id]',
        parameters: {
          id: actionId
        },
        method: 'GET',
        success: function(response) {
          return operation.processing(response);
        },
        failure: function(response) {
          return operation.warning(response);
        }
      });
    }
  },
  server: function(action, opts) {
    var server;
    server = this.model.get('server');
    if (action === void 0) {
      return server;
    }
    console.log(action);
    switch (action) {
      case void 0:
        return server;
      case 'sync':
        return this.sync(server);
      default:
        return server[action](opts !== void 0 ? opts : void 0);
    }
  },
  confirmPowerOff: function() {
    if (this.server('get', 'status') !== 'off') {
      this.locale.reqiurePowerOff.message = sprintf(this.locale.reqiurePowerOff.message, this.server('get', 'name'));
      return Ext.Msg.alert(this.locale.reqiurePowerOff);
    }
  },
  powerCurrentlyOff: function() {
    if (this.server('get', 'status') === 'off') {
      this.locale.powerCurrentlyOff.message = sprintf(this.locale.powerCurrentlyOff.message, this.server('get', 'name'));
      return Ext.Msg.alert(this.locale.powerCurrentlyOff);
    }
  },
  powerCurrentlyOn: function() {
    if (this.server('get', 'status') === 'off') {
      this.locale.powerCurrentlyOn.message = sprintf(this.locale.powerCurrentlyOn.message, this.server('get', 'name'));
      return Ext.Msg.alert(this.locale.powerCurrentlyOn);
    }
  },
  takeAction: function(name, powerOff, config) {
    if (Ext.isObject(powerOff)) {
      config = powerOff;
      powerOff = null;
    }
    if (powerOff && this.confirmPowerOff()) {
      return;
    }
    config = config || {};
    config.locks = this.view;
    return this.view.add(Ext.widget(name, config)).show();
  },
  sync: function(server, params) {
    if (!server || !server.get('id')) {
      return console.warn('Empty server to sync!');
    }
    console.info('Being sync server id: ' + server.get('id'));
    return Ext.Ajax.request({
      background: true,
      url: '/cloud/servers/[id]/sync',
      params: params,
      parameters: {
        id: server.get('id')
      },
      success: function(response) {
        server.set(Ext.decode(response.responseText));
        return server.commit();
      },
      failure: (function(_this) {
        return function() {
          _this.locale.syncError.message = sprintf(_this.locale.syncError.message, server.get('name'));
          return Ext.Notify.prototype.error(_this.locale.syncError);
        };
      })(this)
    });
  }
});
