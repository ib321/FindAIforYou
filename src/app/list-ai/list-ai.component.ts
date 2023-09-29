import { Component, OnInit, Input } from '@angular/core';
import { AiDataService } from '../service/aidata.service';
import { AiTool } from '../model/ai-tool.model';
import { OptionDataService } from '../service/option-data.service';

@Component({
  selector: 'app-list-ai',
  templateUrl: './list-ai.component.html',
  styleUrls: ['./list-ai.component.css'],
})
export class ListAiComponent implements OnInit {
  AiTools: AiTool[] = [];
  UpdatedAiTools: AiTool[] = [];

  totalToolsCount: number = 0;
  searchedToolsCount: number = 0;

  sortFieldSelectedValue: string = '';
  searchBoxInput: string = '';
  selectedPricingModels: { [key: string]: boolean } = {};
  selectedTags: { [key: string]: boolean } = {};

  pricingModelOptions : { value: string; label: string; }[];
  tagOptions : { value: string; label: string; }[];

  toolsPerPage: number = 10;
  currentPage:number = 1;

  constructor(private dataService: AiDataService, private optionDataService: OptionDataService) {
    this.pricingModelOptions = this.optionDataService.getPricingModelOptions();
    this.tagOptions = this.optionDataService.getTagOptions();
  }

  ngOnInit(): void {
    this.getAllAiTools();
  }

  /**
   * Get All tools list by calling AiDataService method
   * Subscribe to the data service and assign the data to the local variable
   */
  getAllAiTools() {
    this.dataService.getAllTools().subscribe((aitools) => {
      this.AiTools = aitools;
      this.UpdatedAiTools = this.AiTools.slice();
      this.searchedToolsCount = this.totalToolsCount = this.AiTools.length;

      // Code for Pagination
      this.UpdatedAiTools = [];
      this.loadMoreTools();
    });
  }

  /**
   * gets called when there change occurs in search box, sort drop down,
   * any tag or pricing model.
   * Filters and sorts AI tools list based on the selected pricing models, tags.
   */
  onSearchSortOrTag() {
    let selectedKeysPricing = Object.keys(this.selectedPricingModels).filter(
      (model) => this.selectedPricingModels[model]
    );

    let selectedKeysTag = Object.keys(this.selectedTags).filter(
      (tag) => this.selectedTags[tag]
    );

    this.dataService.getTools(selectedKeysPricing, selectedKeysTag).subscribe((tools) => {

      let filteredTools = tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(this.searchBoxInput.toLowerCase()) ||
          (tool.shortDesc &&
            tool.shortDesc
              .toLowerCase()
              .includes(this.searchBoxInput.toLowerCase()))
      );

      let sortedTools = this.sortTools(filteredTools, this.sortFieldSelectedValue);
  
      // Update the view with the sorted and filtered tools
      this.UpdatedAiTools = sortedTools;
      this.searchedToolsCount = sortedTools.length;

      // Code for Pagination
      this.AiTools = sortedTools;
      this.currentPage = 1;
      this.UpdatedAiTools = [];
      this.loadMoreTools();
    });
  }

  sortTools(tools: AiTool[], sortValue: string): AiTool[] {
    switch (sortValue) {
      case 'sort-asc-name':
        return tools.sort((a, b) => a.name.localeCompare(b.name));
      case 'sort-desc-name':
        return tools.sort((a, b) => b.name.localeCompare(a.name));
      case 'sort-desc-date':
        return tools;
      case 'sort-asc-date':
        return tools.reverse();
      default:
        return tools;
    }
  }

  // Code for Pagination Load more tools from the AiTools array
  loadMoreTools() {
    let startIndex = (this.currentPage - 1) * this.toolsPerPage;
    let endIndex = startIndex + this.toolsPerPage;
    let moreTools = this.AiTools.slice(startIndex, endIndex);
    this.UpdatedAiTools.push(...moreTools);
    this.currentPage++;
    //console.log("loaded"+this.UpdatedAiTools.length+"Searched"+this.searchedToolsCount);
  }

  onCardTagClick(tag: string) {
    this.selectedTags[tag] = !this.selectedTags[tag];
    this.onSearchSortOrTag();
  }
  
  onCardPricingClick(pricingModel: string) {
    this.selectedPricingModels[pricingModel] = !this.selectedPricingModels[pricingModel];
    this.onSearchSortOrTag();
  }

  pickedName : string = "ibPicked";
  pickedLabel : string = "IB's Picked Tools";
}