const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1"
});

let docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    let payload = {
        status: null,
        data: null
    };
    
    let params = {
        TableName:"oowlish_test",
        Key:{
            "email": event.email
        }
    };
    
    docClient.get(params, function(err, data) {
        
            
        if (err) {
            console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
            payload.status = 'error';
            payload.data = err;
            callback(payload, null);
        } else {
            console.log("Added item:", JSON.stringify(data.Item, null, 2));
            payload.status = 'success';
            payload.data = data.Item;
            callback(null, payload);
        }
    });
}