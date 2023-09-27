const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const db = new DynamoDBClient({ region: "ap-south-1" });

const createEmployee = async (event) => {
  const response = { statusCode: 200 };
  try {
    const body = JSON.parse(event.body);

    // Check for required fields
    if (!body.jobTitle || !body.totalExperience || !body.projectName || !body.billability) {
      throw new Error('Required fields are missing.');
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall({
        postId: body.postId,
        jobTitle: body.jobTitle,
        totalExperience: body.totalExperience,
        employmentStartDateInHyniva: body.employmentStartDateInHyniva,
        supervisorName: body.supervisorName,
        projectName: body.projectName,
        clientName: body.clientName,
        plannedJoiningDateInTheProject: body.plannedJoiningDateInTheProject,
        plannedEndDateInTheProject: body.plannedEndDateInTheProject,
        actualJoiningDateInTheProject: body.actualJoiningDateInTheProject,
        actualEndDateInTheProject: body.actualEndDateInTheProject,
        location: body.location ,
        billability: body.billability ,
        remarksOnBillability: body.remarksOnBillability ,
        laptopSpecification: body.laptopSpecification ,
        asset1: body.asset1 ,
        asset2: body.asset2 ,
      }),
    };

    await db.send(new PutItemCommand(params));
    response.body = JSON.stringify({
      message: 'Successfully created post.',
    });
  } catch (e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: 'Failed to create post.',
      errorMsg: e.message,
      errorStack: e.stack,
    });
  }
  return response;
};

module.exports = {
  createEmployee
};
