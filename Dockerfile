# Use the official Cypress image as the base image
FROM cypress/included:13.0.0

# Set the working directory in the container to /cypress/e2e
WORKDIR /cypress/e2e

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . /cypress/e2e


# Install the project dependencies
RUN yarn install --ignore-engines

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Run the tests
CMD ["yarn", "run","cypress"]
