/*
 * spurtcommerce
 * version 3.0.1
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {
  Component, Input, OnInit, ViewChild, PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { Router } from '@angular/router';
import { AppSettings, Settings } from '../../../app.settings';
import { MatMenuTrigger } from '@angular/material';
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  // decorators
  @Input() categories: any;
  @Input() categoriesExpanded: any;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


  // param calls getProductList
  private brand: number;

  //SideNav Flags
  public snFlag: Boolean= true;
  // local storage
  public clearBrand: string;
  // selecting  category index
  public index: number;
  // category hover
  public hover: any;
  // category id  from event
  public categoryId: string;
  // make category active
  public categorylinkActive: string;
  // theme
  public settings: Settings;
  searchValue: any = '';
  constructor(
    private breakpointObserver: BreakpointObserver,
    public listSandbox: ListsSandbox,
    public appSettings: AppSettings,
    @Inject(PLATFORM_ID) private platformId: Object,
    public router: Router) {
    this.settings = this.appSettings.settings;
    if (isPlatformBrowser(this.platformId)) {
      const setTheme = localStorage.getItem('optionsTheme');
      this.settings.theme = setTheme;
    }
  }

  ngOnInit() {
  }


  /** index for selecting categories.
   * @param index from event
   * @param categoryId from event
   * **/
  indexData(index, id) {
    this.index = index;
    this.categoryId = id;
  }


  // Make category link active if category got selected
  linkActive() {
    this.categorylinkActive = this.categoryId;
  }
  openLink(link) {
    window.open(link);
  }
  /**
   * calls listSandbox productFilterData and send the value
   * @param productFilter set default value getting from template file
   */
  sendUniqueId(productFilter, nav: MatSidenav) {
    this.listSandbox.productFilterData.next(productFilter);
    this.toggle(nav);
  }

  toggle(nav: MatSidenav) {
    const isSmallScreen = this.breakpointObserver.isMatched(
      "(max-width: 1060px)"
    ); 
    if (isSmallScreen && this.snFlag) {
      nav.toggle();
    }
  }
  setSideNavFlag(state:string){
   console.log("Hello")
    if(state =='open'){
      this.snFlag = true;
    }else{
      this.snFlag = false;
    }    
  }

  // seacrh the data in the product list
  public search() {
    this.router.navigate(['/products'], {
      queryParams: { keyword: this.searchValue }
    });
  }

  // send the search value to product through navigation.If no value send 1 as default value.
  public searchData(value) {
    console.log('search', value);
    this.searchValue = value;
    if (!value) {
      this.router.navigate(['/products'], {
        queryParams: { keyword: this.searchValue }
      });
    } else {
      this.router.navigate(['/products'], {
        queryParams: { keyword: this.searchValue }
      });
    }
  }
  // select the product from product list
  public changeCategory(event) {
    if (event) {
      this.router.navigate(['/products/', event]);
    }
    if (window.innerWidth < 960) {
      this.stopClickPropagate(event);
    }
  }
  // style purpose
  public stopClickPropagate(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }
}
