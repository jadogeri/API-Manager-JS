
import ApiManager from '../ApiManager';
import ApiMethods from "../ApiMethods.js";
import Config from "../Config.js";


// Import necessary modules and classes
// Mock the ApiMethods.patchHandler function
jest.mock("../ApiMethods.js", () => ({
  patchHandler: jest.fn(),
}));

describe('ApiManager.patch() patch method', () => {
  let apiManager;
  const baseUrl = 'https://api.example.com';
  const headers = { 'Content-Type': 'application/json' };

  beforeEach(() => {
    // Initialize ApiManager with default configuration
    apiManager = new ApiManager({ baseUrl, headers });
  });

  describe('Happy paths', () => {
    it('should successfully send a PATCH request with valid endpoint and data', async () => {
      // Arrange
      const endpoint = '/resource/1';
      const data = { name: 'Updated Name' };
      const expectedResponse = { success: true };

      // Mock the patchHandler to resolve with expectedResponse
      ApiMethods.patchHandler.mockResolvedValue(expectedResponse);

      // Act
      const response = await apiManager.patch(endpoint, data);

      // Assert
      expect(ApiMethods.patchHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
      expect(response).toEqual(expectedResponse);
    });

    it('should handle PATCH request with empty data object', async () => {
      // Arrange
      const endpoint = '/resource/1';
      const data = {};
      const expectedResponse = { success: true };

      // Mock the patchHandler to resolve with expectedResponse
      ApiMethods.patchHandler.mockResolvedValue(expectedResponse);

      // Act
      const response = await apiManager.patch(endpoint, data);

      // Assert
      expect(ApiMethods.patchHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('Edge cases', () => {
    it('should throw an error if the endpoint is invalid', async () => {
      // Arrange
      const endpoint = '';
      const data = { name: 'Updated Name' };
      const expectedError = new Error('Invalid endpoint');

      // Mock the patchHandler to reject with expectedError
      ApiMethods.patchHandler.mockRejectedValue(expectedError);

      // Act & Assert
      await expect(apiManager.patch(endpoint, data)).rejects.toThrow('Invalid endpoint');
    });

    it('should throw an error if the patchHandler fails', async () => {
      // Arrange
      const endpoint = '/resource/1';
      const data = { name: 'Updated Name' };
      const expectedError = new Error('Request failed');

      // Mock the patchHandler to reject with expectedError
      ApiMethods.patchHandler.mockRejectedValue(expectedError);

      // Act & Assert
      await expect(apiManager.patch(endpoint, data)).rejects.toThrow('Request failed');
    });

    it('should handle PATCH request with null data', async () => {
      // Arrange
      const endpoint = '/resource/1';
      const data = null;
      const expectedResponse = { success: true };

      // Mock the patchHandler to resolve with expectedResponse
      ApiMethods.patchHandler.mockResolvedValue(expectedResponse);

      // Act
      const response = await apiManager.patch(endpoint, data);

      // Assert
      expect(ApiMethods.patchHandler).toHaveBeenCalledWith(endpoint, data, expect.any(Config));
      expect(response).toEqual(expectedResponse);
    });
  });
});