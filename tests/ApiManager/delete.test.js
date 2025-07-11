
import ApiManager from '../../src/entities/ApiManager.js';
import ApiMethods from "../../src/entities/ApiMethods.js";
import Config from "../../src/entities/Config.js";


jest.mock("../../src/entities/ApiMethods.js");

describe('ApiManager.delete() delete method', () => {
    let apiManager;
    const baseUrl = 'http://example.com';
    const headers = { 'Content-Type': 'application/json' };

    beforeEach(() => {
        apiManager = new ApiManager({ baseUrl, headers });
    });

    describe('Happy paths', () => {
        test('should call deleteHandler with correct endpoint and config', () => {
            // Arrange
            const endpoint = '/resource/1';
            ApiMethods.deleteHandler.mockReturnValue(Promise.resolve({ success: true }));

            // Act
            const result = apiManager.delete(endpoint);

            // Assert
            expect(ApiMethods.deleteHandler).toHaveBeenCalledWith(endpoint, expect.any(Config));
            return expect(result).resolves.toEqual({ success: true });
        });

        test('should handle delete request with different headers', () => {
            // Arrange
            const endpoint = '/resource/2';
            const newHeaders = { 'Authorization': 'Bearer token' };
            apiManager.updateHeader(newHeaders);
            ApiMethods.deleteHandler.mockReturnValue(Promise.resolve({ success: true }));

            // Act
            const result = apiManager.delete(endpoint);

            // Assert
            expect(ApiMethods.deleteHandler).toHaveBeenCalledWith(endpoint, expect.any(Config));
            return expect(result).resolves.toEqual({ success: true });
        });
    });

    describe('Edge cases', () => {
        test('should handle delete request with empty endpoint', () => {
            // Arrange
            const endpoint = '';
            ApiMethods.deleteHandler.mockReturnValue(Promise.reject(new Error('Invalid endpoint')));

            // Act
            const result = apiManager.delete(endpoint);

            // Assert
            expect(ApiMethods.deleteHandler).toHaveBeenCalledWith(endpoint, expect.any(Config));
            return expect(result).rejects.toThrow('Invalid endpoint');
        });

        test('should handle delete request with null endpoint', () => {
            // Arrange
            const endpoint = null;
            ApiMethods.deleteHandler.mockReturnValue(Promise.reject(new Error('Invalid endpoint')));

            // Act
            const result = apiManager.delete(endpoint);

            // Assert
            expect(ApiMethods.deleteHandler).toHaveBeenCalledWith(endpoint, expect.any(Config));
            return expect(result).rejects.toThrow('Invalid endpoint');
        });

        it('should handle network errors gracefully', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            ApiMethods.deleteHandler.mockRejectedValue(new Error('Network Error'));

            // Act & Assert
            await expect(apiManager.delete(endpoint)).rejects.toThrow('Network Error');
        });

    });
});