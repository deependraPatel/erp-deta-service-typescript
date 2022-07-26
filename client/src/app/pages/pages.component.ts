import { Component, HostListener, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  ActivatedRoute,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { sidebarWidth, ROUTE_PRIMARY_OUTLET } from '../constants';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  private miniSideBarWidth = sidebarWidth.mini;
  private mainSideBarWidth = sidebarWidth.full;
  public isMiniSideBar = false;
  public sideBarWidth = `${this.mainSideBarWidth}px`;
  public routerData: any = {};
  public sideNavHoverEffect: boolean = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationError ||
        event instanceof NavigationCancel
      ) {
        let route: any = this.activatedRoute.snapshot;
        Object.assign(this.routerData, route.data);
        
        while (!!route.children && !!route.children.length) {
          const child = route.children.find(
            (c: any) => c.outlet === ROUTE_PRIMARY_OUTLET
          );
          route = child;
          this.routerData = route.data;
        }

        if (this.routerData && this.routerData.title) {
          this.titleService.setTitle(`TTA ERP - ${this.routerData.title}`);
        }

        this.manageSideBar(false);
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const miniBar = !!this.routerData && this.routerData.title !== 'Dashboard' ? true: false;
    this.manageSideBar(miniBar);
  }

  ngOnInit(): void {
    // const miniBar = !!this.routerData && this.routerData.title !== 'Dashboard' ? true: false;
    // this.manageSideBar(miniBar);
  }

  switchSideBar(): void {
    this.isMiniSideBar = !this.isMiniSideBar;
    this.sideBarWidth = this.isMiniSideBar
      ? `${this.miniSideBarWidth}px`
      : `${this.mainSideBarWidth}px`;
  }

  manageSideBar(isMiniSideBar: boolean = false): void {
    if (window.innerWidth <= 991 || isMiniSideBar) {
      this.isMiniSideBar = true;
      this.sideBarWidth = `${this.miniSideBarWidth}px`;
    } else {
      this.isMiniSideBar = false;
      this.sideBarWidth = `${this.mainSideBarWidth}px`;
    }
  }

  manageSidebarHover(mini: boolean): void {
    if (this.isMiniSideBar) {
      this.sideBarWidth = mini
        ? `${this.miniSideBarWidth}px`
        : `${this.mainSideBarWidth}px`;
      this.sideNavHoverEffect = mini ? false: true;
    }
  }
}
