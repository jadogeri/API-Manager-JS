
import Config from '../Config';


// src/entities/Config.test.js
describe('Config.setHeaders() setHeaders method', () => {
    // Happy Path Tests
    describe('Happy Paths', () => {
        test('should set headers when a valid headers object is provided', () => {
            // Arrange
            const config = new Config({});
            const headers = { 'Content-Type': 'application/json' };

            // Act
            config.setHeaders(headers);

            // Assert
            expect(config.getHeaders()).toEqual(headers);
        });

        test('should overwrite existing headers with new headers', () => {
            // Arrange
            const initialHeaders = { 'Accept': 'application/json' };
            const newHeaders = { 'Content-Type': 'application/json' };
            const config = new Config({ headers: initialHeaders });

            // Act
            config.setHeaders(newHeaders);

            // Assert
            expect(config.getHeaders()).toEqual(newHeaders);
        });
    });

    // Edge Case Tests
    describe('Edge Cases', () => {
        test('should set headers to null if null is provided', () => {
            // Arrange
            const config = new Config({});
            const headers = null;

            // Act
            config.setHeaders(headers);

            // Assert
            expect(config.getHeaders()).toBeNull();
        });

        test('should set headers to undefined if undefined is provided', () => {
            // Arrange
            const config = new Config({});
            const headers = undefined;

            // Act
            config.setHeaders(headers);

            // Assert
            expect(config.getHeaders()).toBeUndefined();
        });

        test('should handle empty object as headers', () => {
            // Arrange
            const config = new Config({});
            const headers = {};

            // Act
            config.setHeaders(headers);

            // Assert
            expect(config.getHeaders()).toEqual(headers);
        });

        test('should handle non-object types gracefully', () => {
            // Arrange
            const config = new Config({});
            const headers = 'not-an-object';

            // Act
            config.setHeaders(headers);

            // Assert
            expect(config.getHeaders()).toEqual(headers);
        });
    });
});