Ext.define('Ext.extend.grid.Panel', {
  extend: 'Ext.grid.Panel'
}, function() {
  return Ext.grid.tooltip = function(view) {
    return view.tip = Ext.create('Ext.tip.ToolTip', {
      target: view.el,
      delegate: view.itemSelector,
      trackMouse: true,
      renderTo: Ext.getBody(),
      listeners: {
        beforeshow: function(tip) {
          var tooltip;
          tooltip = view.getRecord(tip.triggerElement).get('tooltip');
          if (tooltip) {
            return tip.update(tooltip);
          } else {
            return tip.on('show', function() {
              return Ext.defer(tip.hide, 10, tip);
            }, tip, {
              single: true
            });
          }
        }
      }
    });
  };
});
