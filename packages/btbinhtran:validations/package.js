Package.describe({
  name: 'btbinhtran:validations',
  summary: 'Validates values',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.1');
  api.addFiles('validations.js');
  
  if (api.export) {
    api.export('Val');
  }
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('btbinhtran:validations');
  api.addFiles('validations-tests.js');
});
