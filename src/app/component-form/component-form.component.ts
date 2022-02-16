import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentTableModel } from '../component-table/model/component-table-model';
import { ComponentForm } from './model/component-form-model';

@Component({
  selector: 'app-component-form',
  templateUrl: './component-form.component.html',
  styleUrls: ['./component-form.component.css']
})
export class ComponentFormComponent implements OnInit {


  formGroup: FormGroup
  tableComponentValues: ComponentTableModel[] = []
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }



  createForm() {

    const conponentForm = {} as ComponentForm

    this.formGroup = this.formBuilder.group({

      vlrPurchase: [conponentForm.vlrPurchase],
      vlrInput: [conponentForm.vlrInput]

    })


  }

  calculation() {
    const percentage = ["1,29", "2,30", "3,42", "3,78", "4,15", "4,51", "4,87", "5,23", "5,59", "5,95", "6,30", "6,66", "7,1"]
    this.tableComponentValues = []
    let parcel = ''
    let vlrParcel = 0
    let totalValue = 0
    let vlrInput = this.formGroup.value.vlrInput
    let vlrPurchase = this.formGroup.value.vlrPurchase
    vlrPurchase = vlrPurchase - vlrInput

    for (let i = 0; i < percentage.length; i++) {


      const taxa = Number.parseFloat(percentage[i].replace(",", "."))
      const vlrPercentage = (taxa * vlrPurchase) / 100
      const vlrTotal = vlrPurchase + vlrPercentage

      const componentTable = {} as ComponentTableModel

      totalValue = vlrTotal
      if (i == 0) {
        parcel = "Débito"
        vlrParcel = (vlrPurchase + vlrPercentage)
      } else {

        parcel = i + "x"
        vlrParcel = vlrTotal / i
      }

      componentTable.parcel = parcel
      componentTable.vlrParcel = vlrParcel
      componentTable.totalValue = totalValue

      this.tableComponentValues.push(componentTable)
    }


  }
}



