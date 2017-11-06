import { TestBed, inject } from '@angular/core/testing';

import { AuthCookieHandlerService } from './auth-cookie-handler.service';

describe('AuthCookieHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCookieHandlerService]
    });
  });

  it('should be created', inject([AuthCookieHandlerService], (service: AuthCookieHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
