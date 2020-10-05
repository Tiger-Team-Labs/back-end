import {Schema, model} from 'mongoose'

const commentSchema = new Schema(
    {
        author: {
            ref: "User",
            type: Schema.ObjectId,
            required: true
        },
        content: { type: String, required: true },
        post: {
            ref: "Post",
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model('Comment', commentSchema);