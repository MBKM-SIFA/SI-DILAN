require("dotenv").config({ path: `${__dirname}/.env` });
module.exports = {
  option: {
    saltLength: 6,
    keyLength: 9,
  },
  columns: {
    employee_data: [
      // NOTE : NIP aren't included.
      // 'nip',
      "name",
      "nik",
      "gender",
      "place_of_birth",
      "date_of_birth",
      "religion",
      "phone",
      "email",
      "age",
      "profession_status",
      "specialization",
      "last_education",
      "department",
      "ranks",
    ],
    permission: [
      "institution_name",
      "acreditation",
      "institution_address",
      "institution_phone_number",
      "education_level",
      "study_program",
      "major",
      "year_of_study",
    ],
  },
  database: {
    host: "127.0.0.1", // process.env.DBhost, // localhost
    user: "root", // process.env.DBusername,
    password: "", // process.env.DBpassword,
    database: "sidilan", //process.env.DBname,
    multipleStatements: true,
  },
};
