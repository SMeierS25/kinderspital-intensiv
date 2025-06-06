import { Injectable } from '@angular/core';

export interface DrugResult {
  name: string;
  dose: string;
  solution: string;
  volume: string;
  hint: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedDataService {

  getDrugResult(drug: string, weight: number): DrugResult {
    switch (drug) {
      case 'fentanyl':
        const fentanylDose = (2 * weight).toFixed(2);
        const fentanylSol = weight < 10 ? '1ml = 5mcg (verdünnt)' : '1ml = 50mcg (pur)';
        const fentanylVol = (
          weight < 10
            ? Number(fentanylDose) / 5
            : Number(fentanylDose) / 50
        ).toFixed(2);
        return {
          name: 'Fentanyl',
          dose: `${fentanylDose} mcg`,
          solution: fentanylSol,
          volume: `${fentanylVol} ml`,
          hint: 'Verdünnte Stammlösung: 2ml Fentanyl (1ml=50mcg) + 18ml NaCl 0.9% = 1ml = 5mcg'
        };
      case 'dormicum':
        const dormicumDose = (0.1 * weight).toFixed(2);
        const dormicumVol = (Number(dormicumDose) / 1).toFixed(2);
        return {
          name: 'Dormicum',
          dose: `${dormicumDose} mg`,
          solution: '1ml = 1mg (immer pur)',
          volume: `${dormicumVol} ml`,
          hint: 'Dormicum wird nicht verdünnt.'
        };
      case 'ketamin':
        const ketaminDose = (2 * weight).toFixed(2);
        const ketaminVol = (Number(ketaminDose) / 10).toFixed(2);
        return {
          name: 'Ketamin',
          dose: `${ketaminDose} mg`,
          solution: '1ml = 10mg (immer pur)',
          volume: `${ketaminVol} ml`,
          hint: 'Ketamin wird nicht verdünnt.'
        };
      case 'rocuronium':
        const rocuroniumDose = (0.5 * weight).toFixed(2); // 0.5 für Tabelle
        const rocuroniumSol = weight < 10 ? '1ml = 1mg (verdünnt)' : '1ml = 10mg (pur)';
        const rocuroniumVol = (weight < 10 ? Number(rocuroniumDose) / 1 : Number(rocuroniumDose) / 10).toFixed(2);
        return {
          name: 'Rocuronium',
          dose: `${rocuroniumDose} mg`,
          solution: rocuroniumSol,
          volume: `${rocuroniumVol} ml`,
          hint: 'Verdünnte Stammlösung: 1ml Rocuronium (1ml=10mg) + 9ml NaCl 0.9% = 1ml = 1mg'
        };
      case 'atropin':
        const atropinDose = (0.02 * weight).toFixed(2); // 20mcg = 0.02mg
        let atropinVol = (Number(atropinDose) / 0.1).toFixed(2); // Stammlösung 0.1mg/ml
        if(Number(atropinDose) < 0.1) atropinVol = "1"; // Mindestmenge
        return {
          name: 'Atropin',
          dose: `${atropinDose} mg (${(Number(atropinDose) * 1000).toFixed(0)} mcg)`,
          solution: '0.1mg/ml (100mcg/ml)',
          volume: `${atropinVol} ml`,
          hint: 'Stammlösung: 1ml Atropin (1ml=0.5mg) + 4ml NaCl 0.9% = 1ml = 0.1mg. Mindestmenge 0.1mg (100mcg)'
        };
      case 'adrenalin-schock':
        return {
          name: 'Adrenalin (Schock)',
          dose: '5 mcg',
          solution: '1ml = 10mcg',
          volume: (5 / 10).toFixed(2) + ' ml',
          hint: '1ml Adrenalin (1ml=1mg/1000mcg) + 99ml NaCl 0.9% = 1ml = 10mcg, Maximalmenge 1mg'
        };
      case 'adrenalin-rea':
        const adreReaDose = (10 * weight).toFixed(2);
        const adreReaVol = (Number(adreReaDose) / 100).toFixed(2);
        return {
          name: 'Adrenalin (Rea)',
          dose: `${adreReaDose} mcg`,
          solution: '1ml = 100mcg',
          volume: `${adreReaVol} ml`,
          hint: '1ml Adrenalin (1ml=1mg/1000mcg) + 9ml NaCl 0.9% = 1ml = 100mcg, Maximalmenge 1mg'
        };
      default:
        return { name: '', dose: '', solution: '', volume: '', hint: '' };
    }
  }

  getDrugList() {
    return [
      { key: 'fentanyl', name: 'Fentanyl' },
      { key: 'dormicum', name: 'Dormicum' },
      { key: 'ketamin', name: 'Ketamin' },
      { key: 'rocuronium', name: 'Rocuronium' },
      { key: 'atropin', name: 'Atropin' },
      { key: 'adrenalin-schock', name: 'Adrenalin (Schocklösung)' },
      { key: 'adrenalin-rea', name: 'Adrenalin (Rea-Lösung)' }
    ];
  }
}
