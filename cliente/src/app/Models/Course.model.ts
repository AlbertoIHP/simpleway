export class Course {
  access_token: string
  id: string
  name: string
  date: string
  description: string
  users_id: string

  constructor()
  {
    this.access_token = ''
    this.id = ''
    this.name = ''
    this.date = ''
    this.description = ''
    this.users_id = ''
  }
}
