import { Component, OnInit, Input } from '@angular/core';
import { sidebarWidth } from '../../../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() sideBarWidth: string = `${sidebarWidth.full}px`;
  public readonly currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
