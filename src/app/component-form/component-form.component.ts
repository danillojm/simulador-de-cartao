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

  gerar() {

    const conponentForm = {} as ComponentForm
    conponentForm.vlrPurchase = this.formGroup.value.vlrPurchase
    conponentForm.vlrInput = this.formGroup.value.vlrInput

    this.calculatePercentage(this.formGroup.value.vlrPurchase)

  }
  /** Débito: 1,29%
   Crédito á vista 2,30%
   2x "3,42"%
   3x "3,78"%
   4x "4,15"%
   5x 4,51%
   6x 4,87%
   7x 5,23%
   8x 5,59%
   9x 5,95%
   10x 6,30%
   11x 6,66%
   12x 7,01%
   2x 3,42%
   3x 3,78%
   4x 4,15%
   5x 4,51%
   6x 4,87%
   7x 5,23%
   8x 5,59%
   9x 5,95%
   10x 6,30%
   11x 6,66%
   12x 7,01%
*/
  calculatePercentage(vlrPurchase: number) {
    const percentage = ["1,29", "2,30", "3,42", "3,78", "4,15", "4,51", "4,87", "5,23", "5,59", "5,95", "6,30", "6,66", "7,1"]
    this.tableComponentValues = []
    let parcel = ''
    let vlrParcel = 0
    let totalValue = 0
    let vlrInput = this.formGroup.value.vlrInput
    vlrPurchase = vlrPurchase - vlrInput

    for (let i = 0; i < percentage.length; i++) {

      const vlrPercentage: number = Number.parseFloat(percentage[i].replace(",", "."))
      const vlrTotal = (vlrPercentage / 100) * vlrPurchase

      console.log(vlrPurchase)

      const componentTable = {} as ComponentTableModel

      if (i == 0) {
        parcel = "Débito"
        vlrParcel = (vlrPurchase + vlrTotal)
      } else {

        parcel = i + "x"
        vlrParcel = (vlrPurchase + vlrTotal) / i
      }
      totalValue = (vlrPurchase + vlrTotal)


      componentTable.parcel = parcel
      componentTable.vlrParcel = vlrParcel
      componentTable.totalValue = totalValue

      this.tableComponentValues.push(componentTable)
    }


  }
}



