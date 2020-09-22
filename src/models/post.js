import {Schema, model} from 'mongoose'

const postSchema = new Schema(
    {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String },
    status: { type: Boolean },
    categories: [{
        ref: "Category",
        type: Schema.Types.ObjectId
    }]
    },
    {
        timestamps: true
    }
)

    export default model('Post', postSchema);
