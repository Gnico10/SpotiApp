import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {

    console.log('Servicio Spotify listo.');

  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer BQD-J35-cHN8PzrSUvIp54E6wCSc7eUNtkoTK8J2ymdGOSsj0RkGbh1eAz0UYE_34BocTsk60XmopSy3_WM'
    });

    return this.http.get(url, { headers });

  }

  getNewReleases(): Observable<any> {
    return  this.getQuery('browse/new-releases?limit=50')
                .pipe( map( data => data['albums'].items));

    // this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=50', { headers })
    //                 .pipe( map( data => data['albums'].items));
  }

  getArtista(termino: string): Observable<any> {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => data['artists'].items));
    
    // this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers })
    //                 .pipe( map( data => data['artists'].items));

  }

}
