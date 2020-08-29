import httpContext from 'express-http-context';

export default class CurrentUser {

  async execute(context: Record<string, any>) {
    const currentUser = httpContext.get('currentUser');
    return { ...context, currentUser };
  }

}
