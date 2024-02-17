/**
 * @author Umesh
 *
 * Problem Statement : JavaScript Program to Perform CRUD Operation on Database Where
 * Database = Folder
 * Table = Text File {Convert into Json}
 * Record = Text Line //json
 */

/**
 * @constant fs Importing File System to Perform Operation On file
 * @constant path Importing Path provides a way of working with directories and file paths
 */

// const { Console } = require("console");
const fs = require("fs");
const path = require("path");

/**
 * @function createDatabase
 * @param {string} database_name
 * @throws Error if Database Name is Not Correct and Database is Already Exist
 */

function createDatabase(database_name) {
  if (validateDatabaseName(database_name) == true) {
    fs.mkdir(database_name, (err) => {
      if (err) throw err;
      console.log(`Database "${database_name}" created successfully.`);
    });
  } else {
    throw new Error(`Database Name is Not correct`);
  }
}

/**
 * @function validateDatabaseName
 * @param {string} database_name
 * @throws Errors of Database_name validation
 * @returns {boolean} true if Database Name is Correct
 */

function validateDatabaseName(database_name) {
  // Check if Database name is not empty
  if (!database_name.trim()) {
    throw new "Database name cannot be empty."();
  }

  // Check if Database name starts with a number
  if (/^\d/.test(database_name)) {
    throw new "Database name cannot start with a number."();
  }

  // Check if Database name contains only alphanumeric characters, hyphens, underscores, and spaces
  if (!/^[a-zA-Z0-9_]+$/.test(database_name)) {
    throw new "Database name can only contain letters, numbers underscores, and spaces."();
  }

  // Check if Database name starts or ends with a space
  if (database_name.startsWith(" ") || database_name.endsWith(" ")) {
    throw new "Database name cannot start or end with a space"();
  }

  // Check if Database name is not too long
  if (database_name.length > 255) {
    throw new "Database name is too long "();
  }

  // Database name is valid
  return true;
}

//Done With Database Creation

/**
 * @function delete_database
 * @param {string} database_name
 * @throws database Not Found
 * This function use to delete the database
 */

function delete_database(database_name) {
  fs.rmdir(database_name, { recursive: true }, (err) => {
    if (err) throw err;
    console.log(`Database "${database_name}" deleted successfully.`);
  });
}

// Done with deletion

/**
 * @function rename_database
 * @param {string} old_database_name
 * @param {string} new_database_name
 * @throws Error if database is not Found
 * this function is used to rename the database
 */

function rename_database(database_name, new_database_name) {
  fs.rename(database_name, new_database_name, (err) => {
    if (err) throw err;
    console.log(
      `Database "${database_name}" renamed to "${new_database_name}" successfully.`
    );
  });
}

//Done with rename of database

/**
 * @function database_contents
 * @param {string} database_name
 * @throws Error if database is not found
 */

function database_contents(database_name) {
  fs.readdir(database_name, (err, files) => {
    if (err) throw err;
    console.log(`Contents of Database "${database_name}":`);
    files.forEach((file) => {
      console.log(file);
    });
  });
}

//done with read contents of database

/**
 * @function create_table
 * @param {string} database_name
 * @param {string}  table_name
 * @throws Error if database is not found and Table name is already exist
 */

function create_table(database_name, table_name) {
  const filePath = path.join(database_name, table_name);

  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    console.log(
      "table is already exist",
      table_name,
      "database name",
      database_name
    );

    return;
  }

  const row = [];
  fs.writeFile(filePath, JSON.stringify(row), (err) => {
    if (err) throw err;
    console.log(
      `Table "${table_name}" created successfully in database "${database_name}".`
    );
  });
}

//done with table creation

/**
 * @function read_table
 * @param {string} database_name
 * @param {string} table_name
 * this function used to read the table
 */

function read_table(database_name, table_name) {
  fs.readFile(path.join(database_name, table_name), "utf8", (err, data) => {
    if (err) throw err;
    console.log(`Contents of "${table_name}" in Database "${database_name}":`);
    console.log(JSON.parse(data));
  });
}

//done with read table

/**
 * @function delete_table
 * @param {string} database_name
 * @param {string} table_name
 * this function used to delete the table
 */

function delete_table(database_name, table_name) {
  const filePath = path.join(database_name, table_name);

  fs.unlink(filePath, (err) => {
    if (err) throw err;
    console.log(
      `Table "${table_name}" deleted successfully from database "${database_name}".`
    );
  });
}

//done with delete table

/**
 * @function rename_table_name
 * @param {string} database_name
 * @param {string} table_name
 * @param {string} new_table_name
 * @throws error if database is not found
 * this function is used to rename the table name
 */

function rename_table_name(database_name, old_table_name, new_table_name) {
  const oldFilePath = path.join(database_name, old_table_name);
  const newFilePath = path.join(database_name, new_table_name);

  // Check if the old table file exists
  if (!fs.existsSync(oldFilePath)) {
    console.log(
      `Table "${old_table_name}" does not exist in database "${database_name}".`
    );
    return;
  }

  // Rename the table file
  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) throw err;
    console.log(
      `Table "${old_table_name}" renamed to "${new_table_name}" in database "${database_name}" successfully.`
    );
  });
}

