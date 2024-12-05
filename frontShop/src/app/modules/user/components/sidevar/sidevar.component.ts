import { Component } from '@angular/core';



@Component({
  selector: 'app-sidevar',
  templateUrl: './sidevar.component.html',
  styleUrls: ['./sidevar.component.scss']
})
export class SidevarComponent {
  public slide: boolean = false;

  slideAction(): void{
    this.slide = !this.slide
  }
}