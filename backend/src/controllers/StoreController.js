const Store = require("../models/store");

const StoreController = {
  searchStore: async (req, res) => {
    try {
      const city = req.params.city;
      const searchQuery = req.query.searchQuery || "";
      const selectedCategories = req.query.selectedCategories || "";
      const sortOption = req.query.sortOption || "lastUpdated";
      const page = parseInt(req.query.page) || 1;

      let query = {};

      query["city"] = new RegExp(city, "i");
      const cityCheck = await Store.countDocuments(query);
      if (cityCheck === 0) {
        return res.status(404).json({
          data: [],
          pagination: {
            total: 0,
            page: 1,
            pages: 1,
          },
        });
      }

      if (selectedCategories) {
        const categoriesArray = selectedCategories
          .split(",")
          .map((category) => new RegExp(category, "i"));

        query["categories"] = { $all: categoriesArray };
      }

      if (searchQuery) {
        const searchRegex = new RegExp(searchQuery, "i");
        query["$or"] = [
          { name: searchRegex },
          { categories: { $in: [searchRegex] } },
        ];
      }

      const pageSize = 10;
      const skip = (page - 1) * pageSize;
      const stores = await Store.find(query)
        .sort({ [sortOption]: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean();
      const total = await Store.countDocuments(query);

      const response = {
        data: stores,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      };

      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
};

module.exports = StoreController;
