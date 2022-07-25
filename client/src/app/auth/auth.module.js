"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const forms_1 = require("@angular/forms");
const material_module_1 = require("../material-module");
const auth_routing_module_1 = require("./auth-routing.module");
const footer_component_1 = require("./partials/footer/footer.component");
const header_component_1 = require("./partials/header/header.component");
const sidenav_component_1 = require("./partials/sidenav/sidenav.component");
const auth_component_1 = require("./auth.component");
const dashboard_component_1 = require("./dashboard/dashboard.component");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, core_1.NgModule)({
        declarations: [
            footer_component_1.FooterComponent,
            header_component_1.HeaderComponent,
            sidenav_component_1.SidenavComponent,
            auth_component_1.AuthComponent,
            dashboard_component_1.DashboardComponent
        ],
        imports: [
            common_1.CommonModule,
            auth_routing_module_1.AuthRoutingModule,
            http_1.HttpClientModule,
            forms_1.ReactiveFormsModule,
            material_module_1.MaterialModules
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
    })
], AuthModule);
exports.AuthModule = AuthModule;
