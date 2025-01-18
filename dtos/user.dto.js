module.exports = class UserDto {
     firstName;
     lastName;
     email;
     id
     constructor(user) {
          this.firstName = user.firstName
          this.lastName = user.lastName
          this.email = user.email
          this.id = user._id
     }
}