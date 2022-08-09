/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DevOpsTesteService } from './dev-ops-teste.service';

describe('Service: DevOpsTeste', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevOpsTesteService]
    });
  });

  it('should ...', inject([DevOpsTesteService], (service: DevOpsTesteService) => {
    expect(service).toBeTruthy();
  }));
});
