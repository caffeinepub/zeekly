# Deployment Guide

This document outlines the steps to build and deploy the Zeekly frontend application.

## Prerequisites

- Node.js and pnpm installed
- DFX (Internet Computer SDK) installed and configured
- Backend canister deployed

## Production Build

1. **Generate backend bindings** (if not already done):
   ```bash
   dfx generate backend
   ```

2. **Build the frontend**:
   ```bash
   cd frontend
   pnpm build
   ```

3. **Verify the build**:
   - Check that `frontend/dist` directory contains the built assets
   - Ensure no build errors in the console output

## Deployment

Deploy the frontend canister to the Internet Computer:

