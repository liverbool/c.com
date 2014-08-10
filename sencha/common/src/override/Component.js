Ext.define('Ext.override.Component', {
  override: 'Ext.Component',
  config: {
    maskings: {
      key: 'masking',
      stores: null
    },
    popup: null
  },
  privates: {
    _maskings: false,
    _loading: 0
  },
  initComponent: function() {
    this.callParent(arguments);
    if (this.popup) {
      this.on('afterrender', function() {
        if (typeof this.popup === 'string') {
          this.popup = {
            content: this.popup
          };
        }
        return $(this.el.dom).popup(this.popup);
      }, this, {
        single: true
      });
    }
    return this.on('beforerender', this.initMasking);
  },
  initMasking: function() {
    var key, parent, store, viewModel, _i, _len, _ref, _results;
    if (!(this.maskings.stores && this._maskings === false)) {
      return;
    }
    if (this.maskings.parent) {
      parent = this.up(this.maskings.parent) || this.lookupReference(this.maskings.parent);
      viewModel = parent.getViewModel();
    } else {
      viewModel = this.getViewModel();
    }
    if (!viewModel) {
      return console.warn('Cannot found viewModel.');
    }
    _ref = this.maskings.stores;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      store = viewModel.getStore(key);
      store.on('beforeload', (function(_this) {
        return function() {
          viewModel.set(_this.maskings.key, !!(++_this._loading));
          if (_this._loading === 1) {
            return _this.fireEvent('masking.being', _this);
          }
        };
      })(this));
      _results.push(store.on('load', (function(_this) {
        return function() {
          viewModel.set(_this.maskings.key, !!(--_this._loading));
          if (_this._loading < 1) {
            return _this.fireEvent('masking.finish', _this);
          }
        };
      })(this)));
    }
    return _results;
  }
});
