import { test, expect } from '@playwright/test';
import { Config} from '../config/env.config';
import { UserDataGenerator } from '../utils/dataGeneration';


test.describe('Phase 1 Verification: Environment & Data Loading', () => {
    test('Verify Environment Configuration Loaded Correctly', async () => {
        console.log(`Current Testing Environment: ${Config.env}`);
        console.log(`Base URL Configured: ${Config.base_url}`);

        expect(Config.base_url).toBeDefined();
        expect(Config.base_url).toContain('http');
    });
    
    test('Verify Dynamic Data Generation for User Model', async () => {
        const randomUser = UserDataGenerator.generateRandomUser();
        console.log('Generated Random User:', randomUser);

        expect(randomUser.email).toContain('@');
        expect(randomUser.firstName.length).toBeGreaterThan(0);
        expect(randomUser.jobTitle).not.toBeNull();
    });
});