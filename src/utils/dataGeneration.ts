import { faker } from '@faker-js/faker';
import { User } from '../models/user.model';

export class UserDataGenerator {
    public static generateRandomUser(): User {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            jobTitle: faker.person.jobTitle(),
        };
    }

    public static generateCreateUserPayload(): { name: string; job: string } {
        return {
            name: faker.person.firstName(),
            job: faker.person.jobTitle(),
        };
    }

    public static generateAdminUser(overrides?: Partial<User>): User {
        const defaultAdmin: User = {
            firstName: 'Admin',
            lastName: faker.person.lastName(),
            email: `admin.${faker.internet.email()}`,
            jobTitle: 'QA Lead',
        };
        return { ...defaultAdmin, ...overrides };
    }
}