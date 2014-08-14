Ext.define("Magice.base.Model", {
  extend: "Ext.data.Model",
  mixins: {
    observable: 'Ext.util.Observable'
  },
  locale: {
    saveCallback: {
      success: {
        title: 'Yoos!',
        message: 'Your operation was successfull.'
      },
      error: {
        title: 'Oops!',
        message: 'Oops an error occurred. Please try again later.'
      }
    }
  },
  isDirty: function() {
    return this.dirty;
  },
  constructor: function(config) {
    var type;
    this.mixins.observable.constructor.call(this, config);
    this.callParent(arguments);
    if (this.api || this.rest) {
      if (this.rest) {
        type = 'rest';
        this.api = {
          read: void 0,
          create: void 0,
          update: void 0,
          destroy: void 0
        };
      } else {
        type = 'ajax';
        if (typeof this.api === 'string') {
          this.api = {
            read: this.api
          };
        }
      }
      this.self.setProxy({
        type: type,
        api: this.api,
        url: this.rest,
        writer: {
          type: 'json'
        }
      });
    }
  },
  erase: function(options) {
    var confirm;
    if (options && (options.confirm || typeof options === 'string')) {
      if (options.confirm) {
        confirm = options.confirm;
        delete options.confirm;
      } else {
        confirm = options;
        options = null;
      }
      if (!window.confirm(confirm)) {
        return;
      }
    }
    return this.callParent([options]);
  },
  save: function(options) {
    var comp, form;
    if (options && options.isComponent) {
      comp = options;
      if (this.phantom === false && this.dirty === false) {
        if (comp.locale && comp.locale.noDirty) {
          return Ext.Msg.alert(comp.locale.noDirty);
        }
        return;
      }
      form = comp.form ? comp : comp.down('form');
      options = form ? {
        form: form
      } : {};
      if (comp.isVisible()) {
        comp.setLoading(true);
      }
      options.callback = function(rec, operation, success) {
        console.log(arguments);
        return this.saveCallback.apply(this, [rec, operation, success, comp, form]);
      };
    }
    this._phantom = this.phantom;
    return this.callParent([options]);
  },
  saveCallback: function(rec, operation, success, comp, form) {
    var data, error, errors, field, handleType, key, msg, res, successTitle, title, _i, _len, _ref;
    if (comp.isVisible()) {
      comp.setLoading(false);
    }
    if (success && comp.preventCommitOnSuccess !== true) {
      rec.commit();
    }
    successTitle = this.locale.saveCallback.success.title;
    if (comp.alerter && comp.alerter.success) {
      handleType = typeof comp.alerter.success;
      if (handleType === 'function') {
        comp.alerter.success.apply(this, arguments);
      } else if (handleType === 'string') {
        Ext.Msg.success(successTitle, comp.alerter.success);
      } else if (handleType === 'object') {
        Ext.Msg.success(comp.alerter.success);
      } else if (handleType === true) {
        Ext.Msg.success(this.locale.saveCallback.success);
      } else {

      }
    }
    if (!comp.alerter) {
      Ext.Msg.success(this.locale.saveCallback.success);
    }
    if (success && comp.isWindow && comp.closeOnSuccess !== false) {
      comp.hide();
    }
    this.fireEvent('saved.finish.success', this._phantom, rec, operation, success, comp, form);
    this._phantom = false;
    if (success) {
      return;
    }
    if (!operation.exception) {
      return;
    }
    res = operation.error.response;
    title = operation.error.statusText;
    msg = this.locale.saveCallback.error.message;
    if (res.responseText) {
      data = Ext.decode(res.responseText);
      if (data.message) {
        msg = data.message;
      }
      errors = null;
      if (form && data.errors) {
        errors = '<div class="ui message warning">';
        errors = errors + '<ul>';
        for (key in data.errors) {
          field = form.getForm().findField(key);
          _ref = data.errors[key];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            error = _ref[_i];
            errors += '<li>' + error + '</li>';
          }
          if (field) {
            field.reset();
            field.markInvalid(data.errors[key]);
          }
        }
        errors += '</ul></div>';
      }
    }
    if (comp.disableErrorMessage !== true) {
      if (errors) {
        Ext.Msg.error(msg, errors);
      } else {
        Ext.Msg.error(title, msg);
      }
    }
    if (comp.preventRejectOnError !== true && comp.isVisible() === false) {
      return rec.reject();
    }
  }
});
