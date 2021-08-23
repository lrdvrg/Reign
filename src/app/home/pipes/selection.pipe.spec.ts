/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { SelectionPipe } from './selection.pipe';

describe('Pipe: SelectionPipee', () => {
  it('Create an instance', () => {
    let pipe = new SelectionPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should return correct result.', () => {
    const pipe = new SelectionPipe();
    let result = pipe.transform('angular');
    expect(result).toBe('Angular');

    result = pipe.transform('reactjs');
    expect(result).toBe('React');

    result = pipe.transform('vuejs');
    expect(result).toBe('Vuejs');

    result = pipe.transform('');
    expect(result).toBe('Select your news');
  });

});
