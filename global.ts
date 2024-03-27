class HTTPStatusCode {
    OK = 200; //success
    BAD_REQUEST = 400;
    NOT_FOUND = 404;
    INTERNAL_SERVER =  500;
    UNAUTHORIZED = 401;
    CREATED =201; // create
}
class ErrorMessages {
    USER_REGISTER_SUCCESS = "User Registred Successfully";
    USER_REGISTER_FAILED = "User Registration Failed";
    USER_EXIST = "User already exists";
    EMAIL_EXIST = "Email already exists";
    COUNTRY_EXIST = "Country already exists";
    STATE_EXIST = "Country already exists";
    CITY_EXIST = "City already exists";
    MOBILE_NO_EXIST = "Mobile Number already exists";
    CATEGORY_EXIST = "Category already exists";
    SUBCATEGORY_EXIST = "Subcategory already exists";
    PROGRAMMING_LANGUAGE_EXIST = "Programming Language already exists";
    LANGUAGE_EXIST = "Language already exists";
    VIDEO_EXIST = "Video already exists";
    CHAPTER_EXIST = "Chapter already exists";
    WRONG_CREDENTIALS = "Invalid Credentials";
    SUCCESS = "Login Successfully";
    NOT_EXISTS = "Data does not exists";
    SAVED = "Saved Successfully";
    CREATED = "Created Successfully";
    GETDATA = "Got data Successfully";
    UPDATED = "Updated Successfully";
    DELETED = "Deleted Successfully";
    NOT_FOUND = "Record not found";
    INTERNAL_SERVER = 'Server error!';
    ADDED = "Record Added Successfully";
    VIDEO_UPLOAD = "Video Uploaded Successfully";
    INVALID_OBJECT_ID = "Invalid Objectid";
    COURSE_NOT_FOUND = "Course does not exists";
    CATEGORY_NOT_FOUND = "Category does not exists";
    SUBCATEGORY_NOT_FOUND = "Subcategory does not exists";
    LANGUAGE_NOT_FOUND = "Language does not exists";
    FILE_NOT_FOUND = "File does not exists";
    VIDEO_NOT_FOUND = "Video does not exists";
    REVIEW_ADD = "Review added Successfully"
}
module.exports.HTTPStatusCode = new HTTPStatusCode()
module.exports.ErrorMessages = new  ErrorMessages()