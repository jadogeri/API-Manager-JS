
import ApiManager from '../../src/entities/ApiManager.js';
import ApiMethods from "../../src/entities/ApiMethods.js";
import Config from "../../src/entities/Config.js";


// Import necessary modules and classes
// Mock the ApiMethods to isolate the patch method
jest.mock("../../src/entities/ApiMethods.js");

describe('ApiManager.patch() patch method', () => {
    let apiManager;
    const baseUrl = 'http://example.com';
    const headers = { 'Content-Type': 'application/json' };

    beforeEach(() => {
        // Initialize ApiManager with default configuration
        apiManager = new ApiManager({ baseUrl, headers });
    });

    describe('Happy paths', () => {
        test('should call ApiMethods.patchHandler with correct parameters', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };

            // Act
            apiManager.patch(endpoint, data);

            // Assert
            expect(ApiMethods.patchHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
        });

        test('should handle patch request with no data', () => {
            // Arrange
            const endpoint = '/test-endpoint';

            // Act
            apiManager.patch(endpoint);

            // Assert
            expect(ApiMethods.patchHandler).toHaveBeenCalledWith(endpoint, undefined, expect.any(Config));
        });
        it('should handle successful patch request', async () => {
            // Arrange
            const endpoint = '/update';
            const data = { key: 'value' };
            const response = { success: true };
            ApiMethods.patchHandler.mockResolvedValue(response);

            // Act
            const result = await apiManager.patch(endpoint, data);

            // Assert
            expect(result).toEqual(response);
        });
        
    });

    describe('Edge cases', () => {
        test('should handle empty endpoint gracefully', () => {
            // Arrange
            const endpoint = '';
            const data = { key: 'value' };

            // Act
            apiManager.patch(endpoint, data);

            // Assert
            expect(ApiMethods.patchHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
        });

        test('should handle null data gracefully', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = null;

            // Act
            apiManager.patch(endpoint, data);

            // Assert
            expect(ApiMethods.patchHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
        });

        test('should handle undefined endpoint gracefully', () => {
            // Arrange
            const endpoint = undefined;
            const data = { key: 'value' };

            // Act
            apiManager.patch(endpoint, data);

            // Assert
            expect(ApiMethods.patchHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
        });

        test('should handle special characters in endpoint', () => {
            // Arrange
            const endpoint = '/test-endpoint?query=param&another=param';
            const data = { key: 'value' };

            // Act
            apiManager.patch(endpoint, data);

            // Assert
            expect(ApiMethods.patchHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
        });
        it('should handle patch request with empty data', async () => {
        // Arrange
        const endpoint = '/update';
        const data = {};
        const response = { success: true };
        ApiMethods.patchHandler.mockResolvedValue(response);

        // Act
        const result = await apiManager.patch(endpoint, data);

        // Assert
        expect(ApiMethods.patchHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
        expect(result).toEqual(response);
        });

        it('should throw an error if patchHandler fails', async () => {
        // Arrange
        const endpoint = '/update';
        const data = { key: 'value' };
        const errorMessage = 'Network Error';
        ApiMethods.patchHandler.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        await expect(apiManager.patch(endpoint, data)).rejects.toThrow(errorMessage);
        });
    });
});