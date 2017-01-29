import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  loaded = false;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    Geolocation.getCurrentPosition().then((position) => {

      this.loaded = true;
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let service = new google.maps.places.PlacesService(this.map);
      // TODO move radius to Settings
      service.nearbySearch({
        location: latLng,
        radius: 500,
        type: ['restaurant']
      },(results, status) => {this.placesCallback(results, status)});
    }, (err) => {
      console.log(err);
    });
  }

  createMarker(place){
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });

    // TODO display popup info / make click interactive
    google.maps.event.addListener(marker, 'click', function() {
      console.log("place",place);
      //infowindow.setContent(place.name);
      //infowindow.open(this.map, this);
    });
  }

  placesCallback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }
}
