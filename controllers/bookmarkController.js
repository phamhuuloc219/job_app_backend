const Bookmark = require('../models/Bookmark');

module.exports = {
    createBookmark: async (req, res) => {
        const newBookmark = new Bookmark(req.body);
        try {
            await newBookmark.save();
            res.status(201).json("Bookmark successfully created");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getBookmarks: async (req, res) => {
        try {
            const bookmarks = await Bookmark.find({userId: req.params.userId});
            res.status(200).json(bookmarks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteBookmark: async (req, res) => {
        const bookmarkId = req.params.id;
        try {
            await Bookmark.findByIdAndDelete(bookmarkId);
            res.status(200).json("Bookmark deleted successfully");
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}