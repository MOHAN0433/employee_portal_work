const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");

const db = new DynamoDBClient({ region: "ap-south-1" });

const createPost = async (event) => {
  const response = { statusCode: 200 };
  try {
    const body = JSON.parse(event.body);

    // Check for required fields
    if (!body.postId || !body.firstName || !body.lastName || !body.email) {
      throw new Error('Required fields are missing.');
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: marshall({
        postId: body.postId,
        jobTitle: body.jobTitle,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber || null,
        userId: body.userId || null,
        address: body.address || null,
        gender: body.gender || null,
        password: body.password || null,
        confirmPassword: body.confirmPassword || null,
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
