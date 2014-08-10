Ext.define('Magice.Cloud.view.server.form.CreateProcess', {
  extend: 'Ext.panel.Panel',
  xtype: 'creator-process',
  locale: {
    create: {
      header: 'Sending your request ...'
    },
    processing: {
      header: 'Creating your server ...'
    },
    success: {
      header: 'Congratulations!',
      message: 'Your server now available. Please check your registred email for login detail.'
    },
    failure: {
      header: 'Oops!',
      message: 'Your have some error due to creating process. Please try again later.'
    },
    warning: {
      header: 'Notice!',
      message: 'Something broken during send back the response. Please wait in 2-3 minutes and try to check your email for confirm that your server has been created.'
    }
  },
  bind: {
    data: {
      bindTo: '{operation}',
      deep: true
    }
  },
  initComponent: function() {
    this.tpl = ['<div>', '<tpl if="create">', '<i class="icon loading"></i> ' + this.locale.create.header, '</tpl>', '<tpl if="processing">', '<h2 class="ui header">' + this.locale.processing.header + '</h2>', '<div class="ui active striped red progress">', '<div class="bar" style="width: {percentage}%;"></div>', '</div>', '</tpl>', '<tpl if="success">', '<div class="ui icon success message">', '<i class="checkmark icon"></i>', '<div class="content">', '<div class="header">' + this.locale.success.header + '</div>', this.locale.success.message, '</div>', '</div>', '</tpl>', '<tpl if="error">', '<div class="ui icon error message">', '<i class="attention icon"></i>', '<div class="content">', '<div class="header">' + this.locale.failure.header + '</div>', this.locale.failure.message, '</div>', '</div>', '</tpl>', '<tpl if="warning">', '<div class="ui icon warning message">', '<i class="warning icon"></i>', '<div class="content">', '<div class="header">' + this.locale.warning.header + '</div>', this.locale.warning.message, '</div>', '</div>', '</tpl>', '</div>'];
    return this.callParent(arguments);
  }
});
