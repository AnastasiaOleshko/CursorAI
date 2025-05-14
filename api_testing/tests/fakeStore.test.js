const FakeStoreApi = require('../src/api/fakeStoreApi');
const ProductValidator = require('../src/validators/productValidators');

describe('FakeStore API Tests', () => {
    let api;

    beforeAll(() => {
        api = new FakeStoreApi();
    });

    describe('GET /products', () => {
        let response;
        let defectiveProducts;

        beforeAll(async () => {
            response = await api.getProducts();
            defectiveProducts = ProductValidator.validateProducts(response.data);
        });

        test('should return status code 200', () => {
            expect(response.statusCode).toBe(200);
        });

        test('should return an array of products', () => {
            expect(Array.isArray(response.data)).toBe(true);
            expect(response.data.length).toBeGreaterThan(0);
        });

        test('all products should have valid titles', () => {
            const productsWithInvalidTitles = defectiveProducts
                .filter(item => item.errors.some(error => error.includes('Title is empty')));
            
            if (productsWithInvalidTitles.length > 0) {
                console.log('\nProducts with invalid titles:');
                productsWithInvalidTitles.forEach(item => {
                    console.log(`- Product ID ${item.product.id}: "${item.product.title}"`);
                });
            }
            
            expect(productsWithInvalidTitles.length).toBe(0);
        });

        test('all products should have valid prices', () => {
            const productsWithInvalidPrices = defectiveProducts
                .filter(item => item.errors.some(error => error.includes('Invalid price')));
            
            if (productsWithInvalidPrices.length > 0) {
                console.log('\nProducts with invalid prices:');
                productsWithInvalidPrices.forEach(item => {
                    console.log(`- Product ID ${item.product.id}: $${item.product.price}`);
                });
            }
            
            expect(productsWithInvalidPrices.length).toBe(0);
        });

        test('all products should have valid ratings', () => {
            const productsWithInvalidRatings = defectiveProducts
                .filter(item => item.errors.some(error => error.includes('Invalid rating')));
            
            if (productsWithInvalidRatings.length > 0) {
                console.log('\nProducts with invalid ratings:');
                productsWithInvalidRatings.forEach(item => {
                    console.log(`- Product ID ${item.product.id}: Rating ${item.product.rating?.rate}`);
                });
            }
            
            expect(productsWithInvalidRatings.length).toBe(0);
        });

        test('should list all defective products', () => {
            if (defectiveProducts.length > 0) {
                console.log('\nAll defective products:');
                defectiveProducts.forEach(item => {
                    console.log(`\nProduct ID ${item.product.id}:`);
                    console.log('Errors:');
                    item.errors.forEach(error => console.log(`- ${error}`));
                    console.log('Product data:', JSON.stringify(item.product, null, 2));
                });
            }
            
            // This test will pass even if there are defective products
            // It's meant to provide information rather than fail the test suite
            expect(true).toBe(true);
        });
    });
}); 