
/*
This class is the main view for the application. It is specified in app.js as the
"autoCreateViewport" property. That setting automatically applies the "viewport"
plugin to promote that instance of this class to the body element.

The primary role of this controller is to manage routing.
 */
Ext.define("Magice.Main.view.Controller", {
  extend: "Ext.app.ViewController",
  alias: "controller.main",
  routes: {
    "!:id": {
      action: "onNavigate",
      before: "beforeNavigate"
    },
    "!:id/:state": {
      action: "onNavigateDeep",
      before: "beforeNavigateDeep"
    }
  },
  listen: {
    controller: {
      "*": {
        changeroute: "changeRoute",
        unmatchedroute: "onUnmatchedRoute"
      }
    }
  },
  privates: {
    getMenu: function() {
      return this.getView().down('item-menu');
    },
    getMain: function() {
      return this.getView().down('[region="center"]');
    },
    getItem: function(id) {
      return this.getMain().getComponent(id);
    },
    hasWidget: function(alias) {
      return Ext.ClassManager.getNameByAlias('widget.' + alias);
    }
  },
  destroy: function() {
    Ext.destroyMembers(this, "menu");
    this.callParent();
  },
  beforeNavigate: function(id, action) {
    var item;
    item = this.getItem(id);
    if (!item && this.hasWidget(id)) {
      item = this.getMain().add(Ext.widget(id));
    }
    if (item) {
      action.resume();
    } else {
      this.onBadRoute();
    }
  },
  onNavigate: function(id) {
    var item, route;
    item = this.getMain().setActiveItem(id);
    this.getMenu().setActiveMenu(id, true);
    if (item) {
      route = this.getItemRoute(item);
      if (route && route !== id) {
        this.changeRoute(this, route);
      }
    }
  },
  beforeNavigateDeep: function(id, state, action) {
    var item, valid;
    item = this.getItem(id);
    if (!item && this.hasWidget(id)) {
      item = this.getMain().add(Ext.widget(id));
    }
    valid = item.isValidState ? item.isValidState(state) : void 0;
    if (valid) {
      action.resume();
    } else {
      this.onBadRoute();
    }
  },
  onNavigateDeep: function(id, state) {
    this.getMenu().setActiveMenu(id, true);
    this.getMain().setActiveItem(id);
    this.getItem(id).setActiveState(state);
  },
  changeRoute: function(controller, route) {
    if (route.substring(0, 1) !== "!") {
      route = "!" + route;
    }
    this.redirectTo(route);
  },
  getItemRoute: function(item) {
    var route;
    route = item.xtype;
    if (item.getActiveState) {
      route += "/" + (item.getActiveState() || item.getDefaultActiveState());
    }
    return route;
  },
  onBadRoute: function() {
    var app;
    console.trace();
    app = Magice.app.getApplication();
    this.changeRoute(this, app.getDefaultToken());
  },
  onUnmatchedRoute: function(token) {
    if (token) {
      this.onBadRoute();
    }
  },
  onMenuChange: function(sm, rs) {
    return this.changeRoute(this, rs[0].id);
  }
});
