-- Verification queries to check results against expected values

-- 1. Verify March 2024 total sales (Expected: 27,000)
SELECT 
    'March 2024 Sales Check' as check_name,
    CASE 
        WHEN SUM(amount) = 27000 THEN 'PASS'
        ELSE 'FAIL - Expected 27000, Got ' || SUM(amount)
    END as result
FROM orders 
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- 2. Verify top customer (Expected: Alice with 20,000)
WITH customer_totals AS (
    SELECT 
        customer,
        SUM(amount) as total_spent
    FROM orders
    GROUP BY customer
)
SELECT 
    'Top Customer Check' as check_name,
    CASE 
        WHEN customer = 'Alice' AND total_spent = 20000 THEN 'PASS'
        ELSE 'FAIL - Expected Alice with 20000, Got ' || customer || ' with ' || total_spent
    END as result
FROM customer_totals
ORDER BY total_spent DESC
LIMIT 1;

-- 3. Verify average order value (Expected: 6,000)
SELECT 
    'Average Order Value Check' as check_name,
    CASE 
        WHEN ROUND(AVG(amount), 0) = 6000 THEN 'PASS'
        ELSE 'FAIL - Expected 6000, Got ' || ROUND(AVG(amount), 0)
    END as result
FROM orders; 