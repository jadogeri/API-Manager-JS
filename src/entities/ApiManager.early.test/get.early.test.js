
import ApiManager from '../ApiManager';
import ApiMethods from "../ApiMethods.js";
import Config from "../Config.js";


// Import necessary modules and dependencies
// Mock the dependencies
jest.mock("../Config.js");
jest.mock("../ApiMethods.js");

describe('ApiManager.get() get method', () => {
    let apiManager;
    let mockConfig;
    let mockGetHandler;

    beforeEach(() => {
        // Set up a mock configuration
        mockConfig = {
            baseUrl: 'http://example.com',
            headers: { 'Content-Type': 'application/json' }
        };

        // Mock the Config class to return the mockConfig
        Config.mockImplementation(() => mockConfig);

        // Create an instance of ApiManager with the mock configuration
        apiManager = new ApiManager(mockConfig);

        // Mock the getHandler method of ApiMethods
        mockGetHandler = jest.fn();
        ApiMethods.getHandler = mockGetHandler;
    });

    describe('Happy paths', () => {
        test('should call ApiMethods.getHandler with correct endpoint and config', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const expectedConfig = apiManager.getConfig();

            // Act
            apiManager.get(endpoint);

            // Assert
            expect(mockGetHandler).toHaveBeenCalledWith(endpoint, expectedConfig);
        });

        test('should return the result from ApiMethods.getHandler', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const expectedResponse = { data: 'test data' };
            mockGetHandler.mockResolvedValue(expectedResponse);

            // Act
            const result = await apiManager.get(endpoint);

            // Assert
            expect(result).toEqual(expectedResponse);
        });
    });

    describe('Edge cases', () => {
        test('should handle empty endpoint gracefully', async () => {
            // Arrange
            const endpoint = '';
            const expectedResponse = { error: 'Invalid endpoint' };
            mockGetHandler.mockResolvedValue(expectedResponse);

            // Act
            const result = await apiManager.get(endpoint);

            // Assert
            expect(mockGetHandler).toHaveBeenCalledWith(endpoint, apiManager.getConfig());
            expect(result).toEqual(expectedResponse);
        });

        test('should handle null endpoint gracefully', async () => {
            // Arrange
            const endpoint = null;
            const expectedResponse = { error: 'Invalid endpoint' };
            mockGetHandler.mockResolvedValue(expectedResponse);

            // Act
            const result = await apiManager.get(endpoint);

            // Assert
            expect(mockGetHandler).toHaveBeenCalledWith(endpoint, apiManager.getConfig());
            expect(result).toEqual(expectedResponse);
        });

        test('should handle undefined endpoint gracefully', async () => {
            // Arrange
            const endpoint = undefined;
            const expectedResponse = { error: 'Invalid endpoint' };
            mockGetHandler.mockResolvedValue(expectedResponse);

            // Act
            const result = await apiManager.get(endpoint);

            // Assert
            expect(mockGetHandler).toHaveBeenCalledWith(endpoint, apiManager.getConfig());
            expect(result).toEqual(expectedResponse);
        });
    });
});