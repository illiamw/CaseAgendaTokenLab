/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InviteNotifyEventComponent } from './invite-notify-event.component';

describe('InviteNotifyEventComponent', () => {
  let component: InviteNotifyEventComponent;
  let fixture: ComponentFixture<InviteNotifyEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteNotifyEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteNotifyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
