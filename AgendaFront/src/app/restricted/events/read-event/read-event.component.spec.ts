/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReadEventComponent } from './read-event.component';

describe('ReadEventComponent', () => {
  let component: ReadEventComponent;
  let fixture: ComponentFixture<ReadEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
