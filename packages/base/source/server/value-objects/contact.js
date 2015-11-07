Space.messaging.Serializable.extend(Donations, 'Contact', {
  // EJSON serializable fields
  fields: function() {
    return {
      name: String,
      email: EmailAddress,
      phone: String
    };
  }
});

// Register as EJSON type
Donations.Contact.type('Donations.Contact');
