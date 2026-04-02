#!/bin/bash

# Blog Post Publisher Script
# Publishes the belting techniques blog post at scheduled time

cd /root/.openclaw/workspace/singtheeasyway111

# Copy the updated blog.html (with the new post entry) to the main file
cp blog-updated.html blog.html

# Add the new blog post file and the updated blog.html
git add blog-post-belting-techniques.html blog.html

# Configure git user for this commit
git config user.email "matt@singtheeasyway.com"
git config user.name "Matt Thompson"

# Commit the changes
git commit -m "Publish new blog post: Belting Techniques (March 31, 2026)"

# Push to GitHub
git push origin main

echo "Blog post published successfully at $(date)"