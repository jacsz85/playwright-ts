import { faker } from '@faker-js/faker';

export function generateRandomNumber(length: number): string {
  return faker.string.numeric(length);
}

export function generateRandomString(length: number): string {
  return faker.string.alphanumeric(length);
}