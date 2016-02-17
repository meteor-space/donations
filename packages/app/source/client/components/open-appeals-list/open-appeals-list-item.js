Space.ui.BlazeComponent.extend('Donations.OpenAppealsListItem', {

  onRendered() {
    this._root = this.$(this.firstNode());
    this._cardReveal = this.$('.card-reveal');
    this._rootHeight = this._root.outerHeight();
    this._cardRevealHeight = this._cardReveal.outerHeight();
    // Set calculated heights
    this._setCssHeight(this._root, this._rootHeight);
    this._setCssHeight(this._cardReveal, this._cardRevealHeight);
  },

  events() {
    return [{
      'click .activator'() {
        // Set height of item to the computed height of pledge form.
        this._setCssHeight(this._root, this._cardRevealHeight);
      },
      'click .card-title .close'() {
        // Reset root to original height
        this._setCssHeight(this._root, this._rootHeight);
      },
      'pledgeMade .make-pledge-form'() {
        // Close the pledge form
        this.$('.card-title .close').click();
      }
    }];
  },

  _setCssHeight(element, height) {
    element.css('height', `${height}px`);
  }

});

Donations.OpenAppealsListItem.register('open_appeals_list_item');
