SELECT assignments.day AS day, COUNT(*) AS total_submissions
FROM assignments
GROUP BY day
HAVING COUNT(*) >= 10;
ORDER BY day;