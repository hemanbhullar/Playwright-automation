import { APIRequestContext, APIResponse } from '@playwright/test';
import { Config } from '../config/env.config';

export class UserApiClient {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  public async createUser(userPayload: { name: string; job: string }): Promise<APIResponse> {
    return await this.request.post(`${Config.base_url}/users`, {
      data: userPayload,
      headers: this.getHeaders(),
    });
  }

  public async getUserById(userId: string | number): Promise<APIResponse> {
    return await this.request.get(`${Config.base_url}/users/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  public async updateUser(userId: string | number, updatePayload: { name: string; job: string }): Promise<APIResponse> {
    return await this.request.put(`${Config.base_url}/users/${userId}`, {
      data: updatePayload,
      headers: this.getHeaders(),
    });
  }

  public async deleteUser(userId: string | number): Promise<APIResponse> {
    return await this.request.delete(`${Config.base_url}/users/${userId}`, {
      headers: this.getHeaders(),
    });
  }
}