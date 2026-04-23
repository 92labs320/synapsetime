import { NextResponse } from 'next/server'
import citiesData from '@/data/cities.json'

export async function GET() {
  return NextResponse.json(citiesData)
}
