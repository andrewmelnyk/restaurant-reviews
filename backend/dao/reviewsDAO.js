import mongodb from 'mongodb';

const ObjectID = mongodb.ObjectID;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        }

        try {
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection('reviews');
        } catch (ex) {
            console.error(`Unable to establish connection handles in userDAO: ${ex.message}`);
        }
    }

    static async addReview(restaurantId, user, review, date) {
        try {
            const reviewDoc = {
                user_id: user._id,
                name: user.name,
                date,
                text: review,
                restaurant_id: ObjectID(restaurantId),
            }

            return await reviews.insertOne(reviewDoc);
        } catch (ex) {
            console.error(`Unable to post review: ${ex}`);
            return { error: ex };
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectID(reviewId) },
                { $set: { text, date, } },
            );

            return updateResponse;
        } catch (ex) {
            console.error(`Unable to update review: ${ex}`);

            return { error: ex };
        }
    }

    static async deleteReview(reviewId, userId, text, date) {
        try {
            const deleteResponse = await reviews.deleteOne(
                { 
                    _id: ObjectID(reviewId) ,
                    user_id: userId, 
                },
            );

            return deleteResponse;
        } catch (ex) {
            console.error(`Unable to delete review: ${ex}`);

            return { error: ex };
        }
    }
}