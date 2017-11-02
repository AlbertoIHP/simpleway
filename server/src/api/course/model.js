import mongoose, { Schema } from 'mongoose'

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  totalvids: {
    type: String,
    required: true
  },
  users_id: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

courseSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      date: this.date,
      description: this.description,
      totalvids: this.totalvids,
      users_id: this.users_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Course', courseSchema)

export const schema = model.schema
export default model
