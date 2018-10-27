import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {AclRole} from './acl';
import {AclService} from './acl.service';

@Directive({
  selector: '[tpAcl]'
})
export class AclDirective {
  private value: AclRole;

  @Input('tpAcl')
  set acl(value: AclRole) {
    this.set(value);
  }

  private set(value: AclRole) {
    const el = this.el.nativeElement;
    if (this.aclSrv.can(value)) {
      this.renderer.removeStyle(el.nativeElement, 'display');
    } else {
      this.renderer.setStyle(el.nativeElement, 'display', 'none');
    }
    this.value = value;
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private aclSrv: AclService,
  ) {
  }

}
