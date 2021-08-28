/*
 * spurtcommerce
 * version 3.0.1
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Component, OnInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { matchingPasswords} from '../../../theme/utils/app-validators';
import {ConfigService} from '../../../../core/service/config.service';
import {CommonSandbox} from '../../../../core/common/common.sandbox';
import {AccountSandbox} from '../../../../core/account/account.sandbox';
import {ListsSandbox} from '../../../../core/lists/lists.sandbox';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-chang-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
    
    public passwordForm: FormGroup;
    // ipload image
 
    // validation
    public ifSubmitted = false;
    public ifPasswordForm = false;
    // default image
    public ifImageAvailable: string;
    // subscription
    private subscriptions: Array<Subscription> = [];

    @ViewChild('filePath') filePath: ElementRef;

    constructor(public formBuilder: FormBuilder,
                public configService: ConfigService,
                public snackBar: MatSnackBar,
                public commonSandbox: CommonSandbox,
                public listsSandbox: ListsSandbox,
                public accountSandbox: AccountSandbox) {
    }

    // Initially calls initInfoForm,initPasswordForm,setProfile
    ngOnInit() {
        this.passwordForm = this.formBuilder.group({
            'currentPassword': ['', Validators.compose([ Validators.required])],
            'newPassword': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            'confirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
        }, {validator: matchingPasswords('newPassword', 'confirmPassword')});
    }

    // build a form for info  by gouping the form control

    // build a form for change password  by gouping the form control


    // set the user details to the form by fetching the profile details from sandbox
    /**
     * upload new user image
     *
     * @param el refer the HTMLElement filePath
     * it will activate the click function of el
     */
    uploadButtonClick() {
        const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
        el.click();
    }

    // calls convertBase64 to convert data into base64 formt
 
    // convert image file into Base64 format
  
    // call edit user info functionality if the form is valid

    // call change password functionality if the password form is valid
    public onPasswordFormSubmit(): void {

        if (this.passwordForm.valid) {
            this.accountSandbox.doChangepassword(this.passwordForm.value);
            this.ifPasswordForm = false;
            this.passwordForm.reset();
            this.passwordForm.clearValidators();
            // this.resetAllFormFields(this.passwordForm);
        } else {
            this.ifPasswordForm = true;
        }
    }

    // reset form fields and clear validation
    resetAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.reset();
                control.clearValidators();
                control.updateValueAndValidity();
            } else if (control instanceof FormGroup) {
                this.resetAllFormFields(control);
            }
        });
    }

    // destroy the subscribed events while page destroy
    ngOnDestroy() {
        this.subscriptions.forEach(each => {
            each.unsubscribe();
        });
    }

}
