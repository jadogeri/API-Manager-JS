
import Config from '../Config';


// Import the Config class
describe('Config.getHeaders() getHeaders method', () => {
    // Happy path tests
    describe('Happy Paths', () => {
        test('should return headers when headers are set', () => {
            // Arrange: Create a Config instance with headers
            const headers = { 'Content-Type': 'application/json' };
            const config = new Config({ headers });

            // Act: Retrieve the headers
            const result = config.getHeaders();

            // Assert: Check if the headers are returned correctly
            expect(result).toEqual(headers);
        });

        test('should return null when headers are not set', () => {
            // Arrange: Create a Config instance without headers
            const config = new Config({});

            // Act: Retrieve the headers
            const result = config.getHeaders();

            // Assert: Check if the headers are null
            expect(result).toBeNull();
        });
    });

    // Edge case tests
    describe('Edge Cases', () => {
        test('should return undefined when headers are explicitly set to undefined', () => {
            // Arrange: Create a Config instance with headers set to undefined
            const config = new Config({ headers: undefined });

            // Act: Retrieve the headers
            const result = config.getHeaders();

            // Assert: Check if the headers are undefined
            expect(result).toBeUndefined();
        });

        test('should return null when headers are explicitly set to null', () => {
            // Arrange: Create a Config instance with headers set to null
            const config = new Config({ headers: null });

            // Act: Retrieve the headers
            const result = config.getHeaders();

            // Assert: Check if the headers are null
            expect(result).toBeNull();
        });

        test('should return an empty object when headers are set to an empty object', () => {
            // Arrange: Create a Config instance with headers set to an empty object
            const config = new Config({ headers: {} });

            // Act: Retrieve the headers
            const result = config.getHeaders();

            // Assert: Check if the headers are an empty object
            expect(result).toEqual({});
        });
    });
});