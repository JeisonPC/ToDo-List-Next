import React from "react";
import TitleAtom from "../atoms/title-atom";
import DescriptionAtom from "../atoms/description-atom";
import { InformationMoleculeProps } from "@/types/molecules/Information-molecule";

export const InformationMolecule = ({
  title,
  description,
}: InformationMoleculeProps) => {
  return (
    <div>
      <TitleAtom title={title} />
      <DescriptionAtom description={description} />
    </div>
  );
};
