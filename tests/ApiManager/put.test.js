
import ApiManager from '../../src/entities/ApiManager.js';
import ApiMethods from "../../src/entities/ApiMethods.js";
import Config from "../../src/entities/Config.js";


jest.mock("../ApiMethods.js");

describe('ApiManager.put() put method', () => {
    let apiManager;
    let mockConfig;

    beforeEach(() => {
        mockConfig = new Config({ baseUrl: 'http://example.com', headers: { 'Content-Type': 'application/json' } });
        apiManager = new ApiManager({ baseUrl: 'http://example.com', headers: { 'Content-Type': 'application/json' } });
    });

    describe('Happy paths', () => {
        it('should call ApiMethods.putHandler with correct parameters', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };
            ApiMethods.putHandler.mockReturnValue(Promise.resolve({ success: true }));

            // Act
            const result = apiManager.put(endpoint, data);

            // Assert
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
            return expect(result).resolves.toEqual({ success: true });
        });

        it('should handle successful put request', async () => {
            // Arrange
            const endpoint = '/another-endpoint';
            const data = { anotherKey: 'anotherValue' };
            const response = { success: true };
            ApiMethods.putHandler.mockResolvedValue(response);

            // Act
            const result = await apiManager.put(endpoint, data);

            // Assert
            expect(result).toEqual(response);
        });
    });

    describe('Edge cases', () => {
        it('should handle empty data object', async () => {
            // Arrange
            const endpoint = '/empty-data-endpoint';
            const data = {};
            const response = { success: true };
            ApiMethods.putHandler.mockResolvedValue(response);

            // Act
            const result = await apiManager.put(endpoint, data);

            // Assert
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
            expect(result).toEqual(response);
        });

        it('should handle null data', async () => {
            // Arrange
            const endpoint = '/null-data-endpoint';
            const data = null;
            const response = { success: true };
            ApiMethods.putHandler.mockResolvedValue(response);

            // Act
            const result = await apiManager.put(endpoint, data);

            // Assert
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
            expect(result).toEqual(response);
        });

        it('should handle undefined data', async () => {
            // Arrange
            const endpoint = '/undefined-data-endpoint';
            const data = undefined;
            const response = { success: true };
            ApiMethods.putHandler.mockResolvedValue(response);

            // Act
            const result = await apiManager.put(endpoint, data);

            // Assert
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
            expect(result).toEqual(response);
        });

        it('should handle network error gracefully', async () => {
            // Arrange
            const endpoint = '/error-endpoint';
            const data = { key: 'value' };
            const errorMessage = 'Network Error';
            ApiMethods.putHandler.mockRejectedValue(new Error(errorMessage));

            // Act & Assert
            await expect(apiManager.put(endpoint, data)).rejects.toThrow(errorMessage);
        });
    });
});