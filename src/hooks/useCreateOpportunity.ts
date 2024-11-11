
export type OpportunityType = {
  id: number;
  client_id: number;
  business_name: string;
  business_line: string;
  opportunity_description: string;
  estimated_value: number;
  estimated_date: string; // Si deseas manejar esto como Date, puedes convertirlo después
  status: string;
};

