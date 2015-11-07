describe("Donations.Appeal", function () {

  beforeEach(function () {
    this.appealId = new Guid();
    this.data = {
      title: 'My Appeal for item X',
      requiredQuantity: new Quantity(10),
      organizationId: new Guid(),
      locationId: new Guid(),
      description: 'My description for this appeal'
    };
  });

  describe("adding an appeal to a org location", function () {

    it("publishes an appeal added event", function () {
      Donations.domain.test(Donations.Appeal)
      .given()
      .when(
        new Donations.MakeAppeal(_.extend({}, this.data, {
          targetId: this.appealId
        }))
      )
      .expect([
        new Donations.AppealMade(_.extend({}, this.data, {
          sourceId: this.appealId,
          timestamp: new Date(),
          version: 1
        }))
      ]);
    });

  });

});
