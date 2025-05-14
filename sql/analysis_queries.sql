-- 1. Calculate total sales volume for March 2024
SELECT 
    'March 2024 Total Sales' as metric,
    SUM(amount) as total_amount
FROM orders 
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- 2. Find the customer who spent the most overall
SELECT 
    customer,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- 3. Calculate the average order value
SELECT 
    'Average Order Value' as metric,
    ROUND(AVG(amount), 2) as avg_amount
FROM orders; 