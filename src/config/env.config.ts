import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface EnvConfig {
    base_url: string;
    api_token: string;
    env: string;
}

const getEnvConfig = (): EnvConfig => {
    const base_url = process.env.BASE_URL || '';
    const api_token = process.env.API_TOKEN || '';
    const env = process.env.ENV || '';

    if(!base_url) {
        throw new Error('BASE_URL is not defined in the environment variables.');
    }

    return {
        base_url,
        api_token: api_token || '',
        env
    };
};

export const Config = getEnvConfig();

