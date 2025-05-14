const ProductValidator = require('../src/validators/productValidators');

describe('Verification Tests', () => {
    describe('Product Validation', () => {
        test('should detect invalid title', () => {
            const testProduct = {
                id: 999,
                title: '',  // Invalid: empty title
                price: 100,
                rating: { rate: 4.5 }
            };
            
            const errors = ProductValidator.validateProduct(testProduct);
            console.log('Invalid Title Test Results:', errors);
            expect(errors.some(error => error.includes('Title is empty'))).toBe(true);
        });

        test('should detect negative price', () => {
            const testProduct = {
                id: 998,
                title: 'Test Product',
                price: -50,  // Invalid: negative price
                rating: { rate: 4.5 }
            };
            
            const errors = ProductValidator.validateProduct(testProduct);
            console.log('Negative Price Test Results:', errors);
            expect(errors.some(error => error.includes('Invalid price'))).toBe(true);
        });

        test('should detect invalid rating', () => {
            const testProduct = {
                id: 997,
                title: 'Test Product',
                price: 100,
                rating: { rate: 6 }  // Invalid: rating > 5
            };
            
            const errors = ProductValidator.validateProduct(testProduct);
            console.log('Invalid Rating Test Results:', errors);
            expect(errors.some(error => error.includes('Invalid rating'))).toBe(true);
        });

        test('should detect multiple issues', () => {
            const testProducts = [
                {
                    id: 996,
                    title: '',  // Invalid
                    price: -10, // Invalid
                    rating: { rate: 7 }  // Invalid
                },
                {
                    id: 995,
                    title: 'Valid Product',
                    price: 100,
                    rating: { rate: 4.5 }  // Valid
                }
            ];
            
            const defectiveProducts = ProductValidator.validateProducts(testProducts);
            console.log('\nMultiple Issues Test Results:');
            console.log(JSON.stringify(defectiveProducts, null, 2));
            expect(defectiveProducts.length).toBe(1);
            expect(defectiveProducts[0].errors.length).toBe(3);
        });
    });
}); 