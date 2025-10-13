SELECT
    user_profiles.name,
    sum(sales_deals.value)
FROM sales_deals
INNER JOIN user_profiles
ON sales_deals.user_id = user_profiles.id
GROUP BY user_profiles.name;