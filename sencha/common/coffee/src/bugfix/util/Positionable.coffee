Ext.define 'Ext.bugfix.util.Positionable',
    override: 'Ext.util.Positionable'

    ## http://www.sencha.com/forum/showthread.php?287774
    constrainBox: (box) ->

        if @constrain or @constrainHeader
            constrainedPos =
                @calculateConstrainedPosition null,
                # OLD CODE [(box.x || box.left), (box.y || box.top)],
                [
                    (if Ext.isDefined(box.x) then box.x else box.left)
                    (if Ext.isDefined(box.y) then box.y else box.top)
                ],
                false,
                [box.width, box.height]

            # If it *needs* constraining, change the position
            if constrainedPos
                box.x = constrainedPos[0]
                box.y = constrainedPos[1]

        # BOON
        box.x = 0 if box.x < 0
        box.y = 0 if box.y < 0
        return