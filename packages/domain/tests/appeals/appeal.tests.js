describe(`Donations.Appeal`, function() {

  beforeEach(function() {

    // ========== TEST DATA ============
    this.appealId = new Guid();
    this.pledgeId = new Guid();
    this.appealData = {
      title: `My Appeal for item X`,
      requiredQuantity: new Quantity(10),
      organizationId: new Guid(),
      locationId: new Guid(),
      description: `My description for this appeal`
    };
    this.pledgeData = {
      pledgeId: this.pledgeId,
      donor: new Donations.Contact({
        name: `Dominik Guzei`,
        email: new EmailAddress(`dominik@example.com`),
        phone: `+43 4493 454`
      })
    };

  });

  describe(`adding an appeal to a org location`, function() {

    it(`publishes an appeal added event`, function() {

      Donations.domain.test(Donations.Appeal)
      .given()
      .when(
        new Donations.MakeAppeal(_.extend({}, this.appealData, {
          targetId: this.appealId
        }))
      )
      .expect([
        new Donations.AppealMade(_.extend({}, this.appealData, {
          sourceId: this.appealId,
          version: 1
        }))
      ]);

    });

  });

  describe(`making pledges for an appeal`, function() {

    describe(`Scenario: partially fulfilling an appeal`, function() {

      it(`publishes events about the pledge made`, function() {

        Donations.domain.test(Donations.Appeal)
        .given([
          new Donations.AppealMade(_.extend({}, this.appealData, {
            sourceId: this.appealId,
            version: 1
          }))
        ])
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
            quantity: new Quantity(1)
          }))
        )
        .expect([
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            version: 2,
            quantity: new Quantity(1)
          }))
        ]);

      });

    });

    describe(`Scenario: fulfilling an appeal`, function() {

      let appealMade = function() {
        return new Donations.AppealMade(_.extend({}, this.appealData, {
          sourceId: this.appealId,
          version: 1
        }));
      };

      it(`publishes events about the pledge and fulfilled appeal`, function() {

        Donations.domain.test(Donations.Appeal)
        .given([appealMade.call(this)])
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
            quantity: this.appealData.requiredQuantity
          }))
        )
        .expect([
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            version: 2,
            quantity: this.appealData.requiredQuantity
          })),
          new Donations.AppealFulfilled({
            sourceId: this.appealId,
            version: 2
          })
        ]);

      });

      it(`does not allow additional pledges after fulfillment`, function() {

        Donations.domain.test(Donations.Appeal)
        .given([
          appealMade.call(this),
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            version: 2,
            quantity: this.appealData.requiredQuantity
          })),
          new Donations.AppealFulfilled({
            sourceId: this.appealId,
            version: 2
          })
        ])
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
            quantity: new Quantity(1)
          }))
        )
        .expectToFailWith(new Donations.AppealIsAlreadyFulfilledError());

      });

      it(`caps the pledges quantity at the appeals required quantity`, function() {

        Donations.domain.test(Donations.Appeal)
        .given([appealMade.call(this)])
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
            quantity: this.appealData.requiredQuantity.add(1)
          }))
        )
        .expect([
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            version: 2,
            quantity: this.appealData.requiredQuantity
          })),
          new Donations.AppealFulfilled({
            sourceId: this.appealId,
            version: 2
          })
        ]);

      });

    });
  });

  describe("managing pledges of an appeal", function() {

    let appealWithPledge = function() {
      return [
        new Donations.AppealMade(_.extend({}, this.appealData, {
          sourceId: this.appealId,
          version: 1
        })),
        new Donations.PledgeMade(_.extend({}, this.pledgeData, {
          sourceId: this.appealId,
          version: 2,
          quantity: new Quantity(1)
        }))
      ];
    };

    describe("fulfilling a pledge", function() {

      it("publishes the correct event", function() {
        Donations.domain.test(Donations.Appeal)
        .given(appealWithPledge.call(this))
        .when([
          new Donations.MarkPledgeAsFulfilled({
            targetId: this.appealId,
            pledgeId: this.pledgeId
          })
        ])
        .expect([
          new Donations.PledgeFulfilled({
            sourceId: this.appealId,
            pledgeId: this.pledgeId,
            version: 2
          })
        ]);
      });
    });
  });
});
