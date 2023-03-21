import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  /**
   * Method to search the item from table
   */
  public transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.title.toLowerCase().includes(searchText);
    });
   }
}