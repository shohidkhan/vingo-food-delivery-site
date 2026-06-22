const itemSchema = new mongoose.schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    category: {
      type: String,
      enum: [
        "Snacks",
        "Desserts",
        "Main Course",
        "Pizza",
        "Fast Food",
        "Chinese",
        "Bengali",
        "Drinks",
        "others",
      ],
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },
  },
  { timestamps: true },
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
