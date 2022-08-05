export interface GridColumns {
    title: string;
    sort: boolean;
    key: string;
    filter: ColumnFilter;
    type?: string;
}

export interface ColumnFilter {
    type: string;
}

export interface ActionColumn {
    title: string;
    matIconName?: string;
    link?: string;
}