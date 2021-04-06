import auth from '@/lib/auth';
import db from '@/lib/db';

export function signupWithEmail(username) {
  auth.signupWithEmail();
  if (isValid(username) && isAvailable(username)) {
    db.createUsername();
  }
}
