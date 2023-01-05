interface IDrawerParent<T = any> {
  onParentClose?: (data?: T) => void;
  editData?: T | null;
  readonly?: boolean;
}
