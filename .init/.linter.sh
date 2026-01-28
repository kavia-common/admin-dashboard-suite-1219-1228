#!/bin/bash
cd /tmp/kavia/workspace/code-generation/admin-dashboard-suite-1219-1228/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

