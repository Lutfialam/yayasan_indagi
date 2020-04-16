"use strict";

const InvalidAccessException = use("App/Exceptions/InvalidAccessException");

class Admin {
  async handle({ request, auth }, next) {
    
    const user = await auth.getUser();

    if (!user.level || user.level != "admin")
      throw new InvalidAccessException();

    await next();
  }
}

module.exports = Admin;