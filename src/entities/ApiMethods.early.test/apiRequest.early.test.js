
import ApiMethods from '../ApiMethods';


// src/entities/ApiMethods.test.js
// Mock the fetch function globally
global.fetch = jest.fn();

describe('ApiMethods.apiRequest() apiRequest method', () => {
    let config;
    let baseUrl;
    let headers;

    beforeEach(() => {
        // Reset the fetch mock before each test
        fetch.mockClear();

        // Mock configuration object
        baseUrl = 'https://api.example.com';
        headers = { 'Content-Type': 'application/json' };
        config = {
            getBaseUrl: jest.fn(() => baseUrl),
            getHeaders: jest.fn(() => headers),
        };
    });

    // Happy Path Tests
    describe('Happy Paths', () => {
        it('should successfully make a GET request and return JSON response', async () => {
            const endpoint = '/data';
            const responseData = { success: true };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(responseData),
            });

            const result = await ApiMethods.apiRequest(config, 'GET', endpoint);

            expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}`, {
                method: 'GET',
                headers: headers,
                body: undefined,
            });
            expect(result).toEqual(responseData);
        });

        it('should successfully make a POST request with a body and return JSON response', async () => {
            const endpoint = '/submit';
            const requestBody = { name: 'John Doe' };
            const responseData = { success: true };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(responseData),
            });

            const result = await ApiMethods.apiRequest(config, 'POST', endpoint, requestBody);

            expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody),
            });
            expect(result).toEqual(responseData);
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        it('should handle fetch failure and reject with an error', async () => {
            const endpoint = '/error';
            const errorMessage = 'Network error';
            fetch.mockRejectedValueOnce(new Error(errorMessage));

            await expect(ApiMethods.apiRequest(config, 'GET', endpoint)).rejects.toThrow(errorMessage);
        });

        it('should handle empty body correctly for POST request', async () => {
            const endpoint = '/empty-body';
            const responseData = { success: true };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(responseData),
            });

            const result = await ApiMethods.apiRequest(config, 'POST', endpoint);

            expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: headers,
                body: undefined,
            });
            expect(result).toEqual(responseData);
        });

        it('should handle undefined base URL in config', async () => {
            config.getBaseUrl = jest.fn(() => undefined);
            const endpoint = '/no-base-url';

            await expect(ApiMethods.apiRequest(config, 'GET', endpoint)).rejects.toThrow();
        });

        it('should handle undefined headers in config', async () => {
            config.getHeaders = jest.fn(() => undefined);
            const endpoint = '/no-headers';
            const responseData = { success: true };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(responseData),
            });

            const result = await ApiMethods.apiRequest(config, 'GET', endpoint);

            expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}`, {
                method: 'GET',
                headers: undefined,
                body: undefined,
            });
            expect(result).toEqual(responseData);
        });
    });
});