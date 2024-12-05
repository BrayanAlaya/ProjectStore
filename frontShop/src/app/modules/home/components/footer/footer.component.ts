import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'github_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/github.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'linkedin_icon', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/linkedin.svg')
    );
  }
}
