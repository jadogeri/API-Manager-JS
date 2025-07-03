
import ApiManager from '../../src/entities/ApiManager.js';
import ApiMethods from "../../src/entities/ApiMethods.js";
import Config from "../../src/entities/Config.js";


jest.mock("../../src/entities/ApiMethods.js");

describe('ApiManager.post() post method', () => {
    let apiManager;
    let mockConfig;

    beforeEach(() => {
        mockConfig = new Config({
            baseUrl: 'http://example.com',
            headers: { 'Content-Type': 'application/json' }
        });
        apiManager = new ApiManager({
            baseUrl: 'http://example.com',
            headers: { 'Content-Type': 'application/json' }
        });
    });

    describe('Happy paths', () => {
        it('should call ApiMethods.postHandler with correct parameters', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle post requests with different data structures', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { nested: { key: 'value' }, array: [1, 2, 3] };

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });
    });

    describe('Edge cases', () => {
        it('should handle empty data object', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = {};

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle null data', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = null;

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle undefined data', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = undefined;

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle empty endpoint', () => {
            // Arrange
            const endpoint = '';
            const data = { key: 'value' };

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle null endpoint', () => {
            // Arrange
            const endpoint = null;
            const data = { key: 'value' };

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle undefined endpoint', () => {
            // Arrange
            const endpoint = undefined;
            const data = { key: 'value' };

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });
        it('should successfully send a POST request with valid endpoint and data', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };
            const mockResponse = { success: true };
            ApiMethods.postHandler.mockResolvedValue(mockResponse);

            // Act
            const response = await apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
            expect(response).toEqual(mockResponse);
        });

        it('should handle POST request with empty data object', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = {};
            const mockResponse = { success: true };
            ApiMethods.postHandler.mockResolvedValue(mockResponse);

            // Act
            const response = await apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
            expect(response).toEqual(mockResponse);
        });
    });

    describe('Edge cases', () => {
        it('should throw an error if the endpoint is invalid', async () => {
            // Arrange
            const endpoint = '';
            const data = { key: 'value' };
            const mockError = new Error('Invalid endpoint');
            ApiMethods.postHandler.mockRejectedValue(mockError);

            // Act & Assert
            await expect(apiManager.post(endpoint, data)).rejects.toThrow('Invalid endpoint');
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should throw an error if the postHandler fails', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };
            const mockError = new Error('Request failed');
            ApiMethods.postHandler.mockRejectedValue(mockError);

            // Act & Assert
            await expect(apiManager.post(endpoint, data)).rejects.toThrow('Request failed');
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });
    });
});