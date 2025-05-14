# SQL Sales Analysis Project

This project contains SQL queries for analyzing sales data from an online store.

## Files

- `init.sql`: Database initialization script (creates tables and populates sample data)
- `analysis_queries.sql`: Analysis queries for sales data

## Setup Instructions

1. Visit [SQLite Online](https://sqliteonline.com/)
2. Copy and paste the contents of `init.sql` to create and populate the database
3. Run the queries from `analysis_queries.sql` one by one to see the results

## Analysis Tasks

### 1. March 2024 Sales Volume
```sql
-- Query to get total sales for March 2024
SELECT SUM(amount) FROM orders 
WHERE strftime('%Y-%m', order_date) = '2024-03';
```
Expected Result: 27,000

### 2. Top Customer by Spending
```sql
-- Query to find customer with highest total spending
SELECT customer, SUM(amount) as total_spent
FROM orders GROUP BY customer 
ORDER BY total_spent DESC LIMIT 1;
```
Expected Result: Alice with 20,000

### 3. Average Order Value
```sql
-- Query to calculate average order value
SELECT ROUND(AVG(amount), 2) FROM orders;
```
Expected Result: 6,000

## Sample Data Overview

The database contains the following sample orders:
- Alice: 4 orders (5000, 3000, 10000, 2000)
- Bob: 2 orders (8000, 4000)
- Charlie: 2 orders (7000, 9000)

## Notes

- All amounts are in currency units (e.g., dollars)
- Dates are in YYYY-MM-DD format
- The sample data spans February and March 2024 