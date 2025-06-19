import { ViewChild, ElementRef, Output, EventEmitter, Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen'; 
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule], 
  selector: 'app-splash-screen',
  standalone: true,
  styleUrl: 'splash-screen.component.scss',
  template: `
    <div class="video-rotator">
      <video
        #vid
        src="assets/videos/animation.mp4"
        autoplay
        playsinline
        preload="auto"
        (ended)="hideSplash()"
        (error)="hideSplash()"
        class="rotated-video"
      ></video>
    </div>
  `
})
export class SplashScreenComponent implements OnInit {
  @Output() splashEnded = new EventEmitter<void>();
  @ViewChild('vid') vid!: ElementRef<HTMLVideoElement>;
  bust = Date.now();

  ngOnInit() {
    // Fallback: Nach spätestens 15 Sekunden Splash ausblenden!
    setTimeout(() => {
      this.hideSplash();
    }, 13300);
    SplashScreen.hide(); 
  }

  hideSplash() { 
    this.splashEnded.emit();
    SplashScreen.hide(); // jetzt Hardware-Splash auch ausblenden!
  }
}
