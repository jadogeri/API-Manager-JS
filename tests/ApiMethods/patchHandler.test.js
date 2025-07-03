
import ApiMethods from "../../src/entities/ApiMethods.js";


// Import necessary modules
// Mock the fetch function globally
global.fetch = jest.fn();

describe('ApiMethods.patchHandler() patchHandler method', () => {
    let config;
    let endpoint;
    let data;

    beforeEach(() => {
        // Reset the fetch mock before each test
        fetch.mockClear();

        // Set up default values for the tests
        config = {
            getBaseUrl: jest.fn(() => 'https://api.example.com'),
            getHeaders: jest.fn(() => ({ 'Content-Type': 'application/json' }))
        };
        endpoint = '/test-endpoint';
        data = { key: 'value' };
    });

    describe('Happy paths', () => {
        it('should send a PATCH request with the correct URL, headers, and body', async () => {
            // Arrange
            const responseData = { success: true };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(responseData)
            });

            // Act
            const response = await ApiMethods.patchHandler(endpoint, data, config);

            // Assert
            expect(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            expect(response).toEqual(responseData);
        });

        it('should handle an empty body correctly', async () => {
            // Arrange
            const responseData = { success: true };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(responseData)
            });

            // Act
            const response = await ApiMethods.patchHandler(endpoint, null, config);

            // Assert
            expect(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: undefined
            });
            expect(response).toEqual(responseData);
        });
    });

    describe('Edge cases', () => {
        it('should throw an error if fetch fails', async () => {
            // Arrange
            const errorMessage = 'Network error';
            fetch.mockRejectedValueOnce(new Error(errorMessage));

            // Act & Assert
            await expect(ApiMethods.patchHandler(endpoint, data, config)).rejects.toThrow(errorMessage);
        });

        it('should handle non-JSON response gracefully', async () => {
            // Arrange
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON'))
            });

            // Act & Assert
            await expect(ApiMethods.patchHandler(endpoint, data, config)).rejects.toThrow('Invalid JSON');
        });

        it('should handle missing base URL in config', async () => {
            // Arrange
            config.getBaseUrl = jest.fn(() => undefined);

            // Act & Assert
            await expect(ApiMethods.patchHandler(endpoint, data, config)).rejects.toThrow();
        });

        it('should handle missing headers in config', async () => {
            // Arrange
            config.getHeaders = jest.fn(() => undefined);

            // Act
            const responseData = { success: true };
            fetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(responseData)
            });

            // Act
            const response = await ApiMethods.patchHandler(endpoint, data, config);

            // Assert
            expect(fetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', {
                method: 'PATCH',
                headers: undefined,
                body: JSON.stringify(data)
            });
            expect(response).toEqual(responseData);
        });
    });
});