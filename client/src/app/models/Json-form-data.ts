export interface JsonFormData {
  controls: JsonFormControls[];
}

export interface JsonFormControls {
  formTitle: string;
  formSubTitle?: string;
  dataModelName: string;
  rows: FormRows[];
}

interface FormRows {
  columns: RowsColumns[];
}

interface RowsColumns {
  elementJsonStiring: string;
  elements?: formElement;
}

export interface formElement {
  formKey: string;
  label: string;
  title: string;
  type: string;
  value?: string;
  classes?: string;
  options: ElementOptions;
  validations: ElementValidations;
}

export interface ElementOptions {
  isValuesFromDataModel: boolean;
  dataModel?: string;
  values?: string[];
  condition: OptionCondition;
}

export interface OptionCondition {
  isCondition: boolean;
  formField?: string;
  dataKey?: string;
  formFieldKey?: string;
}

export interface ElementValidations {
  isMin: boolean;
  isMax: boolean;
  isPattern: boolean;
  required: boolean;
  email: boolean;
  isMinLength: boolean;
  isMaxLength: boolean;
  nullValidator: boolean;
  min?: string;
  max?: string;
  minLength?: string;
  maxLength?: string;
  pattern?: string;
}
