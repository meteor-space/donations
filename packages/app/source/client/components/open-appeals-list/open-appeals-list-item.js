Space.flux.BlazeComponent.extend(Donations, 'OpenAppealsListItem', {

  dependencies: {
    orgsStore: 'Donations.OrgsStore'
  },

  org() {
    return this.orgsStore.findOrg(this.data().organizationId);
  },

  location() {
    let orgId = this.data().organizationId;
    let locationId = this.data().locationId;
    return this.orgsStore.findLocation(orgId, locationId);
  }

});

Donations.OpenAppealsListItem.register('open_appeals_list_item');
