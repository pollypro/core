export default class ValidationFailed extends Error {
  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, ValidationFailed.prototype);
  }
}
