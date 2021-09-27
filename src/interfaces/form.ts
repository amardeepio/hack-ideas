import { HackIdea } from "./documentData";

export interface ChallengeDetailModalProps {
  show: boolean;
  toggleModal: () => void;
  title: string;
  data?: HackIdea;
  id?: string;
}

export interface FormFields {
  title: string;
  description: string;
  tags: string;
}