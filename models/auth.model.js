class AuthModel {
  static userRegister = ({ user }) => {
    return { success: true, message: 'Usuario creado satisfactoriamente' }
  }
}

export default AuthModel
