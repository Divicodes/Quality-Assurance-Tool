import { connection} from "../index.js";
import { addComponentService, getComponentsBasedOnTestLeadService } from "../services/componentService.js";
import { parseRowDataPacket } from "../services/parsingService.js";
import { sendInternalServerError, sendCustomError, sendCustomSuccess } from "./common.js";

export const addComponent = async (req, res) => {
    const serviceResponse = await addComponentService(req.body);
    if(serviceResponse.success === true){
        sendCustomSuccess(res, serviceResponse.data);
    }
    else{
        sendInternalServerError(res);
    }
}

export const getComponentsBasedOnTestLead = async(req, res) => {
  const {testlead_id} = req.params;
  const serviceResponse = await getComponentsBasedOnTestLeadService(testlead_id);
  if(serviceResponse.success === true){
    sendCustomSuccess(res, serviceResponse.data);
  }
  else{
    sendInternalServerError(res);
  }
}

// export const getComponentsBasedOnTestLead = async (req, res) => {
//   const {testlead_id} = req.params;
//   console.log(testlead_id);
//   const getComponentsBasedOnTestLead=  `SELECT * FROM Component WHERE testlead_id = ${testlead_id}`;
//   const getUserBasedOnId = `SELECT * FROM User WHERE e_id = ${testlead_id}`;

//   try{
//       const userResponse = await connection.query(getUserBasedOnId);
//       const users = parseRowDataPacket(userResponse);
//       if(users.length >0)
//       {

//           const result = await connection.query(getComponentsBasedOnTestLead); 
//           console.log(parseRowDataPacket(result));
//           sendCustomSuccess(res, result);
//       }
//       else{
//           sendCustomError(res, 404, 'Entity Not Found');
//       }
//   }
//   catch(e){
//       console.log(e)
//       sendInternalServerError(res);
//   }
// }

export const getComponentsBasedOnProject = (req, res) => {
  console.log(req);
  const {project_id} = req.params;
  const getComponentsBasedOnProject=  `SELECT * FROM Component WHERE project_id = ?`;
  const getProjectBasedOnId = `SELECT * FROM Project WHERE p_id = ?`
  connection.query(getProjectBasedOnId, [project_id], (err, result) => {
    if(result){
      connection.query(getComponentsBasedOnProject, [project_id], (err, result)=>{
        if(result[0]){
            sendCustomSuccess(res, result);
        }
        else{
            sendCustomError(res, 404, 'Entity Not Found');
        }
      });
    }
    else{
        console.log(err);
        sendInternalServerError(res);
    }
  });
}

// export const addComponent = (req, res) => {
//   try{
//       const {
//           c_id, 
//           c_name,
//           c_desc,
//           c_status,
//           project_id,
//           testlead_id,         
//       } = req.body;

//       const getComponentByIdQuery = 'SELECT * FROM Component WHERE c_id = ?;';

//       const componentUpdateQuery = `UPDATE Component SET
//           c_name = ?,
//           c_desc = ?,
//           c_status = ?,
//           project_id = ?,
//           testlead_id = ?
//           WHERE c_id = ?;
//       `;
//       const componentAddQuery = `INSERT INTO Component (
//           c_id,
//           c_name,
//           c_desc,
//           c_status,
//           project_id,
//           testlead_id) VALUES (NULL, ?, ?,?,?,?)
//       `;

//       const getLastInerstedIdQuery = `SELECT LAST_INSERT_ID();`;

//       if(c_id){ //Update
//           connection.query(componentUpdateQuery, [
//               c_name,
//               c_desc, 
//               c_status,
//               project_id,
//               testlead_id
//           ], (err, result) => {
//               if(err){
//                 console.log(err); 
//                   sendInternalServerError(res);
//               }
//               else{
//                   connection.query(getComponentByIdQuery, [c_id], (err, result)=>{
//                       if(result[0]){
//                           sendCustomSuccess(res, result[0]);
//                       }
//                       else{
//                           sendCustomError(res, 404, 'Entity Not Found');
//                       }
//                   });
//               }
//           });
//       }
//       else{ //Add New
//           connection.query(componentAddQuery, [
//               c_name,
//               c_desc,
//               c_status, 
//               project_id,
//               testlead_id, 
//           ], (err, result) => {
//               if(err){
//                   console.log(err);
//                   sendInternalServerError(res);
//               }
//               else{
//                   connection.query(getLastInerstedIdQuery, (err, result) => {
//                       if(result){
//                           let id = result[0]['LAST_INSERT_ID()'];
//                           connection.query(getComponentByIdQuery, [id], (err, result)=>{
//                               if(result[0]){
//                                   sendCustomSuccess(res, result[0]);
//                               }
//                               else{
//                                   sendCustomError(res, 404, 'Entity Not Found');
//                               }
//                           });
//                       }
//                       else{
//                           console.log(err);
//                           sendInternalServerError(res);
//                       }
//                   })
//               }
//           });
//       }
//   }
//   catch(err){
//     console.log(err);
//       sendInternalServerError(res);
//   }
// }
