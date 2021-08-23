import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectionPipe'
})
export class SelectionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'angular':
        return 'Angular';
    
      case 'reactjs':
        return 'React';

      case 'vuejs':
        return 'Vuejs';
      default:
        return 'Select your news';
    }
  }

}
