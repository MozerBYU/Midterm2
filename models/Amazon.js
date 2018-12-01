var mongoose = require('mongoose');

var AmazonSchema = new mongoose.Schema({
   ProductName: String,
   ProductPrice: { type: Number, default: 0.00 },
   ProductPictureUrl: String,
   ProductPurchaseCount: { type: Number, default: 0 }
});

AmazonSchema.methods.uppurchase = function(cb) {
    console.log("In purchase method");
    console.log("Count " + this.ProductPurchaseCount);                  //why did this fix it???
    this.ProductPurchaseCount += 1;
    console.log("Count after update " + this.ProductPurchaseCount);     //why did this fix it???
    this.save(cb);
    
};

mongoose.model('Amazon', AmazonSchema);