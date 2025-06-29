
import ApiManager from '../ApiManager';
import ApiMethods from "../ApiMethods.js";
import Config from "../Config.js";


// Import necessary modules and classes
// Mock the ApiMethods module
jest.mock("../ApiMethods.js", () => ({
    putHandler: jest.fn(),
}));

describe('ApiManager.put() put method', () => {
    let apiManager;
    const baseUrl = 'https://api.example.com';
    const headers = { 'Content-Type': 'application/json' };

    beforeEach(() => {
        // Initialize ApiManager with default configuration
        apiManager = new ApiManager({ baseUrl, headers });
    });

    describe('Happy paths', () => {
        test('should call putHandler with correct endpoint and data', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };

            // Act
            apiManager.put(endpoint, data);

            // Assert
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
        });

        test('should use the correct configuration for the request', () => {
            // Arrange
            const endpoint = '/another-endpoint';
            const data = { anotherKey: 'anotherValue' };

            // Act
            apiManager.put(endpoint, data);

            // Assert
            const config = apiManager.getConfig();
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(endpoint, data, config);
        });
    });

    describe('Edge cases', () => {
        test('should handle empty endpoint gracefully', () => {
            // Arrange
            const endpoint = '';
            const data = { key: 'value' };

            // Act
            apiManager.put(endpoint, data);

            // Assert
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
        });

        test('should handle null data gracefully', () => {
            // Arrange
            const endpoint = '/null-data-endpoint';
            const data = null;

            // Act
            apiManager.put(endpoint, data);

            // Assert
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
        });

        test('should handle undefined data gracefully', () => {
            // Arrange
            const endpoint = '/undefined-data-endpoint';
            const data = undefined;

            // Act
            apiManager.put(endpoint, data);

            // Assert
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
        });

        test('should handle missing endpoint parameter', () => {
            // Arrange
            const data = { key: 'value' };

            // Act
            apiManager.put(undefined, data);

            // Assert
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(undefined, data, expect.any(Config));
        });
    });
});