import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string, regexValue: string, replaceValue: string): any {
    let regex = new RegExp(regexValue, 'g');
    return value.replace(regex, replaceValue);
  }

}

/* Exemplos de Uso
<p> {{stringText | replace:' ':'--'}}</p>
<p> {{stringText | replace:'[a-z]':'--'}}</p>
<p> {{stringText | replace:'[A-Z]':'--'}}</p>
<p> {{stringText | replace:'[a-zA-z]?':'**'}}</p>
*/