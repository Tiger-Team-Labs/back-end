import { text } from 'express'
import {Schema, model} from 'mongoose'

const postSchema = new Schema(
    {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String },
    status: { type: Boolean },
    category: { type: String }
    },
    {
        timestamps: true
    }
)

    export default model('Post', postSchema);
