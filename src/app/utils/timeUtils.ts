/**
 *
 * @param duration
 * @description format an ISO 8601 duration string
 * @returns string
 */
export const parseISODuration = (
  duration: string,
): { hours: number; minutes: number } => {
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/
  const match = duration.match(regex)
  return {
    hours: match?.[1] ? parseInt(match[1], 10) : 0,
    minutes: match?.[2] ? parseInt(match[2], 10) : 0,
  }
}

export const formatDuration = (duration: string): string => {
  const { hours, minutes } = parseISODuration(duration)

  if (hours && minutes) return `${hours}h ${minutes}m`
  if (hours) return `${hours}h`
  if (minutes) return `${minutes}m`
  return '0m'
}

export const parseDurationToMinutes = (duration: string): number => {
  const { hours, minutes } = parseISODuration(duration)
  return hours * 60 + minutes
}
