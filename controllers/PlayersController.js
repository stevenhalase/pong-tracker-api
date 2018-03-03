var PlayerModel = require('../models/PlayerModel.js');

/**
 * PlayerController.js
 *
 * @description :: Server-side logic for managing Players.
 */
module.exports = {

    /**
     * PlayerController.list()
     */
    list: function (req, res) {
        PlayerModel.find(function (err, Players) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Player.',
                    error: err
                });
            }
            return res.json(Players);
        });
    },

    /**
     * PlayerController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        PlayerModel.findOne({_id: id}, function (err, Player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Player.',
                    error: err
                });
            }
            if (!Player) {
                return res.status(404).json({
                    message: 'No such Player'
                });
            }
            return res.json(Player);
        });
    },

    /**
     * PlayerController.create()
     */
    create: function (req, res) {
        var Player = new PlayerModel({
          Name : req.body.name
        });

        Player.save(function (err, Player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Player',
                    error: err
                });
            }
            return res.status(201).json(Player);
        });
    },

    /**
     * PlayerController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        PlayerModel.findOne({_id: id}, function (err, Player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Player',
                    error: err
                });
            }
            if (!Player) {
                return res.status(404).json({
                    message: 'No such Player'
                });
            }

            Player.Name = req.body.name ? req.body.name : Player.Name;
			
            Player.save(function (err, Player) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Player.',
                        error: err
                    });
                }

                return res.json(Player);
            });
        });
    },

    /**
     * PlayerController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        PlayerModel.findByIdAndRemove(id, function (err, Player) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Player.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};