import { Component, Input } from '@angular/core';
import { PlaceSearchResult } from '../place-autocomplete/place-autocomplete.component';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.scss']
})
export class PlaceDetailsComponent {

  @Input() data: PlaceSearchResult | undefined;

  constructor() { }

}
