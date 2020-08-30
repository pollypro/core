export default class Unauthorized extends Error {
  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}
