const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const db = new DynamoDBClient({ region: "ap-south-1" });

const createPost = async (event) => {
  const response = { statusCode: 200 };
  try {
    const body = JSON.parse(event.body);

    // Check for required fields
    // if (!body.postId || !body.firstName || !body.lastName || !body.email) {
    //   throw new Error('Required fields are missing.');
    // }

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall({
        postId: body.postId,
        jobTitle: body.jobTitle || null,
        totalExperience: body.totalExperience || null,
        employmentStartDateInHyniva: body.employmentStartDateInHyniva || null,
        supervisorName: body.supervisorName || null,
        projectName: body.projectName || null,
        clientName: body.clientName || null,
        plannedJoiningDateInTheProject: body.plannedJoiningDateInTheProject || null,
        plannedEndDateInTheProject: body.plannedEndDateInTheProject || null,
        actualJoiningDateInTheProject: body.actualJoiningDateInTheProject || null,
        actualEndDateInTheProject: body.actualEndDateInTheProject || null,
        location: body.location || null,
        billability: body.billability || null,
        remarksOnBillability: body.remarksOnBillability || null,
        laptopSpecification: body.laptopSpecification || null,
        asset1: body.asset1 || null,
        asset2: body.asset2 || null,
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
  createPost
};
