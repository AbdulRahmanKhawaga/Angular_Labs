import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=14NsDRET9DfPkbZBDic4Pd2xS3oivTvUL';
    link.download = 'AbdulRahmanKhawagaCV.pdf';
    link.target = '_blank';
    link.click();
  }
}
