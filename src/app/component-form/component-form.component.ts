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
  /* Débito 1,49%
   Crédito 3,29%

   2x 3,93%
   3x 4,56%
   4x 5,19%
   5x 5,81%
   6x 6,43%
   7x 7,34%
   8x 7,94%
   9x 8,54%
   10x 9,15%
   11x 9,73%
   12x 10,32% */

  calculation() {
    const percentage = ["1,49", "3,29", "3,93", "4,56", "5,19", "5,81", "6,43", "7,34", "7,94", "8,54", "9,15", "9,73", "10,32"]
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



