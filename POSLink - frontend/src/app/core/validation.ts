import { AbstractControl } from '@angular/forms';

/* Example of custom validation for form example */
export function sidekickControl(control: AbstractControl) {
  if (control.value !== 'Batman') {
    return { validsidekick: true };
  }
  return null;
}

/* E-mail validation */
export function validateEmail(control: AbstractControl) {
  const EMAIL_REGEXP = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if (control.value !== '' && control.value !== null && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return { validEmail: true };
  }
  return null;
}

/* Postal code validation */
export function validateZipcode(control: AbstractControl) {
  if (control.value !== '' && control.value.length !== 4 ) {
    return { validZipcode: true };
  }
  return null;
}

/* longitude */
export function validateLongitude(control: AbstractControl) {
  if (control.value > 180) {
    return { validLongitude: true };
  }
  return null;
}

/* lattitude */
export function validateLatitude(control: AbstractControl) {
  if (control.value > 90) {
    return { validLatitude: true };
  }
  return null;
}
