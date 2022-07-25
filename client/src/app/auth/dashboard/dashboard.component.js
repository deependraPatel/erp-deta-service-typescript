"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let DashboardComponent = class DashboardComponent {
    constructor(fb) {
        this.fb = fb;
        this.inItForm();
    }
    ngOnInit() {
    }
    inItForm() {
        this.profileForm = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            mobile: ['', [forms_1.Validators.required]],
            firstName: ['', [forms_1.Validators.required]],
            lastName: ['', [forms_1.Validators.required]],
            address: [''],
            city: [''],
            state: [''],
            postalCode: [''],
            old_password: [],
            password: [],
            cnf_password: []
        });
    }
    get formControls() {
        return this.profileForm.controls;
    }
    saveProfile() {
        this.submitted = true;
        if (this.profileForm.valid) {
        }
    }
};
DashboardComponent = __decorate([
    (0, core_1.Component)({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
