/**
 * Date uitlity for default date of birth.
 *
 */

const DEFAULT_AGE = 25;

/**
 * Get a default date of birth (DEFAULT_AGE years ago).
 * @returns Date representing a sensible default for the picker
 */
export function getDefaultDateOfBirth(): Date {
	const date = new Date();
	date.setFullYear(date.getFullYear() - DEFAULT_AGE);
	return date;
}
