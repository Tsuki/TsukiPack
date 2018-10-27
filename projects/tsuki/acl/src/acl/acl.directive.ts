import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {AclRole} from './acl';
import {AclService} from './acl.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[tpAcl]'
})
export class AclDirective {
  private value: AclRole;
  private change$: Subscription;

  @Input('tpAcl')
  set acl(value: AclRole) {
    this.set(value);
  }

  private set(value: AclRole) {
    const el = this.el.nativeElement;
    if (this.aclSrv.can(value)) {
      this.renderer.removeStyle(el, 'display');
    } else {
      this.renderer.setStyle(el, 'display', 'none');
    }
    this.value = value;
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private aclSrv: AclService,
  ) {
    this.change$ = this.aclSrv.change.subscribe(() => this.set(this.value));
  }

}
