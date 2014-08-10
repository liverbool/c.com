Ext.define('Magice.Cloud.view.server.form.CreateDockedBar', {
  extend: 'Ext.container.Container',
  xtype: 'creator-dockedbar',
  dock: 'bottom',
  items: {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      xtype: 'container',
      border: false
    },
    items: [
      {
        defaults: {
          xtype: 'button'
        },
        layout: {
          type: 'hbox',
          pack: 'start'
        },
        items: [
          {
            hidden: true,
            itemId: 'btnBack',
            text: 'Back',
            handler: 'on.create.back'
          }, {
            hidden: false,
            itemId: 'btnNext',
            text: 'Next',
            handler: 'on.create.next'
          }, {
            hidden: true,
            itemId: 'btnStart',
            text: 'Create',
            handler: 'on.create.start'
          }
        ]
      }, {
        itemId: 'stepBar',
        flex: 1,
        layout: {
          type: 'hbox',
          pack: 'end',
          align: 'end'
        },
        defaults: {
          border: false,
          xtype: 'component',
          cls: 'ui step',
          tpl: ['<i class="icon {icon}"></i> {label}'],
          setIsActive: function(active) {
            return this.el[active ? 'addCls' : 'removeCls']('active');
          }
        },
        cls: 'ui small steps no-pointing',
        items: [
          {
            bind: {
              data: {
                bindTo: '{steps.hostname}',
                deep: true
              },
              isActive: {
                bindTo: '{steps.hostname.active}',
                deep: true
              }
            },
            popup: {
              title: sprintf('<i class="icon red asterisk"></i> %s', 'Hostname [REQUIRED]'),
              content: 'You must to enter hostname.'
            }
          }, {
            bind: {
              data: {
                bindTo: '{steps.size}',
                deep: true
              },
              isActive: {
                bindTo: '{steps.size.active}',
                deep: true
              }
            },
            popup: {
              title: sprintf('<i class="icon red asterisk"></i> %s', 'Size [REQUIRED]'),
              content: 'You must to enter size.'
            }
          }, {
            bind: {
              data: {
                bindTo: '{steps.image}',
                deep: true
              },
              isActive: {
                bindTo: '{steps.image.active}',
                deep: true
              }
            },
            popup: {
              title: sprintf('<i class="icon red asterisk"></i> %s', 'Image [REQUIRED]'),
              content: 'You must to enter image.'
            }
          }, {
            bind: {
              data: {
                bindTo: '{steps.feature}',
                deep: true
              },
              isActive: {
                bindTo: '{steps.feature.active}',
                deep: true
              }
            },
            popup: {
              title: 'Size [OPTIONAL]',
              content: 'Recommend you to set Enable VirtIO to your server performance.'
            }
          }
        ]
      }
    ]
  }
});
