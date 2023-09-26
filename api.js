const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const db = new DynamoDBClient({ region: "ap-south-1" });

exports.createPost = async (event) => {
  const requestBody = JSON.parse(event.body);
  const postId = uuid.v4();

  const params = {
    TableName: 'employeeTable',
    Item: {
      postId,
    },
  };

  // Define a list of fields that can be added
  const fieldsToAdd = [
    'jobTitle',
    'totalExperience',
    'employmentStartDateInHyniva',
    'supervisorName',
    'projectName',
    'clientName',
    'plannedJoiningDateInTheProject',
    'plannedEndDateInTheProject',
    'actualJoiningDateInTheProject',
    'actualEndDateInTheProject',
    'location',
    'billability',
    'remarksOnBillability',
    'laptopSpecification',
    'asset1',
    'asset2'
  ];

  // Add fields from the request body if they exist
  fieldsToAdd.forEach((field) => {
    //if (requestBody[field]) {
      params.Item[field] = requestBody[field] || null;
    //}
  });

  try {
    await dynamoDB.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ postId }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create the post' }),
    };
  }
};

module.exports = {
  createPost
};
