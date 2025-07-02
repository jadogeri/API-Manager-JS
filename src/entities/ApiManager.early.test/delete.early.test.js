
import ApiManager from '../ApiManager';
import ApiMethods from "../ApiMethods.js";
import Config from "../Config.js";


jest.mock("../ApiMethods.js");

describe('ApiManager.delete() delete method', () => {
    let apiManager;
    let mockConfig;

    beforeEach(() => {
        mockConfig = new Config({ baseUrl: 'http://example.com', headers: { 'Content-Type': 'application/json' } });
        apiManager = new ApiManager({ baseUrl: 'http://example.com', headers: { 'Content-Type': 'application/json' } });
    });

    describe('Happy paths', () => {
        it('should successfully call deleteHandler with the correct endpoint and config', async () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const expectedResponse = { success: true };
            ApiMethods.deleteHandler.mockResolvedValue(expectedResponse);

            // Act
            const response = await apiManager.delete(endpoint);

            // Assert
            expect(ApiMethods.deleteHandler).toHaveBeenCalledWith(endpoint, mockConfig);
            expect(response).toEqual(expectedResponse);
        });
    });

    describe('Edge cases', () => {
        it('should throw an error if the endpoint is an empty string', async () => {
            // Arrange
            const endpoint = '';
            ApiMethods.deleteHandler.mockImplementation(() => {
                throw new Error('Invalid endpoint');
            });

            // Act & Assert
            await expect(apiManager.delete(endpoint)).rejects.toThrow('Invalid endpoint');
        });

        it('should throw an error if the endpoint is null', async () => {
            // Arrange
            const endpoint = null;
            ApiMethods.deleteHandler.mockImplementation(() => {
                throw new Error('Invalid endpoint');
            });

            // Act & Assert
            await expect(apiManager.delete(endpoint)).rejects.toThrow('Invalid endpoint');
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