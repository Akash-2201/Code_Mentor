# Code Mentor — Cloud Run Deployment Guide

## Prerequisites

- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) installed and authenticated
- Docker installed locally (optional — Cloud Build can build for you)
- Project ID: `code-mentor-496518`
- Region: `us-central1`

---

## Step 0: Set your project

```bash
gcloud config set project code-mentor-496518
gcloud config set run/region us-central1
```

---

## Step 1: Enable required APIs

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com
```

---

## Step 2: Create Artifact Registry repository (one-time)

```bash
gcloud artifacts repositories create code-mentor \
  --repository-format=docker \
  --location=us-central1 \
  --description="Code Mentor Docker images"
```

Configure Docker authentication:

```bash
gcloud auth configure-docker us-central1-docker.pkg.dev
```

---

## Step 3: Build the Docker image

### Option A: Build locally and push

```bash
# From the project root (ai-governance-ide/)
docker build -t us-central1-docker.pkg.dev/code-mentor-496518/code-mentor/app:latest .

docker push us-central1-docker.pkg.dev/code-mentor-496518/code-mentor/app:latest
```

### Option B: Build with Cloud Build (recommended — no local Docker needed)

```bash
gcloud builds submit \
  --tag us-central1-docker.pkg.dev/code-mentor-496518/code-mentor/app:latest \
  .
```

---

## Step 4: Deploy to Cloud Run

```bash
gcloud run deploy code-mentor \
  --image us-central1-docker.pkg.dev/code-mentor-496518/code-mentor/app:latest \
  --region us-central1 \
  --platform managed \
  --port 8080 \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 5 \
  --allow-unauthenticated \
  --set-env-vars "\
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json,\
GOOGLE_CLOUD_PROJECT_ID=code-mentor-496518,\
NEXTAUTH_URL=https://YOUR_CLOUD_RUN_URL,\
NEXTAUTH_SECRET=nexus-hackathon-secret-2026-governance-ide,\
GOOGLE_CLIENT_ID=18789881165-xxxxxxxxxxxx.apps.googleusercontent.com,\
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx"
```

> **IMPORTANT**: After the first deploy, get your Cloud Run URL and re-deploy with the actual URL:

```bash
# Get the URL
gcloud run services describe code-mentor --region us-central1 --format='value(status.url)'

# Then update NEXTAUTH_URL with the real URL:
gcloud run services update code-mentor \
  --region us-central1 \
  --update-env-vars "NEXTAUTH_URL=https://code-mentor-XXXXX-uc.a.run.app"
```

---

## Step 5: Configure Google OAuth redirect

After deploying, add the Cloud Run URL to your Google OAuth credentials:

1. Go to [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
2. Click your OAuth 2.0 Client ID
3. Under **Authorized redirect URIs**, add:
   ```
   https://code-mentor-XXXXX-uc.a.run.app/api/auth/callback/google
   ```
4. Under **Authorized JavaScript origins**, add:
   ```
   https://code-mentor-XXXXX-uc.a.run.app
   ```
5. Click **Save**

---

## Quick Redeploy (after code changes)

```bash
# One-liner: build + deploy
gcloud builds submit \
  --tag us-central1-docker.pkg.dev/code-mentor-496518/code-mentor/app:latest . \
  && gcloud run deploy code-mentor \
  --image us-central1-docker.pkg.dev/code-mentor-496518/code-mentor/app:latest \
  --region us-central1
```

---

## Environment Variables Reference

| Variable | Value | Description |
|---|---|---|
| `GOOGLE_APPLICATION_CREDENTIALS` | `./google-credentials.json` | Path to service account key (baked into image) |
| `GOOGLE_CLOUD_PROJECT_ID` | `code-mentor-496518` | GCP project for Vertex AI |
| `NEXTAUTH_URL` | `https://YOUR_CLOUD_RUN_URL` | Public URL (update after first deploy) |
| `NEXTAUTH_SECRET` | `nexus-hackathon-secret-2026-governance-ide` | JWT signing secret |
| `GOOGLE_CLIENT_ID` | `18789881165-...` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | `GOCSPX-...` | Google OAuth client secret |

---

## Troubleshooting

### Container crashes on startup
```bash
gcloud run services logs read code-mentor --region us-central1 --limit 50
```

### Check if standalone output was created
```bash
docker run --rm -it us-central1-docker.pkg.dev/code-mentor-496518/code-mentor/app:latest ls -la /app/
```

### Vertex AI "permission denied"
Ensure the service account in `google-credentials.json` has the `Vertex AI User` role:
```bash
gcloud projects add-iam-policy-binding code-mentor-496518 \
  --member="serviceAccount:YOUR_SA@code-mentor-496518.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"
```
