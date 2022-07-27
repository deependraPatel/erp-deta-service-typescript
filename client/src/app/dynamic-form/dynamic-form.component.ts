import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JsonFormControls, formElement } from '../models/Json-form-data';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnChanges {
  @Input() jsonFormData!: JsonFormControls;
  public formName: FormGroup = this.fb.group({});
  public textTypes: string[] = ['text', 'password', 'email', 'number', 'search', 'tel', 'url'];

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe((routeData: any) => {
      this.jsonFormData = routeData.form;
      this.createForm(this.jsonFormData);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.jsonFormData.firstChange) {
      this.createForm(this.jsonFormData);
    }
  }

  createForm(controls: JsonFormControls) {
    for (const row of controls.rows) {
      for (const column of row.columns) {
        const formJson: formElement = column.elementJsonStiring
          ? JSON.parse(column.elementJsonStiring)
          : {};
        const validatorsToAdd = [];
        for (const [k, v] of Object.entries(formJson.validations)) {
          switch (k) {
            case 'min':
              validatorsToAdd.push(Validators.min(v));
              break;
            case 'max':
              validatorsToAdd.push(Validators.max(v));
              break;
            case 'required':
              if (v) {
                validatorsToAdd.push(Validators.required);
              }
              break;
            case 'requiredTrue':
              if (v) {
                validatorsToAdd.push(Validators.requiredTrue);
              }
              break;
            case 'email':
              if (v) {
                validatorsToAdd.push(Validators.email);
              }
              break;
            case 'minLength':
              validatorsToAdd.push(Validators.minLength(v));
              break;
            case 'maxLength':
              validatorsToAdd.push(Validators.maxLength(v));
              break;
            case 'pattern':
              validatorsToAdd.push(Validators.pattern(v));
              break;
            case 'nullValidator':
              if (v) {
                validatorsToAdd.push(Validators.nullValidator);
              }
              break;
            default:
              break;
          }
        }

        this.formName.addControl(
          formJson.formKey,
          this.fb.control('', validatorsToAdd)
        );

        column.elements = formJson;
      }
    }
  }

  onSubmit() {
    console.log('Form valid: ', this.formName.valid);
    console.log('Form values: ', this.formName.value);
  }
}
