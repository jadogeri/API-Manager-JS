
import ApiMethods from '../ApiMethods';


describe('ApiMethods.deleteHandler() deleteHandler method', () => {
    let mockConfig;
    let mockFetch;

    beforeEach(() => {
        // Mock configuration object
        mockConfig = {
            getBaseUrl: jest.fn().mockReturnValue('https://api.example.com'),
            getHeaders: jest.fn().mockReturnValue({ 'Content-Type': 'application/json' })
        };

        // Mock global fetch
        mockFetch = jest.fn();
        global.fetch = mockFetch;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Happy paths', () => {
        it('should successfully send a DELETE request to the correct URL', async () => {
            // Arrange
            const endpoint = '/resource/123';
            const expectedUrl = 'https://api.example.com/resource/123';
            const mockResponse = { success: true };
            mockFetch.mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockResponse)
            });

            // Act
            const result = await ApiMethods.deleteHandler(endpoint, mockConfig);

            // Assert
            expect(mockConfig.getBaseUrl).toHaveBeenCalled();
            expect(mockConfig.getHeaders).toHaveBeenCalled();
            expect(mockFetch).toHaveBeenCalledWith(expectedUrl, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: undefined
            });
            expect(result).toEqual(mockResponse);
        });
    });

    describe('Edge cases', () => {
        it('should handle network errors gracefully', async () => {
            // Arrange
            const endpoint = '/resource/123';
            const expectedUrl = 'https://api.example.com/resource/123';
            const mockError = new Error('Network error');
            mockFetch.mockRejectedValueOnce(mockError);

            // Act & Assert
            await expect(ApiMethods.deleteHandler(endpoint, mockConfig)).rejects.toThrow('Network error');
            expect(mockFetch).toHaveBeenCalledWith(expectedUrl, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: undefined
            });
        });

        it('should handle invalid JSON response', async () => {
            // Arrange
            const endpoint = '/resource/123';
            const expectedUrl = 'https://api.example.com/resource/123';
            mockFetch.mockResolvedValueOnce({
                json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON'))
            });

            // Act & Assert
            await expect(ApiMethods.deleteHandler(endpoint, mockConfig)).rejects.toThrow('Invalid JSON');
            expect(mockFetch).toHaveBeenCalledWith(expectedUrl, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: undefined
            });
        });

        it('should throw an error if base URL is not defined', async () => {
            // Arrange
            mockConfig.getBaseUrl.mockReturnValueOnce(undefined);
            const endpoint = '/resource/123';

            // Act & Assert
            await expect(ApiMethods.deleteHandler(endpoint, mockConfig)).rejects.toThrow();
        });
    });
});