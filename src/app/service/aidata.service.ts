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

  /**
   * Returns all AI tools.
   * @return An Observable of AiTool objects.
   */
  public getAllTools(): Observable<AiTool[]> {
    return this.http.get<AiTool[]>(this.dataUrl);
  }

  /**
   * Returns tools based on the selected pricing models and tags.
   * 1. When both tags are not selected, returns all tools.
   * 2. When both tags are selected, returns tools with AND logic of pricemodel & tag.
   * 3. When only one of any is selected, returns tools with OR logic of pricemodel & tag.
   * @param selectedPricingModels An array of selected pricing models.
   * @param selectedTags An array of selected tags.
   * @return An Observable of AiTool objects.
   */
  public getTools(selectedPricingModels: string[], selectedTags: string[]): Observable<AiTool[]> {
    let selectedKeysPricing = selectedPricingModels;
    let selectedKeysTags = selectedTags;
    let allAiTools$ = this.getAllTools();
    if (selectedKeysPricing.length === 0 && selectedKeysTags.length === 0) {
      return allAiTools$;
    } else {
      let filteredAiTools$ = allAiTools$.pipe(
        map((AiTools) =>
          AiTools.filter((tool) => {
            // Check if the tool's pricing model is included in the selectedKeysPricing array(By user)
            let pricingModelMatch = selectedKeysPricing.includes(
              tool.pricingModel
            );
            // Check if the tool has at least one tag that is included in the selectedKeysTags array
            let tagMatch = false;
            for (let tag of tool.tags) {
              if (selectedKeysTags.includes(tag)) {
                tagMatch = true;
                break;
              }
            }
            // Create flag according to some* condition which decides if tool should get filtered
            let flag = pricingModelMatch || tagMatch;
            if (selectedKeysPricing.length > 0 && selectedKeysTags.length > 0) {
              flag = pricingModelMatch && tagMatch;
            }
            return flag;
          })
        )
      );
      return filteredAiTools$;
    }
  }
}