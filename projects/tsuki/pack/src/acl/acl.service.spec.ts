import {TestBed} from '@angular/core/testing';

import {AclService} from './acl.service';

describe('AclService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', async () => {
    const service: AclService = TestBed.get(AclService);
    await expect(service).toBeTruthy();
  });
  it('test parse string acl type', async () => {
    await expect(AclService.parseACLRole('test')).toEqual({role: ['test']});
  });
  it('test parse string array acl type', async () => {
    await expect(AclService.parseACLRole(['test'])).toEqual({role: ['test']});
  });
  it('test parse acl type', async () => {
    await expect(AclService.parseACLRole({role: ['test']})).toEqual({role: ['test']});
  });
});
