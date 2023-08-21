import { Component, OnInit, Input } from '@angular/core';
import { AiDataService } from '../service/aidata.service';
import { AiTool } from '../model/ai-tool.model';

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

  selectedValue: string = '';
  searchBoxInput: string = '';

  constructor(private dataService: AiDataService) {}

  ngOnInit(): void {
    this.getAllAiTools();
  }

  getAllAiTools() {
    //Subscribe to the data service and assign the data to the local variable
    this.dataService.getAllTools().subscribe((aitools) => {
      this.AiTools = aitools;
      this.UpdatedAiTools = this.AiTools.slice();
      this.searchedToolsCount = this.totalToolsCount = this.AiTools.length;
    });
  }


  pricingModelOptions = [
    { value: 'Free', label: 'Free' },
    { value: 'Freemium', label: 'Freemium' },
    { value: 'GitHub', label: 'GitHub' },
    { value: 'Google Colab', label: 'Google Colab' },
    { value: 'Open Source', label: 'Open Source' },
    { value: 'Paid', label: 'Paid' },
  ];

  selectedPricingModels: { [key: string]: boolean } = {};

  onPricingModelCheck() {
    let selectedKeys = Object.keys(this.selectedPricingModels).filter(
      (key) => this.selectedPricingModels[key]
    );
    if (selectedKeys.length === 0) {
      this.getAllAiTools();
    } else {
      this.dataService.getToolsByPricingModel(selectedKeys).subscribe((aitools) => {
          this.AiTools = aitools;
          this.UpdatedAiTools = this.AiTools.slice();
          this.searchedToolsCount = this.UpdatedAiTools.length;
        });
    }
  }

  onSearchOrSort() {
    this.UpdatedAiTools = this.AiTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(this.searchBoxInput.toLowerCase()) ||
        (tool.shortDesc &&
          tool.shortDesc
            .toLowerCase()
            .includes(this.searchBoxInput.toLowerCase()))
    );

    if (this.selectedValue === 'sort-asc-name') {
      this.UpdatedAiTools.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.selectedValue === 'sort-desc-name') {
      this.UpdatedAiTools.sort((a, b) => b.name.localeCompare(a.name));
    } else if (this.selectedValue === 'sort-desc-date') {
      this.UpdatedAiTools = this.UpdatedAiTools;
    } else if (this.selectedValue === 'sort-asc-date') {
      this.UpdatedAiTools = this.UpdatedAiTools.reverse();
    } else {
      this.UpdatedAiTools = this.UpdatedAiTools;
    }
    this.searchedToolsCount = this.UpdatedAiTools.length;
  }
}