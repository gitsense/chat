docker run -d \
  --name gitsense-chat-test \
  -p 3357:3357 \
  -v ~/.gitsense2/data:/app/data \
  -v ~/.gitsense2/repos:/app/repos \
  gitsense/chat
