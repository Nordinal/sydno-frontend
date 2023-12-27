
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
  // Илья, мои типы только для создания объявления, у меня хранятся первичные ключи из бд в полях, у вас должен текст быть
  advert_legal_information: any;
  advert_technical_information: any;
}
