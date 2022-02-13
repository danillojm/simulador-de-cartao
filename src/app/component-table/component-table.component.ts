import { Component, Input, OnInit } from '@angular/core';
import { ComponentTableModel } from './model/component-table-model';


@Component({
  selector: 'app-component-table',
  templateUrl: './component-table.component.html',
  styleUrls: ['./component-table.component.css']
})
export class ComponentTableComponent implements OnInit {

  @Input() values: ComponentTableModel[] = []
  constructor() { }
  ngOnInit(): void {
  }

}
