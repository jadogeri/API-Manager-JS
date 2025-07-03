
import ApiManager from '../../src/entities/ApiManager.js';
import Config from "../../src/entities/Config.js";


jest.mock("../../src/entities/Config.js");
jest.mock("../../src/entities/ApiMethods.js");

describe('ApiManager.instance() instance method', () => {
    let apiManager;
    let configMock;

    beforeEach(() => {
        // Setup a mock configuration
        configMock = new Config({
            baseUrl: 'http://example.com',
            headers: { 'Content-Type': 'application/json' }
        });

        // Mock the Config constructor to return the mock configuration
        Config.mockImplementation(() => configMock);

        // Initialize ApiManager with the mock configuration
        apiManager = new ApiManager({
            baseUrl: 'http://example.com',
            headers: { 'Content-Type': 'application/json' }
        });
    });

    describe('Happy paths', () => {
        it('should return the same instance of ApiManager', () => {
            // Test that the instance method returns the same instance
            const instance = apiManager.instance();
            expect(instance).toBe(apiManager);
        });
    });

    describe('Edge cases', () => {
        it('should handle instance call when no configuration is provided', () => {
            // Initialize ApiManager without any configuration
            const apiManagerNoConfig = new ApiManager({});
            const instance = apiManagerNoConfig.instance();
            expect(instance).toBe(apiManagerNoConfig);
        });

        it('should handle instance call with null configuration', () => {
            // Initialize ApiManager with null configuration
            const apiManagerNullConfig = new ApiManager({ baseUrl: null, headers: null });
            const instance = apiManagerNullConfig.instance();
            expect(instance).toBe(apiManagerNullConfig);
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

        test('should return the current instance when no configuration is provided', () => {
            // Arrange: Create an instance of ApiManager without any configuration
            const apiManager = new ApiManager({});

            // Act: Call the instance method
            const result = apiManager.instance();
       
            // Assert: The result should be the same instance
            expect(result).toBe(apiManager);
        });
    });
});