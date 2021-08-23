/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TimeAgoPipe } from './time-ago.pipe';

describe('Pipe: TimeAgo', () => {
  it('Create an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('If date of creation is just right now it should return Just now.', () => {
    const pipe = new TimeAgoPipe();

    const result = pipe.transform(new Date());
    expect(result).toBe('Just now');
  });

  it('If date of creation is one day before it should return 1 day ago.', () => {
    const pipe = new TimeAgoPipe();
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const result = pipe.transform(date);
    expect(result).toBe('1 day ago');
  });

  it('If date of creation is three day before it should return 3 days ago.', () => {
    const pipe = new TimeAgoPipe();
    const date = new Date();
    date.setDate(date.getDate() - 3);
    const result = pipe.transform(date);
    expect(result).toBe('3 days ago');
  });

  it('Return value if there is not indicated value to pipe.', () => {
    const pipe = new TimeAgoPipe();
    const result = pipe.transform(undefined);
    expect(result).toBe(undefined);
  });

});
