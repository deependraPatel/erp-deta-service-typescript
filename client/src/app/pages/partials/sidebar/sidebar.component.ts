import { Component, OnInit, Input } from '@angular/core';
import { sidebarWidth } from '../../../constants';
import { SidebarMenus } from '../../../models/sidebar-menus';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() sideBarWidth: string = `${sidebarWidth.full}px`;
  public menus: SidebarMenus[] = [
    {
      label: 'Dashboard',
      title: 'Dashboard',
      path: '/dashboard',
      iconClass: 'fa fa-home',
    },
    {
      label: 'Forms Management',
      title: 'Manage Forms',
      path: '/forms',
      iconClass: 'fa fa-clipboard',
    },
    {
      label: 'List for Forms',
      title: 'Forms Tabular View',
      path: '/dynamic-list',
      iconClass: 'fa fa-list-alt',
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
