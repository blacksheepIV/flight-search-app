import type { Meta } from '@/app/types/sharedApiTypes'

export interface GetLocationsResponse {
  meta: Meta
  data: Location[]
}

export interface Location {
  type: string
  subType: string
  name: string
  detailedName: string
  id: string
  self: Self
  timeZoneOffset: string
  iataCode: string
  geoCode: GeoCode
  address: Address
  analytics: Analytics
}

export interface Address {
  cityName: string
  cityCode: string
  countryName: string
  countryCode: string
  regionCode: string
}

export interface Analytics {
  travelers: Travelers
}

export interface Travelers {
  score: number
}

export interface GeoCode {
  latitude: number
  longitude: number
}

export interface Self {
  href: string
  methods: string[]
}
