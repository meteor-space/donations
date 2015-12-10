Space.eventSourcing.Projection.extend(Donations, 'AppealsProjection', {

  collections: {
    appeals: 'Donations.Appeals'
  },

  eventSubscriptions() {
    return [{
      'Donations.AppealDrafted': this._onAppealDrafted,
      'Donations.AppealDraftUpdated': this._onAppealDraftUpdated,
      'Donations.AppealMade': this._onAppealMade,
      'Donations.AppealUpdated': this._onAppealUpdated,
      'Donations.PledgeMade': this._onPledgeMade,
      'Donations.AppealFulfilled': this._onAppealFulfilled
    }];
  },

  _onAppealDrafted(event) {
    this.appeals.insert(_.extend({}, this._extractAppealDetails(event), {
      _id: event.sourceId.toString(),
      organizationId: event.organizationId.toString(),
      locationId: event.locationId.toString(),
      state: 'draft',
      pledgedQuantity: 0,
      pledges: []
    }));
  },

  _onAppealDraftUpdated(event) {
    this.appeals.update(event.sourceId.toString(), {
      $set: this._extractAppealDetails(event)
    });
  },

  _onAppealMade(event) {
    this.appeals.update(event.sourceId.toString(), {
      $set: { state: 'open' }
    });
  },

  _onAppealUpdated(event) {
    this.appeals.update(event.sourceId.toString(), {
      $set: { title: event.title, description: event.description }
    });
  },

  _extractAppealDetails(event) {
    return {
      title: event.title,
      requiredQuantity: event.requiredQuantity.value,
      description: event.description
    };
  },

  _onPledgeMade(event) {
    let quantity = event.quantity.value;
    this.appeals.update(event.sourceId.toString(), {
      $inc: {
        pledgedQuantity: quantity,
        requiredQuantity: -1 * quantity
      },
      $push: {
        pledges: {
          id: event.id,
          donor: {
            name: event.donor.name,
            email: event.donor.email.toString(),
            phone: event.donor.phone
          },
          quantity: event.quantity.toString()
        }
      }
    });
  },

  _onAppealFulfilled(event) {
    this.appeals.update(event.sourceId.toString(), {
      $set: { state: 'fulfilled' }
    });
  }

});
