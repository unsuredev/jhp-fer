import { Server } from "restify";
import { IsAuthenticated, IsSystemUserAuthenticated, IsUserAuthenticated } from "../policies/Authorizer";
import { UserController } from "../controllers/user.controller";

export default function routeDefinition(server: Server): void {
  const USER = new UserController();
  //only system user can create a user
  server.put("/user", IsAuthenticated, USER.addAUser);
  server.get("/user/:userId", IsAuthenticated, USER.getAUserDetails);

  server.patch("/user/:userId", IsAuthenticated, USER.updateUser);
  server.del("/user/:userId", IsAuthenticated, USER.removeAUser);
  server.post("/users", IsAuthenticated, USER.searchUsers);
  server.post("/auth-user", USER.authAUser);
}