//done with rename table name

/**
 * @function create_row
 * @param {string} database_name
 * @param {string} table_name
 * @param {string} record
 * @throws Error if database & Table is not found
 * this function is used to a create a row in table
 */

function create_row(database_name, table_name, record) {
  console.log("record type" + typeof record);
  fs.readFile(path.join(database_name, table_name), "utf8", (err, data) => {
    if (err) throw err;
    const dataArray = JSON.parse(data);
    dataArray.push(record);
    fs.writeFile(
      path.join(database_name, table_name),
      JSON.stringify(dataArray),
      (err) => {
        if (err) throw err;
        console.log(
          `Data written to "${table_name}" in Database "${database_name}" successfully.`
        );
      }
    );
  });
}

// Done with creating Row

/**
 * @function update_row
 * @param {string} database_name
 * @param {string} table_name
 * @param {number} id
 * @param {string} update_record
 * @throws Error if database & Table is not found & id is not found
 * this function is used to update a row in table
 */

function update_row(database_name, table_name, id, update_record) {
  const filePath = path.join(database_name, table_name);

  // Read the contents of the table file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;

    const dataArray = JSON.parse(data);

    // Find the index of the record with the given ID
    const indexToUpdate = dataArray.findIndex((item) => item.id === id);

    // If the record with the given ID is not found, show an error
    if (indexToUpdate === -1) {
      console.log(
        `Record with ID "${id}" not found in table "${table_name}" in database "${database_name}".`
      );
      return;
    }

    // Update the record at the found index with the new data
    dataArray[indexToUpdate] = update_record;

    // Write the updated data back to the table file
    fs.writeFile(filePath, JSON.stringify(dataArray), (err) => {
      if (err) throw err;
      console.log(
        `Record with ID "${id}" updated successfully in table "${table_name}" in database "${database_name}".`
      );
    });
  });
}

//done with Updation of row

/**
 * @function delete_row
 * @param {string} database_name
 * @param {string} table_name
 * @param {number} id
 * @throws Error if database & Table is not found & id is not found
 * this function is used to delete the row
 */

function delete_row(database_name, table_name, id) {
  const filePath = path.join(database_name, table_name);

  // Read the contents of the table file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;

    const dataArray = JSON.parse(data);

    // Find the index of the record with the given ID
    const indexToDelete = dataArray.findIndex((item) => item.id === id);

    // If the record with the given ID is not found, show an error
    if (indexToDelete === -1) {
      console.log(
        `Record with ID "${id}" not found in table "${table_name}" in database "${database_name}".`
      );
      return;
    }

    // Remove the record at the found index
    dataArray.splice(indexToDelete, 1);

    // Write the updated data back to the table file
    fs.writeFile(filePath, JSON.stringify(dataArray), (err) => {
      if (err) throw err;
      console.log(
        `Record with ID "${id}" deleted successfully from table "${table_name}" in database "${database_name}".`
      );
    });
  });
}

/**
 * @function jsontotext_table
 * @param {string} databaseName
 * @param {string} tableName
 * @throws Error if table & database is not found
 * this function converts json into text table format
 *
 */

function jsontotext_table(databaseName, tableName) {
  fs.readFile(path.join(databaseName, tableName), "utf8", (err, data) => {
    if (err) throw err;

    const tableData = JSON.parse(data);

    const columns = Object.keys(tableData[0]);

    let formattedTable = "";

    formattedTable += "| ";
    columns.forEach((column) => {
      formattedTable += `${column} | `;
    });
    formattedTable += "\n";

    formattedTable += "| ";
    columns.forEach(() => {
      formattedTable += "--- | ";
    });
    formattedTable += "\n";

    tableData.forEach((row) => {
      formattedTable += "| ";
      columns.forEach((column) => {
        formattedTable += `${row[column]} | `;
      });
      formattedTable += "\n";
    });

    console.log(`Contents of "${tableName}" in Database "${databaseName}":`);
    console.log(formattedTable);

    fs.writeFile(
      path.join(databaseName, `${tableName}_formatted.txt`),
      formattedTable,
      (err) => {
        if (err) throw err;
        console.log("Formatted table saved to file.");
      }
    );
  });
}

//reading is done

/**
 * @function menu_form
 * @param {string} database_name
 * @param {string} table_name
 *
 * @throws Error if database & table is not found
 *
 * this is function for a menu Form
 */

