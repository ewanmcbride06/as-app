export interface TimezoneOption {
  value: string;
  label: string;
  offset: string;
  flag: string;
}

export const timezones: TimezoneOption[] = [
  // Americas
  { value: "Pacific/Honolulu", label: "Hawaii (HST)", offset: "UTC-10", flag: "🇺🇸" },
  { value: "America/Anchorage", label: "Alaska (AKST)", offset: "UTC-9", flag: "🇺🇸" },
  { value: "America/Los_Angeles", label: "Pacific Time (PST)", offset: "UTC-8", flag: "🇺🇸" },
  { value: "America/Denver", label: "Mountain Time (MST)", offset: "UTC-7", flag: "🇺🇸" },
  { value: "America/Chicago", label: "Central Time (CST)", offset: "UTC-6", flag: "🇺🇸" },
  { value: "America/New_York", label: "Eastern Time (EST)", offset: "UTC-5", flag: "🇺🇸" },
  { value: "America/Halifax", label: "Atlantic Time (AST)", offset: "UTC-4", flag: "🇨🇦" },
  { value: "America/St_Johns", label: "Newfoundland (NST)", offset: "UTC-3:30", flag: "🇨🇦" },
  { value: "America/Sao_Paulo", label: "Brasília (BRT)", offset: "UTC-3", flag: "🇧🇷" },
  { value: "America/Argentina/Buenos_Aires", label: "Buenos Aires (ART)", offset: "UTC-3", flag: "🇦🇷" },
  { value: "America/Mexico_City", label: "Mexico City (CST)", offset: "UTC-6", flag: "🇲🇽" },
  { value: "America/Bogota", label: "Bogotá (COT)", offset: "UTC-5", flag: "🇨🇴" },
  { value: "America/Lima", label: "Lima (PET)", offset: "UTC-5", flag: "🇵🇪" },
  { value: "America/Santiago", label: "Santiago (CLT)", offset: "UTC-3", flag: "🇨🇱" },
  { value: "America/Toronto", label: "Toronto (EST)", offset: "UTC-5", flag: "🇨🇦" },
  { value: "America/Vancouver", label: "Vancouver (PST)", offset: "UTC-8", flag: "🇨🇦" },

  // Europe
  { value: "Atlantic/Reykjavik", label: "Reykjavik (GMT)", offset: "UTC+0", flag: "🇮🇸" },
  { value: "Europe/London", label: "London (GMT)", offset: "UTC+0", flag: "🇬🇧" },
  { value: "Europe/Dublin", label: "Dublin (GMT)", offset: "UTC+0", flag: "🇮🇪" },
  { value: "Europe/Lisbon", label: "Lisbon (WET)", offset: "UTC+0", flag: "🇵🇹" },
  { value: "Europe/Paris", label: "Paris (CET)", offset: "UTC+1", flag: "🇫🇷" },
  { value: "Europe/Berlin", label: "Berlin (CET)", offset: "UTC+1", flag: "🇩🇪" },
  { value: "Europe/Madrid", label: "Madrid (CET)", offset: "UTC+1", flag: "🇪🇸" },
  { value: "Europe/Rome", label: "Rome (CET)", offset: "UTC+1", flag: "🇮🇹" },
  { value: "Europe/Amsterdam", label: "Amsterdam (CET)", offset: "UTC+1", flag: "🇳🇱" },
  { value: "Europe/Brussels", label: "Brussels (CET)", offset: "UTC+1", flag: "🇧🇪" },
  { value: "Europe/Zurich", label: "Zurich (CET)", offset: "UTC+1", flag: "🇨🇭" },
  { value: "Europe/Stockholm", label: "Stockholm (CET)", offset: "UTC+1", flag: "🇸🇪" },
  { value: "Europe/Oslo", label: "Oslo (CET)", offset: "UTC+1", flag: "🇳🇴" },
  { value: "Europe/Copenhagen", label: "Copenhagen (CET)", offset: "UTC+1", flag: "🇩🇰" },
  { value: "Europe/Warsaw", label: "Warsaw (CET)", offset: "UTC+1", flag: "🇵🇱" },
  { value: "Europe/Athens", label: "Athens (EET)", offset: "UTC+2", flag: "🇬🇷" },
  { value: "Europe/Helsinki", label: "Helsinki (EET)", offset: "UTC+2", flag: "🇫🇮" },
  { value: "Europe/Bucharest", label: "Bucharest (EET)", offset: "UTC+2", flag: "🇷🇴" },
  { value: "Europe/Istanbul", label: "Istanbul (TRT)", offset: "UTC+3", flag: "🇹🇷" },
  { value: "Europe/Moscow", label: "Moscow (MSK)", offset: "UTC+3", flag: "🇷🇺" },
  { value: "Europe/Kiev", label: "Kyiv (EET)", offset: "UTC+2", flag: "🇺🇦" },

  // Africa
  { value: "Africa/Cairo", label: "Cairo (EET)", offset: "UTC+2", flag: "🇪🇬" },
  { value: "Africa/Lagos", label: "Lagos (WAT)", offset: "UTC+1", flag: "🇳🇬" },
  { value: "Africa/Johannesburg", label: "Johannesburg (SAST)", offset: "UTC+2", flag: "🇿🇦" },
  { value: "Africa/Nairobi", label: "Nairobi (EAT)", offset: "UTC+3", flag: "🇰🇪" },
  { value: "Africa/Casablanca", label: "Casablanca (WET)", offset: "UTC+1", flag: "🇲🇦" },

  // Middle East
  { value: "Asia/Dubai", label: "Dubai (GST)", offset: "UTC+4", flag: "🇦🇪" },
  { value: "Asia/Riyadh", label: "Riyadh (AST)", offset: "UTC+3", flag: "🇸🇦" },
  { value: "Asia/Tehran", label: "Tehran (IRST)", offset: "UTC+3:30", flag: "🇮🇷" },
  { value: "Asia/Jerusalem", label: "Jerusalem (IST)", offset: "UTC+2", flag: "🇮🇱" },

  // Asia
  { value: "Asia/Karachi", label: "Karachi (PKT)", offset: "UTC+5", flag: "🇵🇰" },
  { value: "Asia/Kolkata", label: "Mumbai (IST)", offset: "UTC+5:30", flag: "🇮🇳" },
  { value: "Asia/Dhaka", label: "Dhaka (BST)", offset: "UTC+6", flag: "🇧🇩" },
  { value: "Asia/Bangkok", label: "Bangkok (ICT)", offset: "UTC+7", flag: "🇹🇭" },
  { value: "Asia/Jakarta", label: "Jakarta (WIB)", offset: "UTC+7", flag: "🇮🇩" },
  { value: "Asia/Singapore", label: "Singapore (SGT)", offset: "UTC+8", flag: "🇸🇬" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", offset: "UTC+8", flag: "🇭🇰" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)", offset: "UTC+8", flag: "🇨🇳" },
  { value: "Asia/Taipei", label: "Taipei (CST)", offset: "UTC+8", flag: "🇹🇼" },
  { value: "Asia/Seoul", label: "Seoul (KST)", offset: "UTC+9", flag: "🇰🇷" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)", offset: "UTC+9", flag: "🇯🇵" },
  { value: "Asia/Manila", label: "Manila (PHT)", offset: "UTC+8", flag: "🇵🇭" },
  { value: "Asia/Kuala_Lumpur", label: "Kuala Lumpur (MYT)", offset: "UTC+8", flag: "🇲🇾" },

  // Oceania
  { value: "Australia/Perth", label: "Perth (AWST)", offset: "UTC+8", flag: "🇦🇺" },
  { value: "Australia/Adelaide", label: "Adelaide (ACST)", offset: "UTC+9:30", flag: "🇦🇺" },
  { value: "Australia/Sydney", label: "Sydney (AEST)", offset: "UTC+10", flag: "🇦🇺" },
  { value: "Australia/Melbourne", label: "Melbourne (AEST)", offset: "UTC+10", flag: "🇦🇺" },
  { value: "Australia/Brisbane", label: "Brisbane (AEST)", offset: "UTC+10", flag: "🇦🇺" },
  { value: "Pacific/Auckland", label: "Auckland (NZST)", offset: "UTC+12", flag: "🇳🇿" },
  { value: "Pacific/Fiji", label: "Fiji (FJT)", offset: "UTC+12", flag: "🇫🇯" },
];

/**
 * Get the user's local timezone IANA identifier.
 */
export function getLocalTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Find the matching TimezoneOption for a given IANA timezone string,
 * falling back to UTC if not found.
 */
export function findTimezoneOption(tz: string): TimezoneOption {
  return (
    timezones.find((t) => t.value === tz) ?? {
      value: tz,
      label: tz,
      offset: "",
      flag: "🌐",
    }
  );
}

/**
 * Format a time string (e.g. "6:00 pm") from its original timezone context
 * to the target timezone. Since mock data doesn't store real timezone info,
 * this converts the meetingDate + meetingTime to a display string in the target tz.
 */
export function formatTimeInTimezone(
  meetingDate: Date,
  meetingTime: string,
  targetTimezone: string
): string {
  // Parse the meeting time
  const match = meetingTime.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (!match) return meetingTime;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toLowerCase();

  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;

  // Create a date with the meeting's time (assumed UTC for mock data)
  const date = new Date(
    Date.UTC(
      meetingDate.getFullYear(),
      meetingDate.getMonth(),
      meetingDate.getDate(),
      hours,
      minutes
    )
  );

  // Format in the target timezone
  return date.toLocaleTimeString("en-US", {
    timeZone: targetTimezone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();
}
