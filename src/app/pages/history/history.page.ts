import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, NgFor, DatePipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { MedCalcPage } from '../med-calc/med-calc.page'; 
import { AlertController } from '@ionic/angular/standalone';
import { inject } from '@angular/core'; 
import { addIcons } from 'ionicons'; 
import { trash } from 'ionicons/icons'; 

addIcons({
  'trash': trash
});


interface HistoryEntry {
  drug: string;
  weight: number;
  dose: string;
  solution: string;
  volume: string;
  datetime: string | Date;  // Wegen LocalStorage ggf. erst string, dann wieder Date casten
}

@Component({
  standalone: true,
  selector: 'app-history',
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    NgFor,
    NgIf,
    DatePipe,
    MedCalcPage, 
  ],
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss']
}) 
export class HistoryPage {
  historyList: HistoryEntry[] = []; 

  private alertController = inject(AlertController);

  async clearHistory() {
    const alert = await this.alertController.create({
      header: 'Verlauf löschen?',
      message: 'Möchten Sie wirklich alle gespeicherten Berechnungen löschen?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Löschen',
          role: 'destructive',
          handler: () => {
            localStorage.removeItem('medHistory');
            this.historyList = [];
          }
        }
      ]
    });
    await alert.present();
  } 

  ionViewWillEnter() {
    const raw = localStorage.getItem('medHistory');
    if (raw) {
      this.historyList = JSON.parse(raw);
      this.historyList.forEach(h => h.datetime = new Date(h.datetime));
    } else {
      this.historyList = [];
    }
  }
}