function menu_form(database_name, table_name) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(" ******  DATABASE MANAGER ****** ");

  console.log("\n 1.Database \n 2.Table \n 3.Records \n");

  readline.question("Enter a Choice:-", (choice) => {
    const ch = parseInt(choice);

    switch (ch) {
      case 1:
        console.log(" *** DataBase Operation *** ");

        console.log(
          "\n1.Create the Database\n2.Show Database Contents\n3.Rename Database\n4.Delete Database\n5.Close"
        );

        readline.question("Enter Choice:- ", (ch) => {
          const ch1 = parseInt(ch);

          switch (ch1) {
            //create Database
            case 1:
              readline.question("enter Database name:-", (db_name) => {
                createDatabase(db_name);
              });

              break;

            //show database contents
            case 2:
              readline.question("enter Database name:-", (db_name) => {
                database_contents(db_name);
              });

              break;

            case 3:
              //rename database
              readline.question("enter Database name:-", (db_name1) => {
                readline.question("enter New Database name:-", (db_name) => {
                  rename_database(db_name1, db_name);
                });
              });

              break;

            //delete Database
            case 4:
              readline.question("enter Database name:-", (db_name) => {
                delete_database(db_name);
              });

              break;

            //close option
            case 5:
              console.log("close");
              readline.close();
              break;

            default:
              console.log("xX enter correct choice Xx");
              readline.close();
              break;
          }
        });

        break;

      case 2:
        console.log(" *** Table Operation *** ");

        console.log(
          "\n1.Create Table\n2.Read Table\n3.Rename Table\n4.Delete Table\n5.Close"
        );

        readline.question("Enter Choice :- ", (ch) => {
          //convert String to Number
          const ch1 = parseInt(ch);

          switch (ch1) {
            //create table
            case 1:
              readline.question("Enter DataBase Name:-", (db_name) => {
                readline.question("Enter Table_Name.json:-", (tb_name) => {
                  create_table(db_name, tb_name);
                });
              });
              break;

            //read data from table
            case 2:
              readline.question("Enter DataBase Name:-", (db_name) => {
                readline.question("Enter Table_Name.json:-", (tb_name) => {
                  read_table(db_name, tb_name);
                });
              });
              break;

            //rename the table old to new
            case 3:
              readline.question("Enter DataBase Name:-", (db_name) => {
                readline.question("Enter Table_Name.json:-", (tb_name) => {
                  readline.question(
                    "Enter New_Table_Name.json:-",
                    (tb1_name) => {
                      rename_table_name(db_name, tb_name, tb1_name);
                    }
                  );
                });
              });
              break;

            //delete the table
            case 4:
              readline.question("Enter DataBase Name:-", (db_name) => {
                readline.question("Enter Table_Name.json:-", (tb_name) => {
                  delete_table(db_name, tb_name);
                });
              });
              break;
            //close the option
            case 5:
              console.log("Close");
              readline.close();
              break;

            default:
              console.log("xX enter correct choice Xx");
              readline.close();
              break;
          }
        });

        break;

      case 3:
        console.log(" *** Records Operation *** ");
        console.log(
          "\n1.Create Row\n2.Update Row\n3.Read Row\n4.Delete Row\n5.Close"
        );
        readline.question("Enter Choice :- ", (ch) => {
          const ch1 = parseInt(ch);

          switch (ch1) {
            //create a record/row
            case 1:
              readline.question("Enter DataBase Name:-", (db_name) => {
                readline.question("Enter Table_Name.json:-", (tb_name) => {
                  readline.question("Enter Data in Json Format-", (record) => {
                    create_row(db_name, tb_name, record);
                  });
                });
              });
              break;
            //update a record/row by using their id
            case 2:
              readline.question("Enter DataBase Name:-", (db_name) => {
                readline.question("Enter Table_Name.json:-", (tb_name) => {
                  readline.question("Enter id-", (id) => {
                    const temp_id = parseInt(id);

                    readline.question(
                      "Enter Data in Json Format-",
                      (record) => {
                        update_row(db_name, tb_name, temp_id, record);
                      }
                    );
                  });
                });
              });

              break;

            //read a record from table
            case 3:
              readline.question("Enter DataBase Name:-", (db_name) => {
                readline.question("Enter Table_Name.json:-", (tb_name) => {
                  read_table(db_name, tb_name);
                });
              });

              break;

            //delete a record from table using their id
            case 4:
              readline.question("Enter DataBase Name:-", (db_name) => {
                readline.question("Enter Table_Name.json:-", (tb_name) => {
                  readline.question("Enter id-", (id) => {
                    const temp_id = parseInt(id);

                    console.log("inside delete " + typeof temp_id);

                    delete_row(db_name, tb_name, temp_id);
                  });
                });
              });

              break;
          }
        });
    }
  });
}
//close menu form

/** Test Function */

function test() {
  //various CRUD Operations
  // createDatabase("umesh09")
  // delete_database("umesh09")
  // rename_database("database", "database1")
  // database_contents("umesh09")
  //curd on Table
  // create_table("umesh09", "students.json")
  // read_table( "umesh09" , "students.json")
  // delete_table("umesh09" , "students.json")
  // rename_table_name("umesh09","students.json","students_details.json")
  // curd on record
  // create_row("umesh09", "students.json", {
  //   id: 1,
  //   name: "Umesh Shelare",
  //   dateOfBirth: "2024-07-09",
  // })
  // update_row("umesh09","students_details.json",2,{ id: 1, name: 'umesh shelare', dateOfBirth: '2022-01-01' })
  // delete_row("umesh09","students_details.json",1)
  // read_table( "umesh09" , "students.json")
  // jsontotext_table("umesh09" , "students.json")
  //testing menu form
  // menu_form()
}

// test();

module.exports = read_table,database_contents;