import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AiTool } from '../model/ai-tool.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AiDataService {
  private dataUrl: string;
  constructor(private http: HttpClient) {
    this.dataUrl = 'assets/demoAIExtData.json';
  }

  public getData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }

  public getAllTools(): Observable<AiTool[]> {
    return this.http.get<AiTool[]>(this.dataUrl);
  }

  public getToolsByPricingModel(selectedPricingModels :string[]): Observable<AiTool[]> {
    let selectedKeys = selectedPricingModels;
    let AiTools$ = this.http.get<AiTool[]>(this.dataUrl);
    let filteredAiTools$ = AiTools$.pipe(
      map(AiTools => AiTools.filter(tool => selectedKeys.includes(tool.pricingModel)))
    );
    return filteredAiTools$;
  }
}