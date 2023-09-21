import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.scss']
})
export class PlaceAutocompleteComponent implements OnInit {
  
  @ViewChild('inputField') inputField!: ElementRef;

  @Input() placeholder = '';
  @Output() placeChanged = new  EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;


  constructor(private ngZone: NgZone) { }

  ngOnInit():void {}

  ngAfterViewInit():void {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);

    this.autocomplete.addListener('place_changed', ()=> {
      const place = this.autocomplete?.getPlace();
      const result: PlaceSearchResult = {
        address: this.inputField.nativeElement.value,
        name: place?.name,
        location: place?.geometry?.location,
        iconUrl: place?.icon,
        imageUrl: this.getPhotoUrl(place),
      }

      this.ngZone.run (()=> {
        this.placeChanged.emit(result);
      });
    })
  }

  getPhotoUrl(place: google.maps.places.PlaceResult | undefined):string {
    return place?.photos && place?.photos.length > 0 ? place?.photos?.[0]?.getUrl({maxWidth: 500}) : '';
  }

}

export interface PlaceSearchResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}
