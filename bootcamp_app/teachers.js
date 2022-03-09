const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "bootcampx",
});

// Name of teachers that assisted (4_queries #12)
// pool
//   .query(
//     `
// SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
// FROM teachers
// JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
// JOIN students ON assistance_requests.student_id = students.id
// JOIN cohorts ON students.cohort_id = cohorts.id
// WHERE cohorts.name LIKE '%${process.argv[2] || "JUL02"}%'
// ORDER BY teachers.name;
// `
//   )
//   .then((res) => {
//     res.rows.forEach((user) => {
//       console.log(`${user.cohort}: ${user.teacher}`);
//     });
//   });

// Name of teachers that assisted (4_queries #12) - prevent sql injections
const queryString = `
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort 
  FROM teachers
  JOIN assistance_requests ON teachers.id = assistance_requests.teacher_id
  JOIN students ON assistance_requests.student_id = students.id
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  ORDER BY teachers.name;
  `;
const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

pool.query(queryString, values).then((res) => {
  res.rows.forEach((user) => {
    console.log(`${user.cohort}: ${user.teacher}`);
  });
});
