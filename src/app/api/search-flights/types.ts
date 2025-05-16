import type { Meta } from '@/app/types/sharedApiTypes'

export interface GetFlightsResponse {
  meta: Meta
  data: Flight[]
  dictionaries: Dictionaries
}

export interface Flight {
  type: string
  id: string
  source: string
  instantTicketingRequired: boolean
  nonHomogeneous: boolean
  oneWay: boolean
  lastTicketingDate: Date
  numberOfBookableSeats: number
  itineraries: Itinerary[]
  price: FlightPrice
  pricingOptions: PricingOptions
  validatingAirlineCodes: string[]
  travelerPricings: TravelerPricing[]
}

export interface Itinerary {
  duration: string
  segments: Segment[]
}

export interface Segment {
  departure: Arrival
  arrival: Arrival
  carrierCode: string
  number: string
  aircraft: Aircraft
  operating: Operating
  duration: string
  id: string
  numberOfStops: number
  blacklistedInEU: boolean
}

export interface Aircraft {
  code: string
}

export interface Arrival {
  iataCode: string
  terminal?: string
  at: Date
}

export interface Operating {
  carrierCode: string
}

export interface FlightPrice {
  currency: string
  total: string
  base: string
  fees: Fee[]
  grandTotal: string
}

export interface Fee {
  amount: string
  type: string
}

export interface PricingOptions {
  fareType: string[]
  includedCheckedBagsOnly: boolean
}

export interface TravelerPricing {
  travelerId: string
  fareOption: string
  travelerType: string
  price: TravelerPricingPrice
  fareDetailsBySegment: FareDetailsBySegment[]
}

export interface FareDetailsBySegment {
  segmentId: string
  cabin: string
  fareBasis: string
  class: string
  includedCheckedBags: IncludedCheckedBags
}

export interface IncludedCheckedBags {
  weight: number
  weightUnit: string
}

export interface TravelerPricingPrice {
  currency: string
  total: string
  base: string
}

export interface Dictionaries {
  locations: { [key: string]: Location }
  aircraft: { [key: string]: string }
  currencies: string
  carriers: string
}

export interface Location {
  cityCode: string
  countryCode: string
}
