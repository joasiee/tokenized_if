// Delete mounted volumes to force this to run on container startup

print("***** Start creating databases *****");

db = db.getSiblingDB("commit-mgr");
db.createUser({
  user: "commit-user",
  pwd: "password123",
  roles: [{ role: "readWrite", db: "commit-mgr" }],
});

db = db.getSiblingDB("organization-mgr");
db.createUser({
  user: "organization-user",
  pwd: "password123",
  roles: [{ role: "readWrite", db: "organization-mgr" }],
});

print("***** End creating databases *****");
