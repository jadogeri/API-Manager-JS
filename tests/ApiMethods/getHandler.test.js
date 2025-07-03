
import ApiMethods from "../../src/entities/ApiMethods.js";


// Mock the fetch function globally
global.fetch = jest.fn();

describe('ApiMethods.getHandler() getHandler method', () => {
    let config;

    beforeEach(() => {
        // Reset the fetch mock before each test
        fetch.mockClear();

        // Mock configuration object
        config = {
            getBaseUrl: jest.fn(() => 'https://api.example.com'),
            getHeaders: jest.fn(() => ({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token'
            }))
        };
    });

    describe('Happy paths', () => {
        it('should successfully fetch data from the API', async () => {
            // Mock a successful fetch response
            const mockResponse = { data: 'test data' };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockResponse)
            });

            const endpoint = '/test-endpoint';
            const result = await ApiMethods.getHandler(endpoint, config);

            expect(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token'
                },
                body: undefined
            });
            expect(result).toEqual(mockResponse);
        });
    });

    describe('Edge cases', () => {
        it('should handle fetch failure gracefully', async () => {
            // Mock a fetch failure
            const mockError = new Error('Network error');
            fetch.mockRejectedValueOnce(mockError);

            const endpoint = '/test-endpoint';

            await expect(ApiMethods.getHandler(endpoint, config)).rejects.toThrow('Network error');
        });

        it('should handle empty endpoint gracefully', async () => {
            // Mock a successful fetch response
            const mockResponse = { data: 'test data' };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockResponse)
            });

            const endpoint = '';
            const result = await ApiMethods.getHandler(endpoint, config);

            expect(fetch).toHaveBeenCalledWith('https://api.example.com', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token'
                },
                body: undefined
            });
            expect(result).toEqual(mockResponse);
        });

        it('should handle missing headers in config gracefully', async () => {
            // Mock configuration object with missing headers
            const configWithoutHeaders = {
                getBaseUrl: jest.fn(() => 'https://api.example.com'),
                getHeaders: jest.fn(() => undefined)
            };

            // Mock a successful fetch response
            const mockResponse = { data: 'test data' };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockResponse)
            });

            const endpoint = '/test-endpoint';
            const result = await ApiMethods.getHandler(endpoint, configWithoutHeaders);

            expect(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', {
                method: 'GET',
                headers: undefined,
                body: undefined
            });
            expect(result).toEqual(mockResponse);
        });
    });
});