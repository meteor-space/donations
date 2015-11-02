Space.messaging.Serializable.extend(Donations, 'Contact', {});

// EJSON serializable fields
Donations.Contact.fields = {
  name: String,
  email: EmailAddress,
  phone: String
};

// Register as EJSON type
Donations.Contact.type('Donations.Contact');
