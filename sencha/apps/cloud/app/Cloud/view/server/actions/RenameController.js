Ext.define('Magice.Cloud.view.server.actions.RenameController', {
  actionRenameSelector: 'server-actions-rename',
  'on.action.rename': function() {
    return this.takeAction(this.actionRenameSelector);
  },
  'on.action.rename.close': function(me) {
    return this.view.remove(me);
  },
  'on.action.rename.save': function() {
    return this['rename.action']();
  },
  'on.action.rename.error': function() {
    return this.server('reject');
  },
  'on.action.rename.errored': function() {
    return this.server('sync');
  },
  'on.action.rename.completed': function() {
    return this.server('commit');
  },
  'on.action.rename.beforeclose': function(me) {
    var locale;
    if (!this.server('isDirty')) {
      return;
    }
    locale = this.locale.rename.confirm;
    Ext.Msg.confirm(locale.title, locale.message, (function(_this) {
      return function(btn) {
        if (btn === 'no') {
          _this.server('reject');
          return me.close();
        } else {
          if (_this.server('isValid') !== true) {
            Ext.Msg.error(_this.locale.rename.notValid);
            return false;
          }
          return _this['rename.action']();
        }
      };
    })(this));
    return false;
  },
  'rename.action': function() {
    var operation;
    if (this.server('isDirty') !== true) {
      return Ext.Msg.alert(this.locale.rename.notDirty);
    }
    if (this.server('isValid') !== true) {
      return Ext.Msg.error(this.locale.rename.notValid);
    }
    operation = this.operation(this.actionRenameSelector);
    operation.prepare(this.processer);
    return this.server('save', {
      params: {
        type: 'rename'
      },
      success: function(rec, Operation) {
        return operation.processing(Operation);
      },
      failure: function(rec, Operation) {
        return operation.failure(Operation);
      }
    });
  }
});
