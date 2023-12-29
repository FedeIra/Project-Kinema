const Comment = require('../Db/Schema/comment.js');

const { doc, getDoc } = require('firebase/firestore');
const { auth, firestore } = require("./firebase");

const getDataComments = async (movieSerieId) => {
    let info;
    let commentsFromContent = await Comment.find({ 'idReference': movieSerieId })
    if (commentsFromContent.length) {
        info = await Promise.all(commentsFromContent.map(async (comment) => {
            const docRef = doc(firestore, `/users/${comment.userId}`);
            const docSnap = await getDoc(docRef);
            let data = docSnap.data()
            return { ...comment._doc, avatar: data.avatar, username: data.username }
        }))
    }
    if(info) {
        return info
    } else {
        return []
    }
}

module.exports = {
    getDataComments
}
