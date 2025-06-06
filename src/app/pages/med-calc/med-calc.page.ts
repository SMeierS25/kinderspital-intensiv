import { Component, inject } from '@angular/core';
import { MedDataService, DrugResult } from '../../services/med-data.service';
import { ModalController } from '@ionic/angular';
import { InfoModalComponent } from '../../components/info-modal/info-modal.component'; 
import { IonicModule } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';  
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons'; 
import { AlertController } from '@ionic/angular/standalone';

addIcons({
  'information-circle-outline': informationCircleOutline
});

@Component({
  imports: [IonicModule, FormsModule, NgFor, NgIf], 
  selector: 'app-med-calc',
  templateUrl: './med-calc.page.html',
  styleUrls: ['./med-calc.page.scss']
})
export class MedCalcPage {
  weight: number = 0.00;
  selectedDrug: string = '';
  result!: DrugResult;
  drugs = this.medData.getDrugList();

  private alertController = inject(AlertController);

  constructor(
    private medData: MedDataService,
    private modalCtrl: ModalController
  ) {}

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header, // Nutzt den Parameter dynamisch
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  calculate() {
    if (!this.weight || !this.selectedDrug) {
      this.showAlert('Fehler', 'Bitte Gewicht und Medikament auswählen.');
      return;
    }
    let inputWeight = Math.max(0, Math.min(this.weight, 50));
    if (this.weight > 50) inputWeight = 50;
    this.result = this.medData.getDrugResult(this.selectedDrug, inputWeight); 

    // --- Verlauf aktualisieren ---
    const raw = localStorage.getItem('medHistory');
    let historyList = [];
    if (raw) {
      historyList = JSON.parse(raw);
    }
    historyList.unshift({
      drug: this.result.name,
      weight: inputWeight,
      dose: this.result.dose,
      solution: this.result.solution,
      volume: this.result.volume,
      datetime: new Date()
    });
    localStorage.setItem('medHistory', JSON.stringify(historyList));
  }

  async openHint() {
    if (this.result?.hint) {
      const modal = await this.modalCtrl.create({
        component: InfoModalComponent,
        componentProps: { hint: this.result.hint }
      });
      await modal.present();
    }
  } 

  shouldShowHintIcon(): boolean {
    // Zeige Symbol nur, wenn Gewicht bis 10kg UND ein Hint da ist UND im Hint NICHT „nicht verdünnt“ steht
    return (
      this.weight <= 10 &&
      !!this.result?.hint &&
      !/nicht verdünnt/i.test(this.result.hint)
    );
  }
}
