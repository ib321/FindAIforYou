import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiDataService {
  // The URL of JSON file
  private dataUrl = 'assets/demoAIExtData.json';

  constructor(private http: HttpClient) { }

  // Method to get the data as an observable
  getData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
}