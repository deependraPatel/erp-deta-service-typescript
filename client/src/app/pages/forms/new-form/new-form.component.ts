import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material/chips';
import { RestApiService } from '../../../services/rest-api.service';
import { URLS } from '../../../constants';

const formElementsType = [
  {
    title: 'Text',
    value: 'text',
  },
  {
    title: 'Email',
    value: 'email',
  },
  {
    title: 'Number',
    value: 'number',
  },
  {
    title: 'Password',
    value: 'password',
  },
  {
    title: 'Phone',
    value: 'tel'
  },
  {
    title: 'Textarea',
    value: 'textarea',
  },
  {
    title: 'Slide Toggle',
    value: 'toggle',
  },
  {
    title: 'Radio',
    value: 'radio',
  },
  {
    title: 'Checkbox',
    value: 'checkbox',
  },
  {
    title: 'Select',
    value: 'select',
  },
];

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss'],
})
export class NewFormComponent implements OnInit {
  dynamicForm: FormGroup = this.fb.group({
    rows: this.fb.array([]),
    formTitle: ['', Validators.required],
    formSubTitle: [''],
    dataModelName: ['', Validators.required],
  });

  isLoader: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private restApiService: RestApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  get formControl() {
    return this.dynamicForm.controls;
  }

  newFormRow(): FormGroup {
    return this.fb.group({
      columns: this.fb.array([]),
    });
  }

  get getFormRows(): FormArray {
    return this.formControl.rows as FormArray;
  }

  addNewRow(): void {
    this.getFormRows.push(this.newFormRow());
  }

  removeRow(index: number) {
    const isConfirm = confirm('Are you sure want to delete this row');
    if (isConfirm) {
      this.getFormRows.removeAt(index);
    }
  }

  newColumn(): FormGroup {
    return this.fb.group({
      elementJsonStiring: [],
    });
  }

  addNewColumn(i: number): void {
    (this.getFormRows.controls[i].get('columns') as FormArray).push(
      this.newColumn()
    );
    const column = (this.getFormRows.controls[i].get('columns') as FormArray)
      .length;
    this.openDialog(i, (column - 1));
  }

  getColumnFormControl(i: number) {
    return (this.getFormRows.controls[i].get('columns') as FormArray).controls;
  }

  removeColumn(row: number, column: number) {
    const isConfirm = confirm('Are you sure want to delete this column');
    if (isConfirm) {
      const columnsControl = this.getFormRows.controls[row].get(
        'columns'
      ) as FormArray;
      columnsControl.removeAt(column);
    }
  }

  openDialog(row: number, column: number, data = ''): void {
    const dialogRef = this.dialog.open(FormElementDialog, {
      minWidth: '70rem',
      disableClose: true,
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const columnsForm = this.getColumnFormControl(row);
      columnsForm[column]
        .get('elementJsonStiring')
        ?.setValue(JSON.stringify(result));
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 5000,
      horizontalPosition: 'end',
    });
  }

  resetForm() {
    this.dynamicForm.reset();

    let rowLength = this.getFormRows.controls.length;
    while (rowLength > 0) {
      this.getFormRows.removeAt(rowLength - 1);

      rowLength = this.getFormRows.controls.length;
    }

    this.dynamicForm.markAsPristine();
    this.dynamicForm.markAsUntouched();
    this.dynamicForm.updateValueAndValidity();
  }

  saveForm() {
    if (this.dynamicForm.valid) {
      this.isLoader = true;
      this.restApiService
        .postData(URLS.form, this.dynamicForm.value)
        .subscribe((res: any) => {
          this.isLoader = false;
          this.openSnackBar('Form Saved Successfully.');
          this.resetForm();
        });
    }
  }
}

@Component({
  selector: 'form-element-dialog',
  templateUrl: 'form-element-dialog.html',
})
export class FormElementDialog {
  public elementsForm: FormGroup = this.fb.group({
    formKey: ['', Validators.required],
    label: ['', Validators.required],
    title: ['', Validators.required],
    type: ['', Validators.required],
    value: [],
    classes: [],
    options: this.fb.group({
      isValuesFromDataModel: [false],
      dataModel: [],
      values: [],
      condition: this.fb.group({
        isCondition: [false],
        formField: [],
        dataKey: [],
        formFieldKey: [],
      }),
    }),
    validations: this.fb.group({
      isMin: [false],
      isMax: [false],
      isPattern: [false],
      required: [true],
      email: [false],
      isMinLength: [false],
      isMaxLength: [false],
      nullValidator: [false],
      min: [],
      max: [],
      minLength: [],
      maxLength: [],
      pattern: [],
    }),
  });

  public formElementsArray = formElementsType;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectValues: any = [];
  @ViewChild('valueInput')
  valueInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormElementDialog>,
    @Inject(MAT_DIALOG_DATA) public formData: string
  ) {
    this.setFormValues();
  }

  setFormValues() {
    if(this.formData){
      const data = JSON.parse(this.formData);
      this.elementsForm.setValue({
        formKey: data.formKey || '',
        label: data.label || '',
        title: data.title || '',
        type: data.type || '',
        options: {
          isValuesFromDataModel: data.options.isValuesFromDataModel || false,
          dataModel: data.options.dataModel || '',
          values: '',
          condition: {
            isCondition: data.options.condition.isCondition || false,
            formField: data.options.condition.formField || '',
            dataKey: data.options.condition.dataKey || '',
            formFieldKey: data.options.condition.formFieldKey || '',
          },
        },
        validations: {
          isMin: data.validations.isMin || false,
          isMax: data.validations.isMax || false,
          isPattern: data.validations.isPattern || false,
          required: data.validations.required || false,
          email: data.validations.email || false,
          isMinLength: data.validations.isMinLength || false,
          isMaxLength: data.validations.isMaxLength || false,
          nullValidator: data.validations.nullValidator || false,
          min: data.validations.min || '',
          max: data.validations.max || '',
          minLength: data.validations.minLength || '',
          maxLength: data.validations.maxLength || '',
          pattern: data.validations.pattern || '',
        }
      })
    }
  }

  get formControls() {
    return this.elementsForm.controls;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectValues.push(value);
    }

    event.chipInput!.clear();

    this.valueInput.nativeElement.value = '';
  }

  remove(fruit: string): void {
    const index = this.selectValues.indexOf(fruit);

    if (index >= 0) {
      this.selectValues.splice(index, 1);
    }
  }

  closeDialog() {
    if (this.elementsForm.valid) {
      this.elementsForm.value.options.values = this.selectValues;
      this.dialogRef.close(this.elementsForm.value);
    }
  }
}
