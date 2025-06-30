
import Config from '../Config';


// src/entities/Config.test.js
describe('Config.setBaseUrl() setBaseUrl method', () => {
    // Happy Path Tests
    describe('Happy Paths', () => {
        test('should set the base URL when a valid string is provided', () => {
            // Arrange
            const config = new Config({});
            const validUrl = 'https://example.com';

            // Act
            config.setBaseUrl(validUrl);

            // Assert
            expect(config.getBaseUrl()).toBe(validUrl);
        });

        test('should overwrite the existing base URL with a new valid string', () => {
            // Arrange
            const config = new Config({ baseUrl: 'https://old-url.com' });
            const newUrl = 'https://new-url.com';

            // Act
            config.setBaseUrl(newUrl);

            // Assert
            expect(config.getBaseUrl()).toBe(newUrl);
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        test('should set the base URL to an empty string if provided', () => {
            // Arrange
            const config = new Config({});
            const emptyUrl = '';

            // Act
            config.setBaseUrl(emptyUrl);

            // Assert
            expect(config.getBaseUrl()).toBe(emptyUrl);
        });

        test('should throw a TypeError if the base URL is not a string', () => {
            // Arrange
            const config = new Config({});
            const invalidUrl = 12345; // Non-string input

            // Act & Assert
            expect(() => config.setBaseUrl(invalidUrl)).toThrow(TypeError);
        });

        test('should handle null as a valid input and set the base URL to null', () => {
            // Arrange
            const config = new Config({});
            const nullUrl = null;

            // Act
            config.setBaseUrl(nullUrl);

            // Assert
            expect(config.getBaseUrl()).toBe(nullUrl);
        });

        test('should handle undefined as a valid input and set the base URL to undefined', () => {
            // Arrange
            const config = new Config({});
            const undefinedUrl = undefined;

            // Act
            config.setBaseUrl(undefinedUrl);

            // Assert
            expect(config.getBaseUrl()).toBe(undefinedUrl);
        });
    });
});