Ext.define('Magice.Addressing.view.Controller', {
  extend: 'Magice.base.ViewController',
  alias: 'controller.addressing',
  locale: {
    invalidForm: {
      title: 'Error!',
      message: 'Please fullil the form.'
    },
    dirtyConfirm: {
      title: 'Data changed!',
      message: 'Your have change data. Do you want to save changed?'
    },
    noDirty: {
      title: 'Oops!',
      message: 'Nothing to save.'
    }
  },
  privates: {
    load: function(store, options) {
      return this.getViewModel().getStore(store).load(options);
    },
    getAddressForm: function(btn) {
      var record, win;
      win = this.lookup('form-address-window');
      if (!win) {
        win = this.view.add(new Magice.Addressing.view.form.Address({
          locale: this.locale
        }));
        this.load('provinces', {
          callback: (function(_this) {
            return function() {
              return _this.enableFields('province');
            };
          })(this)
        });
      }
      if (btn) {
        record = btn.create ? this.model.create('Address') : btn.getWidgetRecord();
        this.model.set('record', record);
        if (btn.create) {
          win.reset();
        }
      }
      return win;
    },
    clearAndDisableFields: function() {
      var field, n, _results;
      _results = [];
      for (n in arguments) {
        field = arguments[n];
        field = this.lookup(field);
        if (field.store) {
          field.store.removeAll();
        }
        _results.push(field.setDisabled(true));
      }
      return _results;
    },
    enableFields: function() {
      var field, n, _results;
      _results = [];
      for (n in arguments) {
        field = arguments[n];
        field = this.lookup(field);
        _results.push(field.setDisabled(false));
      }
      return _results;
    }
  },
  showEditForm: function(btn) {
    return this.getAddressForm(btn).show();
  },
  saveChange: function() {
    var win;
    win = this.getAddressForm();
    if (!win.isValid()) {
      return Ext.Msg.error(this.locale.invalidForm);
    }
    return this.model.save('record', win, {
      'saved.finish.success': {
        fn: (function(_this) {
          return function(phantom, record) {
            if (phantom) {
              return _this.model.get('addresses').add(record);
            }
          };
        })(this),
        single: true
      }
    });
  },
  onBeforeHideFormWindow: function() {
    var msg, record;
    record = this.model.get('record');
    if (record.phantom) {
      return this.model.set('record', null);
    }
    if (!record.dirty) {
      return;
    }
    msg = this.locale.dirtyConfirm;
    return Ext.Msg.confirm(msg.title, msg.message, (function(_this) {
      return function(pressed) {
        if (pressed === 'yes') {
          return _this.saveChange();
        } else {
          return record.reject();
        }
      };
    })(this));
  },
  onProvinceChange: function(cmp, newVal) {
    this.clearAndDisableFields('amphur', 'district', 'zipcode');
    if (!Ext.isNumeric(newVal)) {
      return;
    }
    return this.load('amphurs', {
      parameters: {
        id: newVal
      },
      callback: (function(_this) {
        return function() {
          return _this.enableFields('amphur');
        };
      })(this)
    });
  },
  onAmphurChange: function(cmp, newVal) {
    this.clearAndDisableFields('district', 'zipcode');
    if (!Ext.isNumeric(newVal)) {
      return;
    }
    return this.load('districts', {
      parameters: {
        id: newVal
      },
      callback: (function(_this) {
        return function() {
          return _this.enableFields('district');
        };
      })(this)
    });
  },
  onDistrictChange: function(cmp, newVal) {
    var item, zipcode;
    this.clearAndDisableFields('zipcode');
    if (!Ext.isNumeric(newVal)) {
      return;
    }
    item = cmp.findRecordByValue(newVal);
    zipcode = this.lookup('zipcode');
    if (!zipcode.value) {
      zipcode.setValue(item.get('zipcode'));
    }
    return this.enableFields('zipcode');
  },
  onDistrictSelectChange: function(cmp, rs) {
    var item;
    item = rs.length ? rs[0] : null;
    return this.lookup('zipcode', item === null ? null : item.get('zipcode'));
  },
  onGridEditClick: function(btn) {
    return this.showEditForm(btn);
  }
});
