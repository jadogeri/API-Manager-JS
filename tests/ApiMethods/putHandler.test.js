
import ApiMethods from "../../src/entities/ApiMethods.js";


// src/entities/ApiMethods.test.js
describe('ApiMethods.putHandler() putHandler method', () => {
    let mockConfig;
    let mockFetch;

    beforeEach(() => {
        // Mock configuration object
        mockConfig = {
            getBaseUrl: jest.fn().mockReturnValue('https://api.example.com'),
            getHeaders: jest.fn().mockReturnValue({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token'
            })
        };

        // Mock global fetch
        mockFetch = jest.fn();
        global.fetch = mockFetch;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Happy Path Tests
    describe('Happy Paths', () => {
        it('should send a PUT request with the correct URL and headers', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };
            const responseData = { success: true };

            mockFetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(responseData)
            });

            // Act
            const result = await ApiMethods.putHandler(endpoint, data, mockConfig);

            // Assert
            expect(mockConfig.getBaseUrl).toHaveBeenCalled();
            expect(mockConfig.getHeaders).toHaveBeenCalled();
            expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token'
                },
                body: JSON.stringify(data)
            });
            expect(result).toEqual(responseData);
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        it('should handle an empty data object gracefully', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = {};
            const responseData = { success: true };

            mockFetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(responseData)
            });

            // Act
            const result = await ApiMethods.putHandler(endpoint, data, mockConfig);

            // Assert
            expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/test-endpoint', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer token'
                },
                body: JSON.stringify(data)
            });
            expect(result).toEqual(responseData);
        });

        it('should handle fetch rejection gracefully', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };
            const errorMessage = 'Network error';

            mockFetch.mockRejectedValueOnce(new Error(errorMessage));

            // Act & Assert
            await expect(ApiMethods.putHandler(endpoint, data, mockConfig)).rejects.toThrow(errorMessage);
        });

        it('should handle non-JSON response gracefully', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };

            mockFetch.mockResolvedValueOnce({
                json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON'))
            });

            // Act & Assert
            await expect(ApiMethods.putHandler(endpoint, data, mockConfig)).rejects.toThrow('Invalid JSON');
        });
    });
});