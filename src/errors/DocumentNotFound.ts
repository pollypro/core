export default class DocumentNotFound extends Error {
  constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, DocumentNotFound.prototype);
  }
}
