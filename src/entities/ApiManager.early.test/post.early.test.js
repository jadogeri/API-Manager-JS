
import ApiManager from '../ApiManager';
import ApiMethods from "../ApiMethods.js";
import Config from "../Config.js";


jest.mock("../ApiMethods.js");

describe('ApiManager.post() post method', () => {
    let apiManager;
    let mockConfig;

    beforeEach(() => {
        mockConfig = new Config({ baseUrl: 'http://example.com', headers: { 'Content-Type': 'application/json' } });
        apiManager = new ApiManager({ baseUrl: 'http://example.com', headers: { 'Content-Type': 'application/json' } });
    });

    describe('Happy paths', () => {
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

        it('should handle POST request with null data', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = null;
            const mockResponse = { success: true };
            ApiMethods.postHandler.mockResolvedValue(mockResponse);

            // Act
            const response = await apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
            expect(response).toEqual(mockResponse);
        });
    });
});