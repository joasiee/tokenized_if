// Delete mounted volumes to force this to run on container startup

print("***** Start creating databases *****");

db = db.getSiblingDB("commit-mgr");
db = db.getSiblingDB("organization-mgr");
db = db.getSiblingDB("zkp-mgr");

print("***** End creating databases *****");
