import RefreshToken from "./models/refresh_token.js"
import User from "./models/user.js";

const dbInit = () => {
    console.log("INIT")
    // RefreshToken.sync({ alter: true });
    // User.sync({ alter: true });
}

export default dbInit;