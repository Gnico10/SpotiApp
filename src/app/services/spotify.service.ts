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
      Authorization: 'Bearer BQDZWCoeFwls8aPp87AMGYi2adokBpaO_xKX5fiA3E_rIKSpaQvbZ_RIFZAOt2gWYBJwfcmncpH0sMz1WIo'
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
                // .pipe( map( data => data['artists'].items));
    
  }

}
