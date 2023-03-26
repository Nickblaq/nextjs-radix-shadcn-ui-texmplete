export interface SubMenu {
  title: string
  description?: string
  href?: string
  disabled?: boolean
  external?: boolean
}


export interface NavItem {
  title: string
  description?: string
  subMenu?: SubMenu[]
  href?: string
  disabled?: boolean
  external?: boolean
}
