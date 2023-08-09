/*
This is my code which demonstrates the CRUD methodologies in MongoDB. At the start, I have created objects which contain data for which you may modify for your testing.
In the main method I have lots of method calls for you to use to ease testing. Each method uses the correct mongodb method for implementing CRUD. 
*/



const {MongoClient} = require('mongodb');


//object variables below

const pd = {
    "id" : 1,
    "title" : "mr",
    "fname" : "john",
    "surname" : "smith",
    "mobile" : "0987654321",
    "email" : "johnsmith@example.com"
};

const ha = {
    "id" : 1,
    "haddressl1" : "xyz street",
    "haddressl2" : "abc road",
    "htown" : "blanch",
    "hcity" : "dublin",
    "heircode" : "abc1234"
};
const sa = {
    "id" : 1,
    "saddressl1" : "tuv street",
    "saddressl2" : "def road",
    "stown" : "blanch",
    "scity" : "dublin",
    "seircode" : "def9876"
};

const updatedCustomer_pd = {
    "title" : "ms",
    "Mobile_Number" : "0987654321",
    "Email_Address" : "johnsmith@example.com"
};
const updatedCustomer_ha = {
    "Home_Address_Line1" : "xyz street",
    "Home_Address_Line2" : "abc road",
    "Home_Town" : "blanchard",
    "Home_City" : "dublin",
    "Home_Eircode" : "abc1234"
};
const updatedCustomer_sa = {
    "Shipping_Address_Line1" : "tuv street",
    "Shipping_Address_Line2" : "def road",
    "Shipping_Town" : "blanch",
    "Shipping_City" : "dublin 15",
    "Shipping_Eircode" : "def9876"
};

const customerToDelete = {
    "First_Name": "john",
    "Email_Address": "johnsmith@example.com",
    "Mobile_Number": "0987654321"
};

const item = {
    "Manufacturer" : "huawei",
    "Model" : "p30",
    "Price" : 600
};

const updatedItem = {
    "Manufacturer" : "Apple",
    "Model" : "iPhone",
    "Price" : 1200
};

const itemToDelete = {
    "Manufacturer" : "Apple",
    "Model" : "iPhone",
    "Price" : 1200
};

const od = {
    "customerID" : 1,
    "orderID" : 1,
    "itemsPurchased" : "1,2,3"
};

const updatedOrder = {
    "CustomerID" : 1,
    "OrderID" : 1,
    "ItemsPurchased" : "1,2"
};

const orderToDelete = {
    "customerID" : 1,
    "orderID" : 1,
    "itemsPurchased" : "s21, s22, s23, s24"
};

//main function to call CRUD methods

async function main(title,fname,surname,mobile,email,haddressl1,haddressl2,htown,hcity,heircode,saddressl1,saddressl2,stown,scity,seircode,Manufacturer,model,price,items,order,dbo){

    const uri = "mongodb+srv://admin:---------@cluster0.zpbmup0.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try{
        await client.connect();
        const db = client.db('Assignment-05-21346633');
        const personalDetails = db.collection("personaldetails");
        const homeAddress = db.collection("homeaddress");
        const shippingAddress = db.collection("shippingaddress");
        const orderDetails = db.collection("orderdetails");
        const itemDetails = db.collection("itemdetails");
        
        //crud method calls below

        await insertCustomer(personalDetails, homeAddress, shippingAddress, pd, ha, sa);
        await findCustomer(personalDetails, homeAddress, shippingAddress, 1);
        await updateCustomer(personalDetails, homeAddress, shippingAddress, 1, updatedCustomer_pd, updatedCustomer_ha, updatedCustomer_sa);
        await findCustomer(personalDetails, homeAddress, shippingAddress, 1);
        await deleteCustomer(personalDetails, homeAddress, shippingAddress, customerToDelete);
        await findCustomer(personalDetails, homeAddress, shippingAddress, 1);
        await insertItem(itemDetails, item);
        await findItem(itemDetails, 1);
        await updateItem(itemDetails, 1, updatedItem);
        await findItem(itemDetails, 1);
        await deleteItem(itemDetails, itemToDelete);
        await insertOrder(orderDetails, od);
        await findOrder(orderDetails, 1);
        await updateOrder(orderDetails, 1, updatedOrder);
        await deleteOrder(orderDetails, orderToDelete);


    } catch (e) {
        console.error(e)
    }
    finally {

        await client.close();
    }
}


