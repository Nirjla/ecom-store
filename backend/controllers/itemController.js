const Item = require("../model/Item")

exports.getItems = async (req, res) => {
      try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit)
            const skip = (page - 1) * limit;
            const totalItems = await Item.countDocuments();
            const totalPages = Math.ceil(totalItems / limit)
            const searchTerm = req.query.q || ''
            searchTerm ? searchTerm.toLowerCase() : ''
            const items = await Item.find({
                  name: {
                        $regex: searchTerm, $options: 'i'
                  }
            }).skip(skip).limit(limit)
            res.status(200).json({
                  currentPage: page,
                  totalPages: totalPages,
                  items: items
            })
      } catch (err) {
            res.status(200).json({ message: err.message })
      }
}

exports.getItemById = async (req, res) => {
      try {
            const item = await Item.findById(req.params.id)
            res.status(200).json(item)
      } catch (err) {
            res.status(500).json({
                  message: err.message
            })
      }
}