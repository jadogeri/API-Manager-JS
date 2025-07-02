
import ApiMethods from '../ApiMethods';


// src/entities/ApiMethods.test.js
describe('ApiMethods.postHandler() postHandler method', () => {
    let mockConfig;
    let mockFetch;

    beforeEach(() => {
        // Mock configuration object
        mockConfig = {
            getBaseUrl: jest.fn().mockReturnValue('https://api.example.com'),
            getHeaders: jest.fn().mockReturnValue({
                'Content-Type': 'application/json',
            }),
        };

        // Mock global fetch
        mockFetch = jest.fn();
        global.fetch = mockFetch;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Happy paths', () => {
        it('should send a POST request with the correct URL, headers, and body', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };
            const responseData = { success: true };

            mockFetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(responseData),
            });

            // Act
            const result = await ApiMethods.postHandler(endpoint, data, mockConfig);

            // Assert
            expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            expect(result).toEqual(responseData);
        });

        it('should handle an empty body correctly', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const responseData = { success: true };

            mockFetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(responseData),
            });

            // Act
            const result = await ApiMethods.postHandler(endpoint, undefined, mockConfig);

            // Assert
            expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: undefined,
            });
            expect(result).toEqual(responseData);
        });
    });

    describe('Edge cases', () => {
        it('should throw an error if fetch fails', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };
            const errorMessage = 'Network error';

            mockFetch.mockRejectedValueOnce(new Error(errorMessage));

            // Act & Assert
            await expect(ApiMethods.postHandler(endpoint, data, mockConfig)).rejects.toThrow(errorMessage);
        });

        it('should handle non-JSON response gracefully', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };

            mockFetch.mockResolvedValueOnce({
                json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
            });

            // Act & Assert
            await expect(ApiMethods.postHandler(endpoint, data, mockConfig)).rejects.toThrow('Invalid JSON');
        });

        it('should handle missing base URL in config', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };

            mockConfig.getBaseUrl = jest.fn().mockReturnValue(undefined);

            // Act & Assert
            await expect(ApiMethods.postHandler(endpoint, data, mockConfig)).rejects.toThrow();
        });
    });
});