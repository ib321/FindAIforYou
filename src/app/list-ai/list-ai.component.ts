import { Component, OnInit, Input } from '@angular/core';
import { AiDataService } from '../service/aidata.service';

@Component({
  selector: 'app-list-ai',
  templateUrl: './list-ai.component.html',
  styleUrls: ['./list-ai.component.css']
})
export class ListAiComponent implements OnInit {
  // A local variable to store the data
  data: any[] = [];
  totalToolsCount : number = 0;
  searchedToolsCount : number = 0;

  constructor(private dataService: AiDataService) { }
  ngOnInit(): void {
    // Subscribe to the data service and assign the data to the local variable
    this.dataService.getData().subscribe(data => {
      this.data = data;
      this.totalToolsCount = this.data.length;
      this.searchedToolsCount = this.totalToolsCount;
      //console.log(data);
    });
  }
}