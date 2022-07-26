export interface SidebarMenus {
    label: string;
    path: string;
    iconClass: string;
    title?: string;
    children?: Array<SidebarMenus>;
}