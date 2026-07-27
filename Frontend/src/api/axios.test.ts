import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import api from './axios';

describe('axios auth interceptor', () => {
  const originalLocalStorage = window.localStorage;

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key: string) => {
          if (key === 'token') return 'test-token';
          return null;
        }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
    });
  });

  it('attaches the bearer token from localStorage to requests', async () => {
    const response = await api.get('/jobs', {
      adapter: async (config) => {
        return {
          data: [],
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        };
      },
    });

    expect(response.config.headers?.Authorization).toBe('Bearer test-token');
  });
});
