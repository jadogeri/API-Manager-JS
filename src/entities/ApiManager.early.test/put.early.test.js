
import ApiManager from '../ApiManager';
import ApiMethods from "../ApiMethods.js";
import Config from "../Config.js";


jest.mock("../ApiMethods.js");

describe('ApiManager.put() put method', () => {
    let apiManager;
    let baseUrl;
    let headers;

    beforeEach(() => {
        baseUrl = 'https://api.example.com';
        headers = { 'Content-Type': 'application/json' };
        apiManager = new ApiManager({ baseUrl, headers });
    });

    describe('Happy paths', () => {
        it('should successfully send a PUT request to the specified endpoint with the provided data', async () => {
            // Arrange
            const endpoint = '/update';
            const data = { key: 'value' };
            const expectedResponse = { success: true };
            ApiMethods.putHandler.mockResolvedValue(expectedResponse);

            // Act
            const response = await apiManager.put(endpoint, data);

            // Assert
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
            expect(response).toEqual(expectedResponse);
        });

        it('should handle PUT requests with different data structures', async () => {
            // Arrange
            const endpoint = '/update';
            const data = { nested: { key: 'value' }, array: [1, 2, 3] };
            const expectedResponse = { success: true };
            ApiMethods.putHandler.mockResolvedValue(expectedResponse);

            // Act
            const response = await apiManager.put(endpoint, data);

            // Assert
            expect(ApiMethods.putHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
            expect(response).toEqual(expectedResponse);
        });
    });

    describe('Edge cases', () => {
        it('should throw an error if the endpoint is invalid', async () => {
            // Arrange
            const endpoint = '';
            const data = { key: 'value' };
            ApiMethods.putHandler.mockRejectedValue(new Error('Invalid endpoint'));

            // Act & Assert
            await expect(apiManager.put(endpoint, data)).rejects.toThrow('Invalid endpoint');
        });

        it('should throw an error if the data is null', async () => {
            // Arrange
            const endpoint = '/update';
            const data = null;
            ApiMethods.putHandler.mockRejectedValue(new Error('Data cannot be null'));

            // Act & Assert
            await expect(apiManager.put(endpoint, data)).rejects.toThrow('Data cannot be null');
        });

        it('should handle network errors gracefully', async () => {
            // Arrange
            const endpoint = '/update';
            const data = { key: 'value' };
            ApiMethods.putHandler.mockRejectedValue(new Error('Network Error'));

            // Act & Assert
            await expect(apiManager.put(endpoint, data)).rejects.toThrow('Network Error');
        });
    });
});