
import ApiManager from '../ApiManager';
import ApiMethods from "../ApiMethods.js";
import Config from "../Config.js";


// Import necessary modules
// Mock the ApiMethods module
jest.mock("../ApiMethods.js");

describe('ApiManager.get() get method', () => {
    let apiManager;
    let mockConfig;

    beforeEach(() => {
        // Set up a mock configuration
        mockConfig = new Config({
            baseUrl: 'https://api.example.com',
            headers: { 'Authorization': 'Bearer token' }
        });

        // Initialize ApiManager with the mock configuration
        apiManager = new ApiManager({
            baseUrl: 'https://api.example.com',
            headers: { 'Authorization': 'Bearer token' }
        });
    });

    describe('Happy paths', () => {
        it('should successfully retrieve the API handler for a valid endpoint', async () => {
            // Arrange
            const endpoint = '/valid-endpoint';
            const expectedHandler = { data: 'response data' };
            ApiMethods.getHandler.mockResolvedValue(expectedHandler);

            // Act
            const result = await apiManager.get(endpoint);

            // Assert
            expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
            expect(result).toEqual(expectedHandler);
        });

        it('should handle different configurations correctly', async () => {
            // Arrange
            const endpoint = '/another-endpoint';
            const expectedHandler = { data: 'another response' };
            ApiMethods.getHandler.mockResolvedValue(expectedHandler);

            // Act
            const result = await apiManager.get(endpoint);

            // Assert
            expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
            expect(result).toEqual(expectedHandler);
        });
    });

    describe('Edge cases', () => {
        it('should throw an error if the endpoint is invalid', async () => {
            // Arrange
            const invalidEndpoint = '';
            const errorMessage = 'Invalid endpoint';
            ApiMethods.getHandler.mockRejectedValue(new Error(errorMessage));

            // Act & Assert
            await expect(apiManager.get(invalidEndpoint)).rejects.toThrow(errorMessage);
            expect(ApiMethods.getHandler).toHaveBeenCalledWith(invalidEndpoint, mockConfig);
        });

        it('should handle network errors gracefully', async () => {
            // Arrange
            const endpoint = '/network-error-endpoint';
            const errorMessage = 'Network Error';
            ApiMethods.getHandler.mockRejectedValue(new Error(errorMessage));

            // Act & Assert
            await expect(apiManager.get(endpoint)).rejects.toThrow(errorMessage);
            expect(ApiMethods.getHandler).toHaveBeenCalledWith(endpoint, mockConfig);
        });
    });
});