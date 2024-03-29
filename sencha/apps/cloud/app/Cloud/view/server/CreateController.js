Ext.define('Magice.Cloud.view.server.CreateController', {
  'on.create.new': function() {
    var win;
    this.view.disable();
    win = this.view.add(new Magice.Cloud.view.server.form.Create({
      listeners: {
        close: (function(_this) {
          return function(me) {
            _this.view.remove(me);
            _this.setupCreator(null);
            return _this.view.enable();
          };
        })(this)
      }
    }));
    return this.load('creators', (function(_this) {
      return function(rs) {
        _this.setupCreator(rs);
        return win.show();
      };
    })(this));
  },
  'on.create.step0': function(me) {
    var win;
    win = me.up('window');
    return this.hideItems(win, ['#stepBar', '#btnNext', '#btnBack', '#btnStart']);
  },
  'on.create.step-select': function(me) {
    var win;
    win = me.up('window');
    this.showItems(win, ['#stepBar', '#btnNext']);
    return this.hideItems(win, ['#btnBack', '#btnStart']);
  },
  'on.create.step-summary': function(me) {
    var win;
    win = me.up('window');
    this.showItems(win, ['#btnBack', '#btnStart']);
    return this.hideItems(win, ['#stepBar', '#btnNext']);
  },
  'on.create.back': function(me) {
    return me.up('window').setActiveItem(1);
  },
  'on.create.next': function(me) {
    var steps, win;
    win = me.up('window');
    steps = this.model.get('steps');
    if (!steps.hostname.active || !steps.size.active || !steps.image.active) {
      return Ext.Msg.error(this.locale.stepInvalid);
    }
    this.model.set('summary', {
      hostname: steps.hostname.data,
      size: steps.size.data[0].data,
      image: steps.image.data[0].data,
      features: steps.feature.data
    });
    return win.setActiveItem(2);
  },
  'on.create.start': function(me) {
    var backups, data, f, ipv6, operation, privateNetworking, summary, _i, _len, _ref;
    operation = this.getCreateOperation();
    operation.prepare(this.processer);
    summary = this.model.get('summary');
    backups = ipv6 = privateNetworking = false;
    if (summary.features) {
      _ref = summary.features;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        if (f.data.slug === 'ipv6') {
          ipv6 = true;
        }
        if (f.data.slug === 'backups') {
          backups = true;
        }
        if (f.data.slug === 'private_networking') {
          privateNetworking = true;
        }
      }
    }
    data = {
      name: summary.hostname,
      size: summary.size.slug,
      image: summary.image.slug,
      ipv6: ipv6,
      backups: backups,
      privateNetworking: privateNetworking
    };
    return Ext.Ajax.request({
      url: '/cloud/servers',
      method: 'POST',
      jsonData: data,
      success: (function(_this) {
        return function(response) {
          return operation.processing(response);
        };
      })(this),
      failure: (function(_this) {
        return function(response) {
          var win;
          operation.failure(response);
          win = me.up('window');
          return _this.showItems(win, ['#btnBack']);
        };
      })(this)
    });
  },
  getCreateOperation: function() {
    return this.lookup('creatorWindow').getOperation();
  },
  setupCreator: function(rs) {
    var r;
    if (rs === null) {
      this.model.set('creatorsImages', null);
      this.clearData('creatorsSizes');
      this.clearData('creatorsDistributors');
      return this.clearData('creatorsFeatures');
    } else {
      r = rs[0];
      this.model.set('creatorsImages', r.get('images'));
      this.loadData('creatorsSizes', r.get('sizes'));
      this.loadData('creatorsDistributors', r.get('dists'));
      this.loadData('creatorsFeatures', r.get('features'));
      this.loadData('creatorsPrivateImages', r.get('privates'));
      return this.loadData('creatorsBackupImages', r.get('backups'));
    }
  },
  setStepActive: function(data, step, active) {
    var steps;
    steps = this.model.get('steps');
    steps[step].icon = active ? 'checked checkbox' : 'empty checkbox';
    steps[step].active = active;
    steps[step].data = data;
    return this.model.set('steps', steps);
  },
  deselectAllOfChildGrid: function(parent, current) {
    var grid, _i, _len, _ref, _results;
    _ref = parent.query('grid');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      grid = _ref[_i];
      if (grid.id !== current.id) {
        _results.push(grid.getSelectionModel().deselectAll(true));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  },
  'on.creator.hostname.change': function(me) {
    return this.setStepActive(me.value, 'hostname', me.value && me.isValid());
  },
  'on.creator.dist.selectionchange': function(sm, rs) {
    var images;
    images = this.model.get('creatorsImages');
    this.loadData('creatorsDistributorsImages', images[rs[0].get('slug')]);
    return this.setStepActive(null, 'image', false);
  },
  'on.creator.dist.image.selectionchange': function(sm, rs) {
    this.deselectAllOfChildGrid(sm.view.up('creator-image'), sm.view.grid);
    return this.setStepActive(rs, 'image', rs.length);
  },
  'on.creator.private.image.selectionchange': function(sm, rs) {
    this.deselectAllOfChildGrid(sm.view.up('creator-image'), sm.view.grid);
    return this.setStepActive(rs, 'image', rs.length);
  },
  'on.creator.backup.image.selectionchange': function(sm, rs) {
    this.deselectAllOfChildGrid(sm.view.up('creator-image'), sm.view.grid);
    return this.setStepActive(rs, 'image', rs.length);
  },
  'on.creator.size.selectionchange': function(sm, rs) {
    return this.setStepActive(rs, 'size', rs.length);
  },
  'on.creator.feature.selectionchange': function(sm, rs) {
    this.setStepActive(rs, 'feature', rs.length);
    sm.view.el.select('div.item input').set({
      checked: null
    }, false);
    return sm.view.el.select('div.x-item-selected input').set({
      checked: true
    }, false);
  },
  'on.create.ended': function(res) {
    return this.load('servers');
  }
});
