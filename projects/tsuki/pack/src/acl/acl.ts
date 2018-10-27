export interface AclType {
  role?: string[];
  mode?: 'allOf' | 'oneOf';

  [key: string]: any;
}

export type AclRole = string | string[] | AclType;
