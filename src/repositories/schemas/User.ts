export type UserSchema = {
  firstName: string;
  lastName: string;
  company: string;
  permissions: string[];
  phone: string;
  email: string;
  password: string;
  status: 'activated' | 'deactivated' | 'invited';
}
