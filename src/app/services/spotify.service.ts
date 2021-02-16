import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string): Observable<any> {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer BQAeFcvHKyygnZzVZLqzHPp-cXBTYlI0qY6JaUI_wxv6xi_ldipiVfsyG30KHRk1QYWB6-uac1QQch1KaGc'
    });

    return this.http.get(url, { headers });

  }

  getNewReleases(): Observable<any> {
    return  this.getQuery('browse/new-releases?limit=50')
                .pipe( map( data => data['albums'].items));

    // this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=50', { headers })
    //                 .pipe( map( data => data['albums'].items));
  }

  getArtistas(termino: string): Observable<any> {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => data['artists'].items));

    // this.http.get(`https://api.spotify.com/v1/search?q=${ termino }&type=artist&limit=15`, { headers })
    //                 .pipe( map( data => data['artists'].items));
  }

  getArtista(id: string): Observable<any> {
    return this.getQuery(`artists/${ id }`);
    // No hace falta map porque la información ya contiene lo necesario.
  }

  getTopTranks(id: string): Observable<any> {
    return this.getQuery(`artists/${ id }/top-tracks?market=ar`)
                .pipe( map( data => data['tracks'] ));
  }
}
