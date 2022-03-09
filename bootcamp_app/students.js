const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "bootcampx",
});

// Simple query about students
// pool
//   .query(
//     `
// SELECT id, name, cohort_id
// FROM students
// LIMIT 5;
// `
//   )
//   .then((res) => {
//     console.log(res.rows);
//   })
//   .catch((err) => console.error("query error", err.stack));

// Dyanmic query parameters
// let input = process.argv.slice(2);
// let cohortName = input[0];
// let max = input[1];

// pool
//   .query(
//     `
// SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
// FROM students
// JOIN cohorts ON students.cohort_id = cohorts.id
// WHERE cohorts.name LIKE '%${cohortName}%'
// LIMIT ${max || 5};
// `
//   )
//   .then((res) => {
//     res.rows.forEach((user) => {
//       console.log(
//         `${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`
//       );
//     });
//   });

// Name of teachers that assisted (4_queries #12)
pool
  .query(
    `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort 
FROM teachers
JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
JOIN students ON assistance_requests.student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${process.argv[2] || "JUL02"}%'
ORDER BY teachers.name;
`
  )
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(`${user.cohort}: ${user.teacher}`);
    });
  });
