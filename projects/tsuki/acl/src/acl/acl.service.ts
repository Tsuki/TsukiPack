import {Injectable} from '@angular/core';
import {AclRole, AclType} from './acl';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AclService {

  constructor() {
  }

  get data() {
    return {
      all: this.all,
      roles: this.roles,
    };
  }

  private roles: string[] = [];
  private all = false;
  private aclChange: BehaviorSubject<AclType | boolean> = new BehaviorSubject<AclType | boolean>(null);

  static parseACLRole(val: string | string[] | AclType): AclType {
    if (val instanceof String) {
      return {role: [val]};
    } else if (Array.isArray(val)) {
      return {role: val};
    } else {
      return val;
    }
  }

  setFull(val: boolean) {
    this.all = val;
    this.aclChange.next(val);
  }

  setRole(roles: string | string[]) {
    if (Array.isArray(roles)) {
      this.set(<AclType>{role: roles});
    } else {
      this.set(<AclType>{role: [roles]});
    }
  }

  set(value: AclType) {
    this.roles = [];
    this.add(value);
    this.aclChange.next(value);
  }

  add(value: AclType) {
    if (value.role && value.role.length > 0) {
      this.roles.push(...value.role);
      this.roles = [...new Set(this.roles)];
    }
  }

  attachRole(roles: string[]) {
    this.roles.push(...roles);
    this.roles = [...new Set(this.roles)];
    this.aclChange.next(this.data);
  }

  can(roleOrAbility: AclRole): boolean {
    if (this.all === true || !roleOrAbility) {
      return true;
    }
    const t: AclType = AclService.parseACLRole(roleOrAbility);

    if (t.mode === 'allOf') {
      return t.role.every(v => this.roles.includes(v));
    } else {
      return t.role.some(v => this.roles.includes(v));
    }
  }

}
