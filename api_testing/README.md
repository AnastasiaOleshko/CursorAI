# FakeStore API Testing Suite

This project contains automated tests for validating the FakeStore API data quality and identifying potential defects in the product data.

## Project Structure

```
api_testing/
├── src/
│   ├── api/
│   │   └── fakeStoreApi.js      # API client
│   └── validators/
│       └── productValidators.js  # Data validation logic
├── tests/
│   └── fakeStore.test.js        # Test suite
├── jest.config.js               # Jest configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running Tests

To run the tests once:
```bash
npm test
```

To run tests in watch mode:
```bash
npm run test:watch
```

## Test Cases

The test suite validates the following:

1. Server Response
   - Verifies that the API returns a 200 status code
   - Confirms that the response contains an array of products

2. Product Data Validation
   - Title: Must not be empty
   - Price: Must not be negative
   - Rating: Must not exceed 5

3. Defect Reporting
   - Lists all products with invalid data
   - Provides detailed error messages for each defect
   - Shows complete product data for defective items

## Test Output

The test results will show:
- Overall test pass/fail status
- Detailed list of any defective products
- Specific validation errors for each defect
- Complete product data for items with defects

## API Endpoint

The tests are run against:
```
https://fakestoreapi.com/products
```

## Dependencies

- Jest: Testing framework
- Axios: HTTP client
- dotenv: Environment configuration 