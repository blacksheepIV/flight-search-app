'use client'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  iataCode: string
  alt?: string
  width?: number
  height?: number
}

const AirlineLogo = ({
  iataCode,
  alt = iataCode,
  width = 350,
  height = 100,
}: Props) => {
  const [useFallback, setUseFallback] = useState(false)

  const localSrc = `/logos/${iataCode}.svg`
  const fallbackSrc = `https://content.airhex.com/content/logos/airlines_${iataCode}_350_100_r.png`

  return (
    <Image
      src={useFallback ? fallbackSrc : localSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setUseFallback(true)}
      style={{
        objectFit: 'contain',
        objectPosition: 'center center',
      }}
    />
  )
}

export default AirlineLogo
