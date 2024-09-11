import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText',
  standalone: true
})
export class TrimTextPipe implements PipeTransform {

  transform(value: string, limit:number ): string{
    return value.split(' ', limit).join(' ');
  }

}
