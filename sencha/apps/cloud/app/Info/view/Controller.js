Ext.define('Magice.Info.view.Controller', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.info',
  locale: {
    invalidForm: {
      title: 'Error!',
      message: 'Please fullil the form.'
    }
  },
  getInfoRecord: function() {
    return this.getViewModel().get('infoData');
  },
  getFormSessionInfo: function() {
    return this.getWindowFormInfo().getSession();
  },
  showEditFormInfo: function() {
    return this.getWindowFormInfo().show();
  },
  getWindowFormInfo: function() {
    var win;
    win = this.lookupReference('info-form-window');
    if (!win) {
      win = Ext.create('Magice.Info.view.form.Info', {
        session: true,
        viewModel: {
          links: {
            record: this.getInfoRecord()
          },
          formulas: {
            gender: {
              get: function() {
                return {
                  gender: this.get('record').get('gender')
                };
              },
              set: function(gender) {
                return this.get('record').set(gender);
              }
            }
          }
        }
      });
      this.getView().add(win);
    }
    return win;
  },
  saveChange: function(btn) {
    var info, session;
    if (!this.getWindowFormInfo().getForm().isValid()) {
      Ext.Msg.error(this.locale.invalidForm);
      return;
    }
    info = this.getInfoRecord();
    session = this.getFormSessionInfo();
    console.warn('BUG: Gender in radiogroup now constraint bug see: http://www.sencha.com/forum/showthread.php?287770-How-to-bind-data-links-to-radiogroup');
    session.save();
    console.warn('BugFix: Constraint bug in this line see: http://www.sencha.com/forum/showthread.php?287763-Databinding-date-type-bug.');
    info.set('birthday', this.getWindowFormInfo().getFieldValue('birthday'));
    return info.save({
      form: this.getWindowFormInfo().getForm(),
      callback: function() {
        console.log(arguments);
        return console.log(session);
      }
    });
  },
  getFormSessionContact: function() {
    return this.getWindowFormContact().getSession();
  },
  showEditFormContact: function() {
    return this.getWindowFormContact().show();
  },
  getWindowFormContact: function() {
    var win;
    win = this.lookupReference('info-form-contact-window');
    if (!win) {
      win = Ext.create('Magice.Info.view.form.Contact', {
        session: true,
        viewModel: {
          links: {
            record: this.getInfoRecord()
          }
        }
      });
      this.getView().add(win);
    }
    return win;
  },
  saveContactChange: function(btn) {
    var info, session;
    if (!this.getWindowFormContact().getForm().isValid()) {
      Ext.Msg.error(this.locale.invalidForm);
      return;
    }
    info = this.getInfoRecord();
    session = this.getFormSessionContact();
    session.save();
    return info.save({
      form: this.getWindowFormInfo().getForm(),
      callback: function() {
        console.log(arguments);
        return console.log(session);
      }
    });
  }
});
