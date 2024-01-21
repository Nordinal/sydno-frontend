export interface IReceivedAdvert {
  id: number;
  user_id: number;
  registration_number: string;
  price: number;
  state?: number;
  images: string[];
  header: string;
  description: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
  };
  advert_legal_information: AdvertLegalInformation;
  advert_technical_information: AdvertTechnicalInformation;
}

interface PortAddress {
  value: string;
  city: string | null;
  country: string;
  region: string | null;
}

interface VesselLocation extends PortAddress {}

interface AdvertLegalInformation {
  id: number;
  advert_id: number;
  flag: string;
  exploitation_type: string;
  class_formula: string;
  wave_limit: string;
  ice_strengthening: boolean;
  type: string;
  purpose: string;
  was_registered: boolean;
  register_valid_until: string;
  vessel_status: string;
  project_number: string;
  building_number: string;
  building_year: number;
  building_country: string;
  port_address: PortAddress;
  vessel_location: VesselLocation;
  imo_number: string;
  created_at: string;
  updated_at: string;
}

interface AdvertTechnicalInformation {
  id: number;
  advert_id: number;
  overall_length: string;
  overall_width: string;
  board_height: string;
  maximum_freeboard: string;
  material: string;
  deadweight: string;
  dock_weight: string;
  full_displacement: string;
  gross_tonnage: string;
  num_engines: number;
  num_additional_engines: number;
  power: string;
  maximum_speed_in_ballast: string;
  maximum_speed_when_loaded: string;
  cargo_tanks: boolean;
  total_capacity_cargo_tanks: number | null;
  second_bottom: boolean;
  second_sides: boolean;
  carrying: string;
  superstructures: boolean;
  liquid_tanks: boolean;
  total_capacity_liquid_tanks: number | null;
  passangers_avialable: boolean;
  num_passangers: number | null;
  technical_documentation: boolean;
  created_at: string;
  updated_at: string;
}
