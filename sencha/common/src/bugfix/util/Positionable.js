Ext.define('Ext.bugfix.util.Positionable', {
  override: 'Ext.util.Positionable',
  constrainBox: function(box) {
    var constrainedPos;
    if (this.constrain || this.constrainHeader) {
      constrainedPos = this.calculateConstrainedPosition(null, [(Ext.isDefined(box.x) ? box.x : box.left), (Ext.isDefined(box.y) ? box.y : box.top)], false, [box.width, box.height]);
      if (constrainedPos) {
        box.x = constrainedPos[0];
        box.y = constrainedPos[1];
      }
    }
    if (box.x < 0) {
      box.x = 0;
    }
    if (box.y < 0) {
      box.y = 0;
    }
  }
});
