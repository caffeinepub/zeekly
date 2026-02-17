/**
 * Safely parse and format Post.datePublished (bigint) into a valid JS Date.
 * Handles common epoch unit mismatches (microseconds/nanoseconds) and invalid values.
 */

export interface SafeDate {
  /** Human-readable formatted date string, or fallback if invalid */
  label: string;
  /** ISO 8601 string for <time dateTime>, or null if invalid */
  isoString: string | null;
  /** Whether the date was successfully parsed */
  isValid: boolean;
}

/**
 * Normalize a bigint timestamp to milliseconds, handling common unit mismatches.
 * Returns null if the value cannot be converted to a valid JS Date.
 */
function normalizeToMilliseconds(timestamp: bigint): number | null {
  try {
    const num = Number(timestamp);
    
    // Check for NaN or Infinity
    if (!Number.isFinite(num)) {
      return null;
    }

    // If the number is too large (likely microseconds or nanoseconds), scale it down
    // JS Date max is ~8.64e15 milliseconds (year ~275760)
    // Timestamps > 1e15 are likely microseconds (1e6 multiplier) or nanoseconds (1e9)
    if (num > 1e15) {
      // Try microseconds (divide by 1e6)
      const fromMicros = num / 1e6;
      if (fromMicros > 0 && fromMicros < 8.64e15) {
        return fromMicros;
      }
      // Try nanoseconds (divide by 1e9)
      const fromNanos = num / 1e9;
      if (fromNanos > 0 && fromNanos < 8.64e15) {
        return fromNanos;
      }
      return null;
    }

    // If the number is too small (likely seconds), scale it up
    if (num > 0 && num < 1e11) {
      // Likely seconds since epoch (multiply by 1000)
      return num * 1000;
    }

    // Assume milliseconds
    return num;
  } catch {
    return null;
  }
}

/**
 * Safely parse a Post.datePublished bigint into a formatted date.
 * Returns a safe fallback if the date is invalid or unparseable.
 */
export function safeFormatPostDate(
  datePublished: bigint | undefined | null,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): SafeDate {
  // Handle missing/null/undefined
  if (datePublished == null) {
    return {
      label: 'Date unknown',
      isoString: null,
      isValid: false,
    };
  }

  const ms = normalizeToMilliseconds(datePublished);
  if (ms === null) {
    return {
      label: 'Date unknown',
      isoString: null,
      isValid: false,
    };
  }

  try {
    const date = new Date(ms);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return {
        label: 'Date unknown',
        isoString: null,
        isValid: false,
      };
    }

    // Format the date
    const label = date.toLocaleDateString('en-US', options);
    const isoString = date.toISOString();

    return {
      label,
      isoString,
      isValid: true,
    };
  } catch {
    return {
      label: 'Date unknown',
      isoString: null,
      isValid: false,
    };
  }
}
