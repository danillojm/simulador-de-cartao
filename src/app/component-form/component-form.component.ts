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
    conponentForm.selectCard = "MASTER_E_VISA"
    this.formGroup = this.formBuilder.group({

      vlrPurchase: [conponentForm.vlrPurchase],
      vlrInput: [conponentForm.vlrInput,],
      selectCard: [conponentForm.selectCard]
    })


  }
  /* Débito 1,60%  "1,60","3,29","4,13","4,76","5,39","6,01","6,63","7,54","8,14","8,74","9,35","9,93","10,52"
Crédito 3,29%

2x 4,13%
3x 4,76%
4x 5,39%
5x 6,01%
6x 6,63%
7x 7,54%
8x 8,14%
9x 8,74%
10x 9,35%
11x 9,93%
12x 10,52%

——

13x 11,10%
14x 11,67%
15x 12,25%
16x 12,81%
17x 13,37%
18x 13,93%
   */

  percentage(creditCard: string): string[] {

    const masterEvisa = ["1,49", "3,29", "3,93", "4,56", "5,19", "5,81", "6,43", "7,34", "7,94",
      "8,54", "9,15", "9,73", "10,32", "10,90", "11,47", "12,05", "12,61", "13,17",
      "13,73"]

    const eloEoutras = ["1,60", "3,29", "4,13", "4,76", "5,39", "6,01", "6,63", "7,54", "8,14", "8,74",
      "9,35", "9,93", "10,52", "11,10", "11,67", "12,25", "12,81", "13,37", "13,93"]

    let percentage = [""]
    let vlrPurchase = this.formGroup.value.vlrPurchase

    if (creditCard != null && vlrPurchase != null) {

      if (creditCard === "MASTER_E_VISA") {
        percentage = masterEvisa
      } else {
        percentage = eloEoutras
      }


    }
    return percentage
  }

  calculation() {

    const selectCard = this.formGroup.value.selectCard
    const percentage = this.percentage(selectCard)

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



