
import ApiManager from '../../src/entities/ApiManager.js';
import ApiMethods from "../../src/entities/ApiMethods.js";
import Config from "../../src/entities/Config.js";


jest.mock("../ApiMethods.js");

describe('ApiManager.post() post method', () => {
    let apiManager;
    let mockConfig;

    beforeEach(() => {
        mockConfig = new Config({
            baseUrl: 'http://example.com',
            headers: { 'Content-Type': 'application/json' }
        });
        apiManager = new ApiManager({
            baseUrl: 'http://example.com',
            headers: { 'Content-Type': 'application/json' }
        });
    });

    describe('Happy paths', () => {
        it('should call ApiMethods.postHandler with correct parameters', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { key: 'value' };

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle post requests with different data structures', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = { nested: { key: 'value' }, array: [1, 2, 3] };

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });
    });

    describe('Edge cases', () => {
        it('should handle empty data object', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = {};

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle null data', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = null;

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle undefined data', () => {
            // Arrange
            const endpoint = '/test-endpoint';
            const data = undefined;

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle empty endpoint', () => {
            // Arrange
            const endpoint = '';
            const data = { key: 'value' };

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle null endpoint', () => {
            // Arrange
            const endpoint = null;
            const data = { key: 'value' };

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });

        it('should handle undefined endpoint', () => {
            // Arrange
            const endpoint = undefined;
            const data = { key: 'value' };

            // Act
            apiManager.post(endpoint, data);

            // Assert
            expect(ApiMethods.postHandler).toHaveBeenCalledWith(endpoint, data, mockConfig);
        });
    });
});