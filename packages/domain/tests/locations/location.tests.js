describe("Donations.Location", function () {

  beforeEach(function () {
    this.locationId = new Guid();
    this.data = {
      name: 'MyLocation',
      organizationId: new Guid(),
      address: new Donations.Address({
        country: new Country('AT'),
        zip: '123',
        city: 'MyCity',
        street: 'My Street 1'
      }),
      contact: new Donations.Contact({
        name: 'Dominik Guzei',
        email: new EmailAddress('dominik@example.com'),
        phone: '+43 4493 454'
      })
    };
  });

  describe("adding a location to an organization", function () {

    it("publishes a location added event", function () {
      Donations.domain.test(Donations.Location)
      .given()
      .when(
        new Donations.AddLocation(_.extend({}, this.data, {
          targetId: this.locationId
        }))
      )
      .expect([
        new Donations.LocationAdded(_.extend({}, this.data, {
          sourceId: this.locationId,
          timestamp: new Date(),
          version: 1
        }))
      ]);
    });

  });

});
