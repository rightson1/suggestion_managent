export const recent_forms = [
  {
    name: "Computer Science Feedback Form",
    form_fills: 66,
    createdAt: "2024-07-01",
  },
  {
    name: "Business and IT Feedback Form",
    form_fills: 64,
    createdAt: "2024-06-21",
  },
  {
    name: "Election Date Feedback Form",
    form_fills: 60,
    createdAt: "2024-06-01",
  },
  {
    name: "International Relations Feedback Form",
    form_fills: 55,
    createdAt: "2024-05-01",
  },
  {
    name: "Law Feedback Form",
    form_fills: 50,
    createdAt: "2024-04-01",
  },
  {
    name: "Economics Feedback Form",
    form_fills: 45,
    createdAt: "2024-03-01",
  },
];
export type TRecentForms = (typeof recent_forms)[0];

const people = [
  { name: "John Smith", email: "john.smith@example.com" },
  { name: "Emma Johnson", email: "emma.johnson@example.com" },
  { name: "Olivia Brown", email: "olivia.brown@example.com" },
  { name: "Liam Jones", email: "liam.jones@example.com" },
  { name: "Ava Garcia", email: "ava.garcia@example.com" },
  { name: "Noah Martinez", email: "noah.martinez@example.com" },
  { name: "Sophia Lee", email: "sophia.lee@example.com" },
  { name: "Mason Anderson", email: "mason.anderson@example.com" },
  { name: "Isabella Harris", email: "isabella.harris@example.com" },
  { name: "Lucas Clark", email: "lucas.clark@example.com" },
];
const departments = [
  "School of Computing",
  "School of Business",
  "School of International Relations",
  "School of Law",
];
export const users = (() => {
  return people.map((person, i) => ({
    ...person,
    department: departments[i % departments.length],
    status: i % 2 === 0 ? "Active" : "Inactive",
  }));
})();

export type TUser = (typeof users)[0];

export const departments_data = [
  {
    name: "School of Computing",
    number_of_students: 66,
    number_of_forms: 5,
  },
  {
    name: "School of Business",
    number_of_students: 64,
    number_of_forms: 4,
  },
  {
    name: "School of International Relations",
    number_of_students: 60,
    number_of_forms: 3,
  },
  {
    name: "School of Law",
    number_of_students: 55,
    number_of_forms: 2,
  },
  {
    name: "School of Engeneering",
    number_of_students: 50,
    number_of_forms: 1,
  },
];
export type TDepartment = (typeof departments_data)[0];
