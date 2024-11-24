export interface Followup {
    id: number;
    opportunity_id: number;
    contact_type: string;
    contact_date: string;
    client_contact: {
      firstname: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
    executive: string;
    followup_description: string;
}

export interface TotalValueByClient {
  clientId: number;
  clientName: string;
  totalEstimatedValue: number;
  totalExecutedValue: number;
}

export interface DashboardData {
  totalValueByClient: TotalValueByClient[];
  opportunityStateDistribution: {
    state: string;
    count: number;
  }[];
  opportunityBusinessLinePercentage: {
    businessLine: string;
    percentage: number;
  }[];
}