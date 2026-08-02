import { faker } from '@faker-js/faker';

export function generateRandomNumber(length: number): string {
  return faker.string.numeric(length);
}

export function generateValueInRange(min: number, max: number): number {
  return faker.number.int({ min, max });
}

export function generateRandomString(length: number): string {
  return faker.string.alphanumeric(length);
}