import mongoose, { Schema } from 'mongoose'

const inscribedSchema = new Schema({
  users_id: {
    type: String,
    required: true
  },
  course_id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  completed: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

inscribedSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      users_id: this.users_id,
      course_id: this.course_id,
      date: this.date,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Inscribed', inscribedSchema)

export const schema = model.schema
export default model
