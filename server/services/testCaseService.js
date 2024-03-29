import moment from 'moment';
import { connection } from '../index.js';
import { parseRowDataPacket } from './parsingService.js';


export const addTestCaseService = async (testCase) => {
  try {
    const {
      tc_id,
      tc_name,
      tc_desc,
      tc_status,
      mode_of_execution,
      component_id,
      tester_id,
    } = testCase;
    console.log(testCase);
    let getTestCaseByIdQuery = `SELECT * FROM TestCase WHERE tc_id = ${tc_id};`;
    const created_at = moment(new Date()).format('YYYY-MM-DD HH:MM:SS');
    let testCaseUpdateQuery = `UPDATE TestCase SET
        tc_name = '${tc_name}',
        tc_desc = '${tc_desc}',
        tc_status = '${tc_status}',
        mode_of_execution = '${mode_of_execution}',
        component_id = ${component_id},
        tester_id = ${tester_id}
        WHERE tc_id = ${tc_id};
    `;
    let testCaseAddQuery = `INSERT INTO TestCase (
        tc_id,
        tc_name,
        tc_desc,
        tc_status,
        mode_of_execution,
        component_id,
        created_at,
        tester_id) VALUES (${null}, '${tc_name}', '${tc_desc}','${tc_status}','${mode_of_execution}',${component_id},
        "${created_at}", ${tester_id})
    `;
    if (tc_id) { //Update
      const response = await connection.query(testCaseUpdateQuery);
      const insertedObject = await connection.query(getTestCaseByIdQuery);
      const result = parseRowDataPacket(insertedObject);
      // console.log('RRR', result, result[0].created_at, typeof result[0].created_at);
      return {
        success: true,
        data: result[0]
      };
    }
    else { //Add New
      // console.log('Checking the query', testCaseAddQuery);
      const response = await connection.query(testCaseAddQuery);
      getTestCaseByIdQuery = `SELECT * FROM TestCase WHERE tc_id = ${response.insertId};`;
      const insertedObject = await connection.query(getTestCaseByIdQuery);
      const result = parseRowDataPacket(insertedObject);
      return {
        success: true,
        data: result[0]
      };
    }
  }
  catch (err) {
    console.log(err);
    return {
      success: false,
      message: err.message
    }
  }
}

export const getTestCasesBasedOnComponentService = async (component_id) => {
  const getTestCasesBasedOnComponentQuery = `SELECT * FROM TestCase WHERE component_id = ${component_id}`;
  try {
    const result = parseRowDataPacket(await connection.query(getTestCasesBasedOnComponentQuery));
    return {
      success: true,
      data: result,
    }
  }
  catch (e) {
    console.log(e);
    return {
      success: false,
      message: e
    }
  }
}

export const getTestCasesBasedOnTesterService = async (tester_id) => {
  const getTestCasesBasedOnTesterQuery = `SELECT * FROM TestCase WHERE tester_id = ${tester_id}`;
  try {
    const result = parseRowDataPacket(await connection.query(getTestCasesBasedOnTesterQuery));
    return {
      success: true,
      data: result,
    }
  }
  catch (e) {
    console.log(e);
    return {
      success: false,
      message: e
    }
  }
}