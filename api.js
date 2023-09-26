const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const db = new DynamoDBClient({ region: "ap-south-1" });

const createPost = async (event) => {
  const response = { statusCode: 200 };
  try {
    const body = JSON.parse(event.body);
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall({
        postId: body.postId,
        jobTitle: body.jobTitle,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email, // Fixed the attribute name
        phoneNumber: body.phoneNumber,
        userId: body.userId,
        address: body.address,
        gender: body.gender,
        password: body.password,
        confirmPassword: body.confirmPassword,
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
  createPost,
};
