
import ApiManager from '../ApiManager';
import ApiMethods from "../ApiMethods.js";
import Config from "../Config.js";


// Import necessary modules and classes
// Mock the ApiMethods module
jest.mock("../ApiMethods.js", () => ({
  patchHandler: jest.fn(),
}));

describe('ApiManager.patch() patch method', () => {
  let apiManager;
  const baseUrl = 'https://api.example.com';
  const headers = { 'Content-Type': 'application/json' };

  beforeEach(() => {
    // Initialize ApiManager with default config
    apiManager = new ApiManager({ baseUrl, headers });
  });

  describe('Happy paths', () => {
    it('should call patchHandler with correct parameters', async () => {
      // Arrange
      const endpoint = '/update';
      const data = { key: 'value' };
      const expectedConfig = new Config({ baseUrl, headers });

      // Act
      await apiManager.patch(endpoint, data);

      // Assert
      expect(ApiMethods.patchHandler).toHaveBeenCalledWith(endpoint, data, expectedConfig);
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

    it('should handle patch request with null data', async () => {
      // Arrange
      const endpoint = '/update';
      const data = null;
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