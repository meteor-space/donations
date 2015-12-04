Space.flux.BlazeComponent.extend(Donations, 'OrgAdminPageLink', {

  dependencies: {
    usersStore: 'Space.accountsUi.UsersStore',
    orgsStore: 'Donations.OrgsStore'
  },

  isLoggedIn() {
    return this.usersStore.isLoggedIn();
  },

  events() {
    return [{
      'click .org-admin-link'(event) {
        event.preventDefault();
        this.publish(new Donations.RouteRequested({
          routeName: 'orgAdmin',
          params: { id: this.orgsStore.adminOrg()._id }
        }));
      }
    }];
  }
});

Donations.OrgAdminPageLink.register('org_admin_page_link');
