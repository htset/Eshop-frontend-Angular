import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public upload(image: File, id:number): Observable<HttpEvent<Response>> {
    const formData = new FormData();
    let fileName = id.toString();
    let fileExtension = image.name.split('?')[0].split('.').pop();

    formData.append('image', image, fileName + '.' + fileExtension);
    formData.append('id', id.toString());
    return this.http.post<Response>('/api/upload', formData, {reportProgress: true, observe: 'events'});
  }
}
