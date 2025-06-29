
import ApiManager from '../../src/entities/ApiManager.js';
import ApiMethods from "../../src/entities/ApiMethods.js";
import Config from "../../src/entities/Config.js";


// Import necessary modules and dependencies
// Mock the dependencies
jest.mock("../../src/entities/Config.js");
jest.mock("../../src/entities/ApiMethods.js");

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
            mockGetHandler.mockReturnValue(Promise.resolve('success'));

            // Act
            const result = apiManager.get(endpoint);

            // Assert
            expect(mockGetHandler).toHaveBeenCalledWith(endpoint, mockConfig);
            return expect(result).resolves.toBe('success');
        });

        test('should handle different base URLs and headers', () => {
            // Arrange
            const endpoint = '/another-endpoint';
            const newConfig = {
                baseUrl: 'http://newexample.com',
                headers: { 'Authorization': 'Bearer token' }
            };
            apiManager.setConfig(newConfig);
            mockGetHandler.mockReturnValue(Promise.resolve('success'));

            // Act
            const result = apiManager.get(endpoint);

            // Assert
            expect(mockGetHandler).toHaveBeenCalledWith(endpoint, newConfig);
            return expect(result).resolves.toBe('success');
        });
    });

    describe('Edge cases', () => {
        test('should handle empty endpoint gracefully', () => {
            // Arrange
            const endpoint = '';
            mockGetHandler.mockReturnValue(Promise.resolve('success'));

            // Act
            const result = apiManager.get(endpoint);

            // Assert
            expect(mockGetHandler).toHaveBeenCalledWith(endpoint, mockConfig);
            return expect(result).resolves.toBe('success');
        });

        test('should handle null endpoint gracefully', () => {
            // Arrange
            const endpoint = null;
            mockGetHandler.mockReturnValue(Promise.resolve('success'));

            // Act
            const result = apiManager.get(endpoint);

            // Assert
            expect(mockGetHandler).toHaveBeenCalledWith(endpoint, mockConfig);
            return expect(result).resolves.toBe('success');
        });

        test('should handle undefined endpoint gracefully', () => {
            // Arrange
            const endpoint = undefined;
            mockGetHandler.mockReturnValue(Promise.resolve('success'));

            // Act
            const result = apiManager.get(endpoint);

            // Assert
            expect(mockGetHandler).toHaveBeenCalledWith(endpoint, mockConfig);
            return expect(result).resolves.toBe('success');
        });

        test('should handle ApiMethods.getHandler throwing an error', () => {
            // Arrange
            const endpoint = '/error-endpoint';
            const errorMessage = 'Network error';
            mockGetHandler.mockReturnValue(Promise.reject(new Error(errorMessage)));

            // Act
            const result = apiManager.get(endpoint);

            // Assert
            expect(mockGetHandler).toHaveBeenCalledWith(endpoint, mockConfig);
            return expect(result).rejects.toThrow(errorMessage);
        });
    });
});