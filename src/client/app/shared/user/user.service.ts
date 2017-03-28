import {Injectable} from '@angular/core';
import {User} from './user';
import {USERS} from './mock-users';
import {EncryptionService} from '../encryption/encryption.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Response} from '@angular/http';
import {Observable} from "rxjs";

export const DAYS_UNTIL_SESSION_EXPIRATION = 7;

@Injectable()
export class UserService {
  static activeUser: User;

  /**
   * On login, the active user sessionId is encrypted and stored in the cookies.
   * @param sessionToken
   */
  setActiveUserSession(sessionToken: string): void {
    let encryptedToken = EncryptionService.encrypt(
      EncryptionService.encode(sessionToken)
    );
    Cookie.set('sessionToken', encryptedToken, DAYS_UNTIL_SESSION_EXPIRATION);
  }

  getActiveUser(): Promise<User> {
    let encryptedToken = Cookie.get('sessionToken');
    if (!encryptedToken) {
      // Expired token returns null active user
      return Promise.resolve(null);
    }
    // Decrypt session token
    let sessionToken = EncryptionService.decode(
      EncryptionService.decrypt(encryptedToken)
    );
    // Return the current active user if there's already one loaded,
    // otherwise load the active user, set it, and return it
    return new Promise(resolve => {
      if (UserService.activeUser) {
        resolve(UserService.activeUser);
      } else {
        this.getUser(1).then(user => {
          UserService.activeUser = user;
          resolve(UserService.activeUser);
        });
      }
    });
  }

  getUser(userId: number): Promise<User> {
    // TODO: Replace with HTTP request
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(USERS.find(user => user.userId === userId));
      }, 1000);
    });
  }

  getUserByEmail(email: string): Promise<User> {
    return http.;

  }

  getUsers(): Promise<User[]> {
    // TODO: Replace with HTTP request
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(USERS);
      }, 1000);
    });
  }

  getUserPreferences(userId: number): Promise<any> {
    // TODO: Currently just getting drag positions
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(localStorage.getItem('dragPositions'));
      }, 1000);
    });
  }

  setUserPreferences(userId: number, prefs: any): Promise<boolean> {
    // TODO: Replace with HTTP request
    localStorage.setItem('dragPositions', JSON.stringify(prefs));
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  deleteUser(userId: number): Promise<boolean> {
    // TODO: Replace with HTTP request
    console.log('deleteUser(' + userId + ') --> success');
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  giveAdminPrivileges(userId: number): Promise<boolean> {
    // TODO: Replace with HTTP request
    console.log('giveAdminPrivileges(' + userId + ') --> success');
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  revokeAdminPrivileges(userId: number): Promise<boolean> {
    // TODO: Replace with HTTP request
    // TODO: Make sure it's not the only admin removing his own privileges
    console.log('revokeAdminPrivileges(' + userId + ') --> success');
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body.data);
    return body.data || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }
}
