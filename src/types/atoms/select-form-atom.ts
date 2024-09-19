export interface Option {
  value: string;
  label: string;
}

export interface SelectFormAtomProps {
  idSelect: string;
  name: string;
  value: string;
  options: Option[];
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
