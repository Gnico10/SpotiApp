import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent{

  artista: any = {};
  loading: boolean;
  topTracks: any[] = [];

  constructor( private router: ActivatedRoute,
               private spotify: SpotifyService,
               private location: Location) {
    this.router.params.subscribe( params => {
      this.getArtista(params.id);
      this.getTopTracks(params.id);
    });
  }

  getArtista( id: string): void {

    this.loading = true;

    this.spotify.getArtista( id )
        .subscribe( artista => {
          this.artista = artista;
          this.loading = false;
        });
  }

  getTopTracks( id: string ): void {
    this.spotify.getTopTranks( id )
        .subscribe( topTracks => {
          console.log(topTracks);
          this.topTracks = topTracks;
        });
  }

  goBack(): void {
    this.location.back();
  }
}
