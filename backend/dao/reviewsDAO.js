import mongodb, { ObjectID } from 'mongodb';

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
}