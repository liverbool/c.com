Ext.define('Ext.extend.data.field.Domain', {
  extend: 'Ext.data.field.Field',
  alias: 'data.field.domain',
  validators: {
    type: 'format',
    matcher: /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/
  }
});
