Space.domain.ValueObject.extend(Donations, `Contact`, {
  // EJSON serializable fields
  fields() {
    return {
      name: String,
      email: EmailAddress,
      phone: String
    };
  }
});

// Register as EJSON type
Donations.Contact.type(`Donations.Contact`);
