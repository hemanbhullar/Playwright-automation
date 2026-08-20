import { test, expect } from '@playwright/test';
import { UserApiClient } from '../../services/userApiClient';
import { UserDataGenerator } from '../../utils/dataGeneration';
import { CreateUserResponse, SingleUserResponse, UpdateUserResponse } from '../../models/api.model';

test.describe('API Automation Suite: User Management CRUD Operations', () => {
    let userApiClient: UserApiClient;

    test.beforeEach(async ({ request }) => {
        userApiClient = new UserApiClient(request);
    });

    test('POST /users - Create User Successfully', async () => {
        const payload = UserDataGenerator.generateCreateUserPayload();
        const response = await userApiClient.createUser(payload);

        expect(response.status()).toBe(201);
        expect(response.ok()).toBeTruthy();

        const responseBody: CreateUserResponse = await response.json();
        expect(responseBody.name).toBe(payload.name);
        expect(responseBody.job).toBe(payload.job);
        expect(responseBody.id).toBeDefined(); // Validated ID creation (no createdAt in JSONPlaceholder)
    });

    test('GET /users/{id} - Fetch User Details', async () => {
        const userId = 2;
        const response = await userApiClient.getUserById(userId);

        expect(response.status()).toBe(200);

        const responseBody: SingleUserResponse = await response.json();
        expect(responseBody.id).toBe(userId); // Accessed directly without .data wrapper
        expect(responseBody.email).toContain('@');
    });

    test('PUT /users/{id} - Update Existing User', async () => {
        const userId = 2;
        const updatePayload = UserDataGenerator.generateCreateUserPayload();

        const response = await userApiClient.updateUser(userId, updatePayload);

        expect(response.status()).toBe(200);

        const responseBody: UpdateUserResponse = await response.json();
        expect(responseBody.name).toBe(updatePayload.name);
        expect(responseBody.job).toBe(updatePayload.job); // Validated payload update (no updatedAt in JSONPlaceholder)
    });

    test('DELETE /users/{id} - Delete User Successfully', async () => {
        const userId = 2;
        const response = await userApiClient.deleteUser(userId);

        expect(response.status()).toBe(200); // JSONPlaceholder returns 200 for successful deletion
    });
});