// bmi.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss']
})
export class BmiComponent {
  weight: number = 0;
  height: number = 0;
  bmi: string = '0'; // Change the type of bmi to string

  calculateBMI(): void {
    const weightKg = this.weight;
    const heightM = this.height / 100; // Convert height from cm to meters
    this.bmi = (weightKg / (heightM * heightM)).toFixed(2); // Round BMI to two decimal places
  }
}
