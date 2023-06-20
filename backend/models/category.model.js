import mongoose from "mongoose";
const categorySchema = new mongoose.Schema<ICategoryModel>(
  {
    type: {
        type:String,  
        required:[true, "Please Provide type !"]
    },
    image: {
      type: String,
      required: [true, "Please Provide Image Url!"],
    },
    image_key:{
		type:String,
		required: [true, "Please Provide Image Key!"],
	},
    city:{ 
        type:String,
        required: [true, "Please Provide city!"],
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;