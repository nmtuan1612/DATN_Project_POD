export type TabType = {
  name: 'colorpicker' | 'filepicker' | 'aipicker' | 'logoTab' | 'stylishTab'
  // tag: 'Edit' | 'Upload' | 'Ask AI'
  tag: string
  icon: any
}

export type PrintOptions = {
  scale?: number
  position?: 'left' | 'right' | 'center'
  side?: 'front' | 'back'
}
