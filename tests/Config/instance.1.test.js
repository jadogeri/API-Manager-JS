
import Config from "../../src/entities/Config.js";


describe('Config.instance() instance method', () => {
    describe('Happy paths', () => {
        test('should return the correct baseUrl and headers when both are set', () => {
            // Arrange
            const baseUrl = 'https://example.com';
            const headers = { 'Content-Type': 'application/json' };
            const config = new Config({ baseUrl, headers });

            // Act
            const result = config.instance();

            // Assert
            expect(result).toEqual({ baseUrl, headers });
        });

        test('should return null for baseUrl and headers when none are set', () => {
            // Arrange
            const config = new Config({});

            // Act
            const result = config.instance();

            // Assert
            expect(result).toEqual({ baseUrl: null, headers: null });
        });

        test('should return the correct baseUrl when only baseUrl is set', () => {
            // Arrange
            const baseUrl = 'https://example.com';
            const config = new Config({ baseUrl });

            // Act
            const result = config.instance();

            // Assert
            expect(result).toEqual({ baseUrl, headers: null });
        });

        test('should return the correct headers when only headers are set', () => {
            // Arrange
            const headers = { 'Content-Type': 'application/json' };
            const config = new Config({ headers });

            // Act
            const result = config.instance();

            // Assert
            expect(result).toEqual({ baseUrl: null, headers });
        });
    });

    describe('Edge cases', () => {
        test('should handle empty string as baseUrl', () => {
            // Arrange
            const baseUrl = '';
            const config = new Config({ baseUrl });

            // Act
            const result = config.instance();

            // Assert
            expect(result).toEqual({ baseUrl, headers: null });
        });

        test('should handle empty object as headers', () => {
            // Arrange
            const headers = {};
            const config = new Config({ headers });

            // Act
            const result = config.instance();

            // Assert
            expect(result).toEqual({ baseUrl: null, headers });
        });
 
        test('should handle null baseUrl and headers explicitly set', () => {
            // Arrange
            const config = new Config({ baseUrl: null, headers: null });

            // Act
            const result = config.instance();

            // Assert
            expect(result).toEqual({ baseUrl: null, headers: null });
        });
    });
});