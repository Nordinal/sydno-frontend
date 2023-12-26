import {
  ICreateAdStepTwo as ILegalInformation,
  ICreateAdStepThree as ITechnicalInformation,
} from "@/entities/createAd/model";

export interface IAdvertListItem {
  id: number;
  user_id: number;
  updated_at: string;
  created_at: string;
  header: string;
  price: number;
  description: string;
  registration_number: string;
  phone_number: string;
  images: string[];
  advert_legal_information: ILegalInformation;
  advert_technical_information: ITechnicalInformation;
}
