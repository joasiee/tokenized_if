# How it works
The CI will automatically detect changes to project files and run steps accordingly.

## Building
Make sure to include a `build` script in your _package.json_ file, the CI will detect all `build` scripts in node projects located in the packages folder and run them sequentially.

## Testing
Make sure to include a `test:ci` script in your _package.json_ file, the CI will detect all `test:ci` scripts in node projects located in the packages folder and run them sequentially.
