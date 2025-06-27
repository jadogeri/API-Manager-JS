
import ApiManager from '../../src/entities/ApiManager.js';
import Config from "../../src/entities/Config.js";


jest.mock("../Config.js");
jest.mock("../ApiMethods.js");

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
    });
});