const RESPONSE = {
  SUCCESS: {
    "statusCode": 200,
    "statusMessage": "Success", 
    "data": {}
  },
  MISSING_DATA: {
    "statusCode": 400,
    "statusMessage": "Required <data>, check again!!.",
    "data": {}
  },
  PASSWORD_NOT_FOUND: {
    "statusCode": 401,
    "statusMessage": "password doesn't match",
    "data": {}
  },
  NOT_MATCH:{
    "statusCode": 403,
    "statusMessage": "<data> Doesn't match",
    "data": {}
  },
  NOT_FOUND: {
    "statusCode": 403,
    "statusMessage": "<data> not found, Please try again",
    "data": {}
  },
  ROUTE_NOT_FOUND: {
    "statusCode": 404,
    "statusMessage": "Route not found, zzzz",
    "data": {}
  },
  EXISTS: {
    "statusCode": 409,
    "statusMessage": "<data> already exists, Please check",
    "data": {}
  },
  SOMETHING_WRONG: {
    "statusCode": 500,
    "statusMessage": "Something went wrong from server end, Please try again",
    "data": {}
  }
};

export { RESPONSE };
