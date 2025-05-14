class ProductValidator {
    static validateProduct(product) {
        const errors = [];

        // Check title
        if (!product.title || product.title.trim() === '') {
            errors.push(`Product ID ${product.id}: Title is empty`);
        }

        // Check price
        if (typeof product.price !== 'number' || product.price < 0) {
            errors.push(`Product ID ${product.id}: Invalid price (${product.price})`);
        }

        // Check rating
        if (!product.rating || 
            typeof product.rating.rate !== 'number' || 
            product.rating.rate < 0 || 
            product.rating.rate > 5) {
            errors.push(`Product ID ${product.id}: Invalid rating (${product?.rating?.rate})`);
        }

        return errors;
    }

    static validateProducts(products) {
        if (!Array.isArray(products)) {
            return ['Invalid data format: Expected an array of products'];
        }

        const defectiveProducts = [];

        products.forEach(product => {
            const productErrors = this.validateProduct(product);
            if (productErrors.length > 0) {
                defectiveProducts.push({
                    product,
                    errors: productErrors
                });
            }
        });

        return defectiveProducts;
    }
}

module.exports = ProductValidator; 