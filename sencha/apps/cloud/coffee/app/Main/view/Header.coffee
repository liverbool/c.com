Ext.define "Magice.Main.view.Header",
    extend: "Ext.container.Container"
    xtype: "item-header"

    padding: 0
    margin: 0

    data:
        title: 'ツ Joyprice'
        welcome: 'Welcome!'

    tpl: [
        '<div class="ui transparent inverted main menu" style="border-radius:0">'
            '<div class="container">'
                '<a class="item launch"><i class="icon basic content"></i></a>'
                '<a class="item title"><b>{title}</b> {welcome}</a>'
                '<div class="right menu">'
                    '<a class="popup icon github item" data-content="View on Github" href="https://www.github.com">'
                        '<i class="icon github"></i>'
                    '</a>'
                    '<div class="ui simple dropdown item">'
                        '<i class="icon tint"></i> Theme'
                        '<div class="theme menu">'
                            '<div class="active item" data-theme="flat">Flat</div>'
                            '<div class="item" data-theme="shaded">Shaded</div>'
                            '<div class="item" data-theme="classic">Classic</div>'
                        '</div>'
                    '</div>'
                '</div>'
            '</div>'
        '</div>'
    ]