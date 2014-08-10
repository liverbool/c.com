Ext.define("Ext.extend.Msg", {
  requires: 'Ext.Msg'
}, function() {
  Ext.Msg.shadow = false;
  Ext.Msg.error = function(title, message, fn, scope) {
    if (Ext.isString(title)) {
      title = {
        title: title,
        message: message
      };
    }
    return Ext.Msg.show(Ext.apply({
      buttons: Ext.Msg.OK,
      icon: Ext.Msg.ERROR,
      fn: fn,
      scope: scope,
      minWidth: Ext.Msg.minWidth
    }, title));
  };
  Ext.Msg.SUCCESS = Ext.baseCSSPrefix + 'message-box-success';
  Ext.Msg.success = function(title, message, fn, scope) {
    if (Ext.isString(title)) {
      title = {
        title: title,
        message: message
      };
    }
    return Ext.Msg.show(Ext.apply({
      buttons: Ext.Msg.OK,
      icon: Ext.Msg.SUCCESS,
      fn: fn,
      scope: scope,
      minWidth: Ext.Msg.minWidth
    }, title));
  };
  Ext.Msg.alert = function(title, message, fn, scope) {
    if (Ext.isString(title)) {
      title = {
        title: title,
        message: message
      };
    }
    return Ext.Msg.show(Ext.apply({
      buttons: Ext.Msg.OK,
      fn: fn,
      scope: scope,
      minWidth: Ext.Msg.minWidth
    }, title));
  };
  Ext.Notify = function(title, message, align, iconCls) {
    if (Ext.isString(title)) {
      title = {
        title: title,
        html: message
      };
    }
    if (title.message) {
      title.html = title.message;
      delete title.message;
    }
    return Ext.toast(Ext.apply({
      iconCls: iconCls,
      align: align || 'br',
      minWidth: Ext.Notify.minWidth,
      slideInAnimation: 'elasticIn',
      slideBackAnimation: 'elasticOut'
    }, title));
  };
  if (!Ext.Notify.minWidth) {
    Ext.Notify.minWidth = 200;
  }
  Ext.Notify.prototype.error = function(title, message, align) {
    return Ext.Notify(title, message, align, 'x-notify-error');
  };
  Ext.Notify.prototype.warning = function(title, message, align) {
    return Ext.Notify(title, message, align, 'x-notify-warning');
  };
  Ext.Notify.prototype.success = function(title, message, align) {
    return Ext.Notify(title, message, align, 'x-notify-success');
  };
  return Ext.Notify.prototype.info = function(title, message, align) {
    return Ext.Notify(title, message, align, 'x-notify-info');
  };
});
