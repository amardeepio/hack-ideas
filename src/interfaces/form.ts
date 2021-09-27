import { HackIdea } from "./documentData";

export interface IdeaDetailModalProps {
  show: boolean;
  toggleModal: () => void;
  title: string;
  data?: FormFields;
  id?: string;
}

export interface FormFields {
  title: string;
  description: string;
  tags: string;
}