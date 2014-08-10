Ext.define('Ext.ux.jp.panel.Operation', {
  extend: 'Ext.container.Container',
  baseCls: 'x-operation-panel',
  xtype: 'operation-panel',
  layout: 'center',
  minWidth: 300,
  border: false,
  locale: {
    prepare: {
      header: 'Preparing',
      message: 'Prepare your operation.'
    },
    processing: {
      header: 'Processing'
    },
    success: {
      header: 'Congratulations!',
      message: 'Your operation have been done.'
    },
    failure: {
      header: 'Oops!',
      message: 'An error occurred. Please try again later.'
    },
    warning: {
      header: 'Warning!',
      message: 'Something happend while processing.'
    },
    errored: {
      message: 'Errored!'
    }
  },
  config: {
    locales: null,
    parent: null,
    locks: null,
    showPercentage: false,
    showResponseMessage: true,
    tryAgainSelector: '#btnTryAgain',
    tryAgainItemIndex: 1,
    itemIndex: 0,
    toggleItems: null,
    processer: Ext.emptyFn,
    continuousId: 'id',
    firstContinuousId: null
  },
  publishes: {
    percentage: true,
    state: true
  },
  viewModel: {
    data: {
      operation: {
        state: 'prepare',
        percentage: 0,
        failureMessage: null,
        warningMessage: null,
        successMessage: null
      }
    }
  },
  bind: {
    data: {
      bindTo: '{operation}',
      deep: true
    }
  },
  getParent: function() {
    return this.parent || this.ownerCt;
  },
  setOperation: function(key, value) {
    var operation;
    operation = this.getViewModel().get('operation');
    operation[key] = value;
    return this.getViewModel().set('operation', operation);
  },
  getOperation: function(key) {
    var operation;
    operation = this.getViewModel().get('operation');
    return operation[key];
  },
  setState: function(state, result) {
    console.info(state);
    this.setOperation('state', state);
    this.setOperation('errorMessage', null);
    this.handleResult(result);
    switch (state) {
      case 'prepare':
        this.handlePrepare();
        break;
      case 'failure':
        this.handleFailure();
        break;
      case 'warning':
        this.handleWarning();
        break;
      case 'success':
        this.handleSuccess();
        break;
      case 'processing':
        this.handleProcessing();
    }
    return this;
  },
  getState: function() {
    return this.getOperation('state');
  },
  setPercentage: function(value) {
    if (this.getPercentage() > 100) {
      value = 100;
    }
    return this.setOperation('percentage', this.percentage = value);
  },
  getPercentage: function() {
    return this.getOperation('percentage');
  },
  updatePercentage: function(value) {
    value = value || this.getPercentage();
    return this.setPercentage(++value);
  },
  isPrepare: function() {
    return this.getState() === 'prepare';
  },
  isSuccess: function() {
    return this.getState() === 'success';
  },
  isFailure: function() {
    return this.getState() === 'failure';
  },
  isWarning: function() {
    return this.getState() === 'warning';
  },
  isProcessing: function() {
    return this.getState() === 'processing';
  },
  prepare: function(opt) {
    return this.setState('prepare', opt);
  },
  success: function(opt) {
    return this.setState('success', opt);
  },
  failure: function(opt) {
    return this.setState('failure', opt);
  },
  warning: function(opt) {
    return this.setState('warning', opt);
  },
  processing: function(opt) {
    return this.setState('processing', opt);
  },
  handlePrepare: function() {
    var btn;
    this.hideToggleItems();
    this.getParent().setActiveItem(this.itemIndex);
    this.locker('disable');
    if (btn = this.getParent().down(this.tryAgainSelector)) {
      btn.hide();
      if (!btn.handler && !btn.hasListeners.click) {
        btn.on('click', (function(_this) {
          return function() {
            return _this.tryAgain();
          };
        })(this));
      }
    }
    return this.fireEvent('on.prepare');
  },
  handleFailure: function() {
    var btn;
    if (btn = this.getParent().down(this.tryAgainSelector)) {
      btn.show();
    }
    this.locker('enable');
    return this.fireEvent('on.failure');
  },
  handleWarning: function() {
    this.locker('enable');
    return this.fireEvent('on.warning');
  },
  handleSuccess: function() {
    this.locker('enable');
    return this.fireEvent('on.success');
  },
  handleProcessing: function() {
    if (this.isWarning() || this.isFailure() || this.isSuccess()) {
      return;
    }
    this.locker('disable');
    this.updatePercentage();
    return this.fireEvent('on.processing');
  },
  handleResult: function(result) {
    var actionId, res, response, responseder;
    if (this.isPrepare() && typeof result === 'function') {
      return this.setProcesser(result);
    }
    console.log(result);
    response = null;
    responseder = new Object;
    if (result && result.exception) {
      response = result.error.response;
    }
    if (result && result.isUpdateOperation && response === null) {
      response = result._response;
    }
    if (result && result.getResponseHeader) {
      response = result;
    }
    if (response) {
      responseder.code = response.status;
      responseder.msg = response.statusText;
      if (/json/i.test(response.getResponseHeader('Content-Type')) && response.responseText) {
        res = Ext.decode(response.responseText);
        responseder.code = res.code || res.statusCode || responseder.code;
        responseder.msg = res.message || responseder.msg;
        responseder.res = res;
        if (this.isProcessing() && res.actionIds) {
          responseder.actionId = res.actionIds[0];
        }
      }
      if (this.isProcessing() && (actionId = response.getResponseHeader('X-Action-Id'))) {
        if (actionId !== 'NO_VALUE') {
          responseder.actionId = actionId;
        }
      }
      if (this.isProcessing() && responseder.actionId) {
        this.whenProgress(responseder);
      }
      if (response.status === 204 && !responseder.actionId) {
        return this.success();
      }
      if (this.isProcessing() && responseder.res) {
        responseder.actionId = responseder.res[this.getContinuousId()];
        switch (responseder.res.status) {
          case 'in-progress':
            this.whenProgress(responseder);
            break;
          case 'completed':
            this.whenCompleted(responseder);
            break;
          case 'errored':
            this.whenErrored(responseder);
        }
      }
      if (this.isWarning()) {
        this.setOperation('warningMessage', '[' + responseder.code + '] ' + responseder.msg);
      }
      if (this.isFailure()) {
        this.setOperation('failureMessage', '[' + responseder.code + '] ' + responseder.msg);
      }
      if (this.isSuccess()) {
        return this.setOperation('successMessage', responseder.msg);
      }
    }
  },
  whenProgress: function(responseder) {
    if (false !== this.fireEvent('when.progress', responseder)) {
      return this.processer(this, responseder.actionId);
    }
  },
  whenCompleted: function(responseder) {
    this.setPercentage(100);
    return Ext.defer(function() {
      if (false !== this.fireEvent('when.completed', responseder)) {
        return this.success();
      }
    }, 500, this);
  },
  whenErrored: function(responseder) {
    if (false !== this.fireEvent('when.errored', responseder)) {
      responseder.msg = this.locale.errored.message;
      return this.failure();
    }
  },
  tryAgain: function() {
    var btn;
    this.showToggleItems();
    this.getParent().setActiveItem(this.tryAgainItemIndex);
    if (btn = this.getParent().down(this.tryAgainSelector)) {
      return btn.hide();
    }
  },
  showToggleItems: function() {
    var item, _i, _len, _ref, _results;
    if (!this.toggleItems) {
      return;
    }
    _ref = this.toggleItems;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      _results.push(this.resolveItem(item).show());
    }
    return _results;
  },
  hideToggleItems: function() {
    var item, _i, _len, _ref, _results;
    if (!this.toggleItems) {
      return;
    }
    _ref = this.toggleItems;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      _results.push(this.resolveItem(item).hide());
    }
    return _results;
  },
  resolveItem: function(item) {
    if (typeof item === 'string') {
      return this.getParent().down(item);
    } else {
      return item;
    }
  },
  locker: function(state) {
    var itm, _i, _len, _ref, _results;
    if (!this.locks && this.parent) {
      this.locks = this.parent.locks;
    }
    if (this.locks) {
      if (Ext.isObject(this.locks)) {
        this.locks = [this.locks];
      }
      _ref = this.locks;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        itm = _ref[_i];
        if (itm) {
          _results.push(itm[state]());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  },
  constructor: function(config) {
    if (config.locales) {
      Ext.apply(this.locale, config.locales);
    }
    return this.callParent([config]);
  },
  initComponent: function() {
    this.tpl = [
      '<tpl if="this.isPrepare()">', '<div class="ui icon message">', '<i class="loading icon"></i>', '<div class="content">', '<div class="header">' + this.locale.prepare.header + '</div>', '<p>' + this.locale.prepare.message + '</p>', '</div>', '</div>', '</tpl>', '<tpl if="this.isProcessing()">', '<div class="ui message">', '<div class="ui header">', this.locale.processing.header, this.showPercentage ? ' {percentage}%' : void 0, '</div>', '<p>', '<div class="ui active striped red progress">', '<div class="bar" style="width: {percentage}%;"></div>', '</div>', '</p>', '</div>', '</tpl>', '<tpl if="this.isSuccess()">', '<div class="ui icon success message">', '<i class="checkmark icon"></i>', '<div class="content">', '<div class="header">' + this.locale.success.header + '</div>', '<p>', this.locale.success.message, '<tpl if="successMessage && this.showResponseMessage()">', '<div class="ui segment">{successMessage}</div>', '</tpl>', '</p>', '</div>', '</div>', '</tpl>', '<tpl if="this.isFailure()">', '<div class="ui icon error message">', '<i class="attention icon"></i>', '<div class="content">', '<div class="header">' + this.locale.failure.header + '</div>', '<p>', this.locale.failure.message, '<tpl if="failureMessage && this.showResponseMessage()">', '<div class="ui segment">{failureMessage}</div>', '</tpl>', '</p>', '</div>', '</div>', '</tpl>', '<tpl if="this.isWarning()">', '<div class="ui icon warning message">', '<i class="warning icon"></i>', '<div class="content">', '<div class="header">' + this.locale.warning.header + '</div>', '<p>', this.locale.warning.message, '<tpl if="warningMessage && this.showResponseMessage()">', '<div class="ui segment">{warningMessage}</div>', '</tpl>', '</p>', '</div>', '</div>', '</tpl>', {
        isPrepare: (function(_this) {
          return function() {
            return _this.isPrepare();
          };
        })(this),
        isSuccess: (function(_this) {
          return function() {
            return _this.isSuccess();
          };
        })(this),
        isFailure: (function(_this) {
          return function() {
            return _this.isFailure();
          };
        })(this),
        isWarning: (function(_this) {
          return function() {
            return _this.isWarning();
          };
        })(this),
        isProcessing: (function(_this) {
          return function() {
            return _this.isProcessing();
          };
        })(this),
        showResponseMessage: (function(_this) {
          return function() {
            return _this.getShowResponseMessage();
          };
        })(this)
      }
    ];
    return this.callParent(arguments);
  }
});
