
import Config from "../../src/entities/Config.js";


describe('Config.instance() instance method', () => {
  describe('instance method', () => {
    // Happy path tests
    describe('Happy paths', () => {
      test('should return an object with baseUrl and headers when both are set', () => {
        // Arrange
        const config = new Config({ baseUrl: 'http://example.com', headers: { 'Content-Type': 'application/json' } });

        // Act
        const result = config.instance();

        // Assert
        expect(result).toEqual({
          baseUrl: 'http://example.com',
          headers: { 'Content-Type': 'application/json' }
        });
      });

      test('should return an object with null baseUrl and headers when none are set', () => {
        // Arrange
        const config = new Config({});

        // Act
        const result = config.instance();

        // Assert
        expect(result).toEqual({
          baseUrl: null,
          headers: null
        });
      });

      test('should return an object with only baseUrl set when only baseUrl is provided', () => {
        // Arrange
        const config = new Config({ baseUrl: 'http://example.com' });

        // Act
        const result = config.instance();

        // Assert
        expect(result).toEqual({
          baseUrl: 'http://example.com',
          headers: null
        });
      });

      test('should return an object with only headers set when only headers are provided', () => {
        // Arrange
        const config = new Config({ headers: { 'Content-Type': 'application/json' } });

        // Act
        const result = config.instance();

        // Assert
        expect(result).toEqual({
          baseUrl: null,
          headers: { 'Content-Type': 'application/json' }
        });
      });
    });

    // Edge case tests
    describe('Edge cases', () => {
      test('should handle empty string as baseUrl', () => {
        // Arrange
        const config = new Config({ baseUrl: '' });

        // Act
        const result = config.instance();

        // Assert
        expect(result).toEqual({
          baseUrl: '',
          headers: null
        });
      });

      test('should handle empty object as headers', () => {
        // Arrange
        const config = new Config({ headers: {} });

        // Act
        const result = config.instance();

        // Assert
        expect(result).toEqual({
          baseUrl: null,
          headers: {}
        });
      });

      test('should handle null values explicitly set for baseUrl and headers', () => {
        // Arrange
        const config = new Config({ baseUrl: null, headers: null });

        // Act
        const result = config.instance();

        // Assert
        expect(result).toEqual({
          baseUrl: null,
          headers: null
        });
      });

      test('should handle undefined values for baseUrl and headers', () => {
        // Arrange
        const config = new Config({ baseUrl: undefined, headers: undefined });

        // Act
        const result = config.instance();

        // Assert
        expect(result).toEqual({
          baseUrl: null,
          headers: null
        });
      });
    });
  });
});