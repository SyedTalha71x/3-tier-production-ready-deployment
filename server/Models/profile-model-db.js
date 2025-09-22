export const CHECK_USER_PROFILE="SELECT * FROM users WHERE id = ?"
export const UPDATE_USER_PROFILE="UPDATE users SET  language = ?, profile_picture = ?, city = ?, country = ?, position = ?, full_name = ?, date_of_birth = ?, summary = ? WHERE id = ? "
export const UPDATE_PROFILE_PICTURE="UPDATE users SET profile_picture = ? WHERE id = ?"
