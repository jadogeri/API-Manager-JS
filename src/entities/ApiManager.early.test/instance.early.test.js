
import ApiManager from '../ApiManager';
import Config from "../Config.js";


describe('ApiManager.instance() instance method', () => {
    // Happy Path Tests
    describe('Happy Paths', () => {
        test('should return the current instance of ApiManager', () => {
            // Arrange: Create an instance of ApiManager
            const apiManager = new ApiManager({ baseUrl: 'http://example.com', headers: { 'Content-Type': 'application/json' } });

            // Act: Call the instance method
            const result = apiManager.instance();

            // Assert: The result should be the same instance
            expect(result).toBe(apiManager);
        });

        test('should return the current instance even with default constructor values', () => {
            // Arrange: Create an instance of ApiManager with default values
            const apiManager = new ApiManager({});

            // Act: Call the instance method
            const result = apiManager.instance();

            // Assert: The result should be the same instance
            expect(result).toBe(apiManager);
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        test('should return the current instance when no configuration is provided', () => {
            // Arrange: Create an instance of ApiManager without any configuration
            const apiManager = new ApiManager();

            // Act: Call the instance method
            const result = apiManager.instance();

            // Assert: The result should be the same instance
            expect(result).toBe(apiManager);
        });

        test('should return the current instance after updating configuration', () => {
            // Arrange: Create an instance of ApiManager and update its configuration
            const apiManager = new ApiManager({ baseUrl: 'http://example.com' });
            const newConfig = new Config({ baseUrl: 'http://newexample.com', headers: { 'Authorization': 'Bearer token' } });
            apiManager.setConfig(newConfig);

            // Act: Call the instance method
            const result = apiManager.instance();

            // Assert: The result should be the same instance
            expect(result).toBe(apiManager);
        });
    });
});