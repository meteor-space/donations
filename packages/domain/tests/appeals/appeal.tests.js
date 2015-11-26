describe(`Donations.Appeal`, function() {

  beforeEach(function() {

    // ========== TEST DATA ============
    this.appealId = new Guid();
    this.appealData = {
      title: `My Appeal for item X`,
      requiredQuantity: new Quantity(10),
      organizationId: new Guid(),
      locationId: new Guid(),
      description: `My description for this appeal`
    };
    this.pledgeData = {
      id: new Guid(),
      donor: new Donations.Contact({
        name: `Dominik Guzei`,
        email: new EmailAddress(`dominik@example.com`),
        phone: `+43 4493 454`
      }),
      quantity: new Quantity(1)
    };

  });

  let openAppeal = function () {
    return [
      new Donations.AppealMade(_.extend({}, this.appealData, {
        sourceId: this.appealId,
        version: 1
      }))
    ];
  };

  let fulfilledAppeal = function () {
    return [
      new Donations.AppealMade(_.extend({}, this.appealData, {
        sourceId: this.appealId,
        version: 1
      })),
      new Donations.AppealFulfilled(_.extend({}, this.appealData, {
        sourceId: this.appealId,
        version: 2
      }))
    ];
  };

  let closedAppeal = function () {
    return [
      new Donations.AppealMade(_.extend({}, this.appealData, {
        sourceId: this.appealId,
        version: 1
      })),
      new Donations.AppealClosed(_.extend({}, this.appealData, {
        sourceId: this.appealId,
        version: 2
      }))
    ];
  };

  let appealWithPledgeMade = function () {
    return [
      new Donations.AppealMade(_.extend({}, this.appealData, {
        sourceId: this.appealId,
        version: 1
      })),
      new Donations.PledgeMade(_.extend({}, this.pledgeData, {
        sourceId: this.appealId,
        version: 2
      }))
    ];
  };

  let appealWithAcceptedPledge = function () {
    return [
      new Donations.AppealMade(_.extend({}, this.appealData, {
        sourceId: this.appealId,
        version: 1
      })),
      new Donations.PledgeMade(_.extend({}, this.pledgeData, {
        sourceId: this.appealId,
        version: 2
      })),
      new Donations.PledgeAccepted(_.extend({}, this.pledgeData, {
        sourceId: this.appealId,
        version: 3
      }))
    ];
  };

  let appealWithFulfilledPledge = function () {
    return [
      new Donations.AppealMade(_.extend({}, this.appealData, {
        sourceId: this.appealId,
        version: 1
      })),
      new Donations.PledgeMade(_.extend({}, this.pledgeData, {
        sourceId: this.appealId,
        version: 2
      })),
      new Donations.PledgeAccepted(_.extend({}, this.pledgeData, {
        sourceId: this.appealId,
        version: 3
      })),
      new Donations.PledgeFulfilled(_.extend({}, this.pledgeData, {
        sourceId: this.appealId,
        version: 4
      }))
    ];
  };

  describe(`making an appeal`, function () {

    it(`publishes an appeal added event`, function () {

      Donations.domain.test(Donations.Appeal)
        .given()
        .when([
          new Donations.MakeAppeal(_.extend({}, this.appealData, {
            targetId: this.appealId
          }))
        ])
        .expect([
          new Donations.AppealMade(_.extend({}, this.appealData, {
            sourceId: this.appealId,
            version: 1
          }))
        ]);

    });

  });

  describe(`making pledges`, function () {

    it(`publishes a pledge made event`, function () {

      Donations.domain.test(Donations.Appeal)
        .given(openAppeal.call(this))
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
          }))
        )
        .expect([
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            version: 2,
          }))
        ]);

    });

    it(`publishes appeal fulfilled event in addition when pledged quantity equals the required quantity`, function () {

      let pledgeQuantity = this.appealData.requiredQuantity;

      Donations.domain.test(Donations.Appeal)
        .given(openAppeal.call(this))
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
            quantity: pledgeQuantity
          }))
        )
        .expect([
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            version: 2,
            quantity: pledgeQuantity
          })),
          new Donations.AppealFulfilled(_.extend({}, this.appealData, {
            sourceId: this.appealId,
            version: 2
          }))
        ]);

    });

    it(`caps new pledge quantity at the appeal's required quantity`, function () {

      let pledgeQuantity = this.appealData.requiredQuantity.add(1);

      Donations.domain.test(Donations.Appeal)
        .given(openAppeal.call(this))
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
            quantity: pledgeQuantity
          }))
        )
        .expect([
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            version: 2,
            quantity: this.appealData.requiredQuantity
          })),
          new Donations.AppealFulfilled(_.extend({}, this.appealData, {
            sourceId: this.appealId,
            version: 2
          }))
        ]);

    });

    it(`only allows new pledges if appeal is open`, function () {

      Donations.domain.test(Donations.Appeal)
        .given(fulfilledAppeal.call(this))
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
          }))
        )
        .expectToFailWith(new Donations.AppealNotOpenForNewPledges());

      Donations.domain.test(Donations.Appeal)
        .given(closedAppeal.call(this))
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
          }))
        )
        .expectToFailWith(new Donations.AppealNotOpenForNewPledges());

    });

  });

  describe(`managing pledges`, function() {

    describe(`accepting a pledge`, function() {

      it("publishes pledge accepted event", function () {

        Donations.domain.test(Donations.Appeal)
          .given(appealWithPledgeMade.call(this))
          .when([
            new Donations.AcceptPledge({
              targetId: this.appealId,
              id: this.pledgeData.id
            })
          ])
          .expect([
            new Donations.PledgeAccepted(_.extend({}, this.pledgeData, {
              sourceId: this.appealId,
              version: 2
            }))
          ]);

      });

      it(`cannot be accepted if appeal has been fulfilled`, function () {

        Donations.domain.test(Donations.Appeal)
          .given(fulfilledAppeal.call(this))
          .when([
            new Donations.AcceptPledge({
              targetId: this.appealId,
              id: this.pledgeData.id
            })
          ])
          .expectToFailWith(new Donations.AppealNotOpenToAcceptPledge());

      });

    });

    describe(`fulfilling a pledge`, function() {

      it("publishes a pledge fulfilled event", function() {

        Donations.domain.test(Donations.Appeal)
        .given(appealWithAcceptedPledge.call(this))
        .when([
          new Donations.FulfillPledge({
            targetId: this.appealId,
            id: this.pledgeData.id
          })
        ])
        .expect([
          new Donations.PledgeFulfilled(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            version: 2
          }))
        ]);

      });

      it(`cannot be fulfilled if not accepted`, function() {

        Donations.domain.test(Donations.Appeal)
        .given(appealWithPledgeMade.call(this))
        .when([
          new Donations.FulfillPledge({
            targetId: this.appealId,
            id: this.pledgeData.id
          })
        ])
        .expectToFailWith(new Donations.PledgeHasToBeAcceptedBeforeFulfilled());
      });

    });

    describe(`declining a pledge`, function() {

      it("publishes pledge declined event", function() {

        Donations.domain.test(Donations.Appeal)
          .given(appealWithPledgeMade.call(this))
          .when([
            new Donations.DeclinePledge({
              targetId: this.appealId,
              id: this.pledgeData.id
            })
          ])
          .expect([
            new Donations.PledgeDeclined(_.extend({}, this.pledgeData, {
              sourceId: this.appealId,
              version: 2
            }))
          ]);

      });

      it(`cannot decline if already fulfilled`, function() {

        Donations.domain.test(Donations.Appeal)
          .given(appealWithFulfilledPledge.call(this))
          .when([
            new Donations.DeclinePledge({
              targetId: this.appealId,
              id: this.pledgeData.id
            })
          ])
          .expectToFailWith(new Donations.PledgeCannotBeDeclinedIfFulfilled());

      });

    });
  });

  describe(`closing an appeal`, function () {

    it(`closes an open appeal when commanded`, function () {

      Donations.domain.test(Donations.Appeal)
        .given(openAppeal.call(this))
        .when(
          new Donations.CloseAppeal({
            targetId: this.appealId
          })
        )
        .expect([
          new Donations.AppealClosed(_.extend({}, this.appealData, {
            sourceId: this.appealId,
            version: 2,
          }))
        ]);

    });

    it(`throws an error if commanded to close a fulfilled or presently closed appeal`, function () {

      Donations.domain.test(Donations.Appeal)
        .given(fulfilledAppeal.call(this))
        .when(
          new Donations.CloseAppeal({
            targetId: this.appealId
          })
        )
        .expectToFailWith(new Donations.FulfilledAppealCannotBeClosed());

      Donations.domain.test(Donations.Appeal)
        .given(closedAppeal.call(this))
        .when(
          new Donations.CloseAppeal({
            targetId: this.appealId
          })
        )
        .expectToFailWith(new Donations.FulfilledAppealCannotBeClosed());

    });

  });

});
