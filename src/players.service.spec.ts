import { TestBed, inject } from '@angular/core/testing';
 import {PlayersService} from './app/services/players.service';
import { Services } from '@angular/core/src/view';

describe('PlayersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayersService]
    });
  });

  it('should be created', inject([PlayersService], (service: PlayersService) => {
    expect(service).toBeTruthy();
  }));
});
