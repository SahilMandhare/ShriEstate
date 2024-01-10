import List from "../models/list-model.js";

export const listingData = async (req, res, next) => {
  try {
    const listData = req.body;
    const newList = new List(listData);
    await newList
      .save()
      .then(() => res.json({ statusCode: 200, message: "Successfully" }))
      .catch((error) => next(error));
    console.log(newList);
  } catch (error) {
    next(error);
  }
};

export const userListData = async (req, res, next) => {
  try {
    const id = req.params.id;
    const listData = await List.find({ useRef: id });
    console.log(listData);
    res.status(200).json(listData);
  } catch (error) {
    next(error);
  }
};

export const listData = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const listData = await List.findById({ _id });
    console.log(listData);
    res.status(200).json(listData);
  } catch (error) {
    next(error);
  }
};

export const userListUpdate = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const listData = await List.findByIdAndUpdate(
      { _id },
      {
        $set: {
          name: req.body.name,
          address: req.body.address,
          description: req.body.description,
          regularPrice: req.body.regularPrice,
          discountPrice: req.body.discountPrice,
          bedrooms: req.body.bedrooms,
          bathrooms: req.body.bathrooms,
          furnished: req.body.furnished,
          parking: req.body.parking,
          type: req.body.type,
          offer: req.body.offer,
          imageUrls: req.body.imageUrls,
          useRef: req.body.useRef,
        },
      },
      { new: true }
    );
    console.log(listData);
    res.status(200).json(listData);
  } catch (error) {
    next(error);
  }
};

export const userListDelete = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const listData = await List.findByIdAndDelete({ _id });
    console.log(listData);
    res.status(200).json({ message: "List Deleted" });
  } catch (error) {
    next(error);
  }
};

export const getList = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const type =
      req.query.type === undefined || req.query.type === ""
        ? { $in: ["Sell", "Rent"] }
        : req.query.type;
    const offer =
      req.query.offer === undefined || req.query.offer === "false"
        ? { $in: [true, false] }
        : true;
    const furnished =
      req.query.furnished === undefined || req.query.furnished === "false"
        ? { $in: [true, false] }
        : true;
    const parking =
      req.query.parking === undefined || req.query.parking === "false"
        ? { $in: [true, false] }
        : true;

    const lists = await List.find({
      name: { $regex: search, $options: "i" },
      type,
      offer,
      furnished,
      parking,
    });

    res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
};
