SELECT assignments.day AS day, COUNT(assignments.*) AS total_submissions
FROM assignments
GROUP BY day
ORDER BY day;