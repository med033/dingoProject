import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(ch: string): string {
  let ch2:any ="";  
// for (let i = ch.length; i >= 0 ; i--) {
//  ch2 = ch2 + ch[i];
// }

for (let i = 0; i < ch.length; i++) {
ch2 = ch[i] + ch2;
  
}
  
    return ch2;
  }

}
