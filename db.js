


const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://asimshakoor920830:asim119913@cluster0.qgiam4y.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'
const mongodb = async () => {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true
    }, async () => {

        console.log("Db connected")
        const fetched_data = await mongoose.connection.db.collection("food_items")
        fetched_data.find({}).toArray(async function (err, data) {
            const foodCategory = await mongoose.connection.db.collection("foodCategory")
            foodCategory.find({}).toArray(function (err, catData) {
                if (err) { console.log(err) }

                else {
                    global.food_items = data;
                    global.foodCategory = catData;
                }
            });

        });
    });

}


module.exports = mongodb