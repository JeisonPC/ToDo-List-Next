export interface Option {
  value: string;
  label: string;
}

export interface SelectFormAtomProps {
  status: string;
  options: Option[];
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
