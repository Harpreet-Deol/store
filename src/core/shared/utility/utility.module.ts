/*
 * spurtcommerce
 * version 3.0.1
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { UtilService } from './utility.service';
import { ValidationService } from './validation.service';

@NgModule()
export class UtilityModule {
  static forRoot(): ModuleWithProviders<UtilityModule> {
    return {
      ngModule: UtilityModule,

      providers: [UtilService, ValidationService]
    };
  }
}
