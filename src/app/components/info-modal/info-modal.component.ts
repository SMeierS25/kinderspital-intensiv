import { Component, Input } from '@angular/core';
import { IonToolbar, ModalController,IonHeader,IonTitle,IonButton,IonButtons,IonContent } from '@ionic/angular'; 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({ 
  standalone: true, 
  imports:[IonicModule],
  selector: 'app-info-modal',
  styleUrls:['./info-modal.component.scss'], 
  template: `
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-title>Verdünnungshinweis</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Schließen</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen class="ion-padding">
      <div class="info-hint-box">
        <ion-icon
          name="information-circle-outline"
          size="large"
          color="primary"
        ></ion-icon>
        <div class="hint-content">
          <div class="hint-title">
            Verdünnungshinweis
          </div>
          <div class="hint-text">
            {{ hint }}
          </div>
        </div>
      </div>
    </ion-content>

  `
})
export class InfoModalComponent {
  @Input() hint: string = '';

  constructor(private modalCtrl: ModalController) {}
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
