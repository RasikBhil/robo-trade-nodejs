import db from "../../datasource/index.js";
const favourites = db.favouritesModel;


const addToFavourite = async (client_ID, token, res) => {

    const isExist = await favourites.findOne({ client_ID: client_ID });
    console.log('IS EXIST', isExist);
    console.log('IS EXIST', !isExist.favourites.includes(token));
    if (!isExist.favourites.includes(token)) {

        if (isExist) {
            await favourites.findOneAndUpdate({ _id: isExist._id }, { $push: { favourites: token } }, {
                returnOriginal: true,
                upsert: true,
                useFindAndModify: false
            }).then(() => {
                res.status(200).json({ 'success': true, 'result': "instument added successfully" })
            })
        } else {
            const doc = {
                client_ID: client_ID,
                favourites: [token]
            }
            await favourites.create(doc).then(() => res.status(200).json({ 'success': true, 'result': "new client_ID and instument added successfully" }))
        }
    }else{
        res.status(200).json({ 'success': false, 'result': "instument already exists" })
    }

}

const deleteFromFavourite = async (client_ID, token, res) => {


    const isExist = await favourites.findOne({ client_ID: client_ID });
    console.log('IS EXIST', isExist);

    await favourites.findOneAndUpdate({ _id: isExist._id }, { $pull: { favourites: token } }).then((res) => {
        // res.status(200).json({ 'success': true, 'result': `instument deleted successfully = ${res}` })
    }).catch((e) => {
        console.log('error', e);
        console.log('====================================');
        res.json({ 'success': false, 'result': `Error on instument delete = ${e} ` })

    })
}


export { addToFavourite, deleteFromFavourite }