Migrations.add({
  version: 1449766484513,
  name: 'Rebuilds appeals projection to support the new admin pledge lists',
  up() {
    Donations.app.injector.get('Space.eventSourcing.ProjectionRebuilder')
    .replay({ projections: ['Donations.AppealsProjection']});
  }
});
