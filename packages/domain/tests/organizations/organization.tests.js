describe(`Donations.Organization`, function() {

  beforeEach(function() {
    this.orgId = new Guid();
    this.orgData = {
      adminId: new Guid(),
      name: `MyOrg`,
      country: new Country(`AT`),
      contact: new Donations.Contact({
        name: `Dominik Guzei`,
        email: new EmailAddress(`dominik@example.com`),
        phone: `+43 4493 454`
      })
    };
    this.locationData = {
      locationId: new Guid(),
      name: `MyLocation`,
      address: new Donations.Address({
        country: new Country(`AT`),
        zip: `123`,
        city: `MyCity`,
        street: `My Street 1`
      }),
      openingHours: 'Open from 8am to 5pm'
    };
  });

  describe(`creating a new organization`, function() {

    it(`publishes a created event`, function() {
      Donations.domain.test(Donations.Organization).given()
      .when(
        new Donations.CreateOrganization(_.extend({}, this.orgData, {
          targetId: this.orgId
        }))
      )
      .expect([
        new Donations.OrganizationCreated(_.extend({}, this.orgData, {
          sourceId: this.orgId,
          version: 1,
          timestamp: Date
        }))
      ]);

    });
  });

  describe(`adding a location to an organization`, function() {

    it(`publishes a location added event`, function() {
      Donations.domain.test(Donations.Organization)
      .given([
        new Donations.OrganizationCreated(_.extend({}, this.orgData, {
          sourceId: this.orgId,
          version: 1,
          timestamp: Date
        }))
      ])
      .when(
        new Donations.AddLocation(_.extend({}, this.locationData, {
          targetId: this.orgId
        }))
      )
      .expect([
        new Donations.LocationAdded(_.extend({}, this.locationData, {
          sourceId: this.orgId,
          version: 2,
          timestamp: Date
        }))
      ]);
    });

  });

  describe(`update location details`, function() {

    it(`publishes a location details changed event`, function() {

      let updatedLocation = _.clone(this.locationData);
      updatedLocation.name = 'Changed Location Name';

      Donations.domain.test(Donations.Organization)
      .given([
        new Donations.OrganizationCreated(_.extend({}, this.orgData, {
          sourceId: this.orgId,
          version: 1,
          timestamp: Date
        })),
        new Donations.LocationAdded(_.extend({}, this.locationData, {
          sourceId: this.orgId,
          version: 2,
          timestamp: Date
        }))
      ])
      .when(
        new Donations.UpdateLocationDetails(_.extend({}, updatedLocation, {
          targetId: this.orgId
        }))
      )
      .expect([
        new Donations.LocationDetailsChanged(_.extend({}, updatedLocation, {
          sourceId: this.orgId,
          version: 2,
          timestamp: Date
        }))
      ]);
    });

  });
});
