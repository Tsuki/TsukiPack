import {AclDirective} from './acl.directive';
import {TestBed} from '@angular/core/testing';
import {AclService} from './acl.service';

describe('AclDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create an instance', async () => {
    const service: AclService = TestBed.get(AclService);
    await expect(service).toBeTruthy();
  });
});
