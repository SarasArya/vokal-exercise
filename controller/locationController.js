module.exports.save = (req, res) => {
    console.log(req.user._id);
    const userId = req.user._id;
    const {
        searchName, places
    } = req.body;
    const location = new Location({
        userId: userId,
        searchName: searchName,
        locations: places
    }).save();
    location.then(response => {
        // console.log(response);
        res.sendStatus(200);
    }).catch(error => {
        console.error(error);
        res.sendStatus(400);
    });
};

module.exports.fetch = (req, res) => {
    const userId = req.user._id;
    const promise = Location.find({
        userId: userId
    }, {
        searchName : 1,
        locations: 1
    }).exec();

    promise.then(response => {
        // console.log(response);
        if (response) {
            res.status(200).send(response);
        } else {
            return Promise.reject("Could not find any saved locations");
        }
    }).catch(error => {
        // console.error(error);
        res.status(400).send({
            message: error
        });
    });
};
