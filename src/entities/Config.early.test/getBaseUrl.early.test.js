
import Config from '../Config';


// src/entities/Config.test.js
describe('Config.getBaseUrl() getBaseUrl method', () => {
    // Happy Path Tests
    describe('Happy Paths', () => {
        test('should return the base URL when it is set via constructor', () => {
            // Arrange
            const baseUrl = 'https://example.com';
            const config = new Config({ baseUrl });

            // Act
            const result = config.getBaseUrl();

            // Assert
            expect(result).toBe(baseUrl);
        });

        test('should return the base URL when it is set via setBaseUrl method', () => {
            // Arrange
            const baseUrl = 'https://example.com';
            const config = new Config({});
            config.setBaseUrl(baseUrl);

            // Act
            const result = config.getBaseUrl();

            // Assert
            expect(result).toBe(baseUrl);
        });

        test('should return null if base URL is not set', () => {
            // Arrange
            const config = new Config({});

            // Act
            const result = config.getBaseUrl();

            // Assert
            expect(result).toBeNull();
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        test('should throw TypeError if base URL is not a string when set via constructor', () => {
            // Arrange
            const baseUrl = 12345; // Non-string value

            // Act & Assert
            expect(() => new Config({ baseUrl })).toThrow(TypeError);
        });

        test('should throw TypeError if base URL is not a string when set via setBaseUrl method', () => {
            // Arrange
            const baseUrl = 12345; // Non-string value
            const config = new Config({});

            // Act & Assert
            expect(() => config.setBaseUrl(baseUrl)).toThrow(TypeError);
        });

        test('should handle empty string as a valid base URL', () => {
            // Arrange
            const baseUrl = '';
            const config = new Config({ baseUrl });

            // Act
            const result = config.getBaseUrl();

            // Assert
            expect(result).toBe(baseUrl);
        });
    });
});