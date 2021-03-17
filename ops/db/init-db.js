// Delete mounted volumes to force this to run on container startup

print("***** Start creating databases *****");

db = db.getSiblingDB("commit-mgr");
db.createUser({
  user: "commit-user",
  pwd: "password123",
  roles: [{ role: "readWrite", db: "commit-mgr" }],
});

print("***** End creating databases *****");