//create customer details, shipping address, home address
 async function insertCustomer(personalDetails, homeAddress, shippingAddress, pd, ha, sa){

    if(pd.fname==="" || pd.surname===""|| pd.mobile===""|| pd.email===""|| ha.haddressl1===""|| ha.htown===""|| ha.hcity===""|| sa.saddressl1===""|| sa.stown===""|| sa.scity===""){
        console.log("Error! Please fill in all required fields!")
    }
    else{

        const result1 = await personalDetails.insertOne({
            "id" : 1,
            "title": pd.title,
            "First_Name": pd.fname,
            "Surname": pd.surname,
            "Mobile_Number": pd.mobile,
            "Email_Address": pd.email
        })
        console.log(`New listing created with the following id: ${result1.insertedId}`);

        const result2 = await homeAddress.insertOne({
            "id" : 1,
            "Home_Address_Line1": ha.haddressl1,
            "Home_Address_Line2": ha.haddressl2,
            "Home_Town": ha.htown,
            "Home_City": ha.hcity,
            "Home_Eircode": ha.heircode

        })
        console.log(`New listing created with the following id: ${result2.insertedId}`); 

        const result3 = await shippingAddress.insertOne({
            "id" : 1,
            "Shipping_Address_Line1": sa.saddressl1,
            "Shipping_Address_Line2": sa.saddressl2,
            "Shipping_Town": sa.stown,
            "Shipping_City": sa.scity,
            "Shipping_Eircode": sa.seircode
        })
        console.log(`New listing created with the following id: ${result3.insertedId}`);
    }
}
//read  retrieving and displaying customer details, shipping address, home address
async function findCustomer(personalDetails, homeAddress, shippingAddress, id){
    const result1 = await personalDetails.findOne({ id: id });
    const result2 = await homeAddress.findOne({ id: id });
    const result3 = await shippingAddress.findOne({ id: id });

    if (result1 && result2 && result3) {
        console.log(`Search results:`);
        console.log(`Personal details:`);
        console.log(`ID: '${result1.id}', Title: '${result1.title}', First name: '${result1.First_Name}', Surname: '${result1.Surname}', Mobile: '${result1.Mobile_Number}', Email: '${result1.Email_Address}'`);
        console.log(`Home address:`);
        console.log(`Address Line 1: '${result2.Home_Address_Line1}', Address Line 2: '${result2.Home_Address_Line2}', Town: '${result2.Home_Town}', City: '${result2.Home_City}', eircode: '${result2.Home_Eircode}'`);
        console.log(`Shipping address:`);
        console.log(`Address Line 1: '${result3.Shipping_Address_Line1}', Address Line 2: '${result3.Shipping_Address_Line2}', Town: '${result3.Shipping_Town}', City: '${result3.Shipping_City}', eircode: '${result3.Shipping_Eircode}'`);
    } else {
        console.log(`No listings found with the id '${id}'`);
    }
}


//update  update customer details, shipping address, home address based on id
async function updateCustomer(personalDetails, homeAddress, shippingAddress, id, pd, ha, sa) {
    const result1 = await personalDetails.updateOne({ id: id }, { $set: pd});
    const result2 = await homeAddress.updateOne({ id: id }, { $set: ha});
    const result3 = await shippingAddress.updateOne({ id: id }, { $set: sa});
    console.log(`document(s) was/were updated.`);
}

//delete  delete customer details, shipping address, home address based on id
async function deleteCustomer(personalDetails, homeAddress, shippingAddress, toDelete) {
    const result1 = await personalDetails.findOne(toDelete);
    let idToDelete = result1.id;
    const result2 = await personalDetails.deleteOne({ id: idToDelete });
    const result3 = await homeAddress.deleteOne({ id: idToDelete });
    const result4 = await shippingAddress.deleteOne({ id: idToDelete });
    console.log(`Document(s) was/were deleted.`);
}

//create item details
async function insertItem(itemDetails, item){
    if(item.Manufacturer==="" || item.model==="" || item.price===""){
        console.log("Error! Please fill in all required fields!");
    }
    else{
        const result = await itemDetails.insertOne({
            "id" : 1,
            "Manufacturer": item.Manufacturer,
            "Model": item.Model,
            "Price" : item.Price
        });
    console.log(`New listing created with the following id: ${result.insertedId}`);
    }
}

//read  retrieving and displaying item details
async function findItem(itemDetails, id){
    const result = await itemDetails.findOne({ id: id });
    if (result) {
        console.log(`Search results:`);
        console.log(`Item details:`);
        console.log(`ID: '${result.id}', Manufacturer: '${result.Manufacturer}', Model: '${result.Model}', Price: '${result.Price}'`); 
    } else {
        console.log(`No listings found with the id '${id}'`);
    }
}

//update  update item based on id
async function updateItem(itemDetails, id, updatedItem) {
    const result = await itemDetails.updateOne({ id: id }, { $set: updatedItem});
    console.log(`document(s) was/were updated.`);
}

//delete  delete item based on id
async function deleteItem(itemDetails, toDelete) {
    const result = await itemDetails.deleteOne(toDelete);
    console.log(`Document(s) was/were deleted.`);
}

//create order details
async function insertOrder(orderDetails, od){
    const result = await orderDetails.insertOne({
        "CustomerID": od.customerID,
        "OrderID": od.orderID,
        "ItemsPurchased" : od.itemsPurchased
    });
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

//read  retrieving and displaying order details
async function findOrder(orderDetails, id){
    const result = await orderDetails.findOne({ OrderID: id });
    if (result) {
        console.log(`Search results:`);
        console.log(`Item details:`);
        console.log(`CustomerID: '${result.CustomerID}', OrderID: '${result.OrderID}', ItemsPurchased: '${result.ItemsPurchased}'`); 
    } else {
        console.log(`No listings found with the id '${id}'`);
    }
}

//update  update order based on id
async function updateOrder(orderDetails, id, updatedOrder) {
    const result = await orderDetails.updateOne({ OrderID: id }, { $set: updatedOrder});
    console.log(`document(s) was/were updated.`);
}

//delete  delete order based on order to delete
async function deleteOrder(orderDetails, orderToDelete) {
    const result = await orderDetails.deleteOne(orderToDelete);
    console.log(`Document(s) was/were deleted.`);
}




main().catch(console.error);