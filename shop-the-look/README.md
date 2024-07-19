# 👘  Shop The Look 

## An advanced multimodal search engine for finding your new favorite outfit

https://github.com/user-attachments/assets/8a0f7d34-0768-4ea3-a21f-48ab93635a1e

## 📔 Table of Contents

- [💃🏻 Overview](#-overview)
- [💡 Features](#-features)
- [🔧 Setup & Installation](#-setup--installation)
  - [Demo Deployment](#%EF%B8%8F-demo-deployment-2-minutes)
  - [Full Deployment](#%EF%B8%8F-full-deployment-30-minutes)
- [🌉 Use Your Own Images and Videos](#-use-your-own-images-and-videos-20-minutes)
- [🫠 Troubleshooting](#-troubleshooting)
- [⚠️ Service Limitations](#%EF%B8%8F-service-limitations)
- [📝 Contributing](#-contributing)
- [🔮 Built With](#-built-with)

## 💃🏻 Overview

Shop The Look is an advanced multimodal search engine for finding outfit inspiration built using Pinecone Serverless, Google's Multimodal Embedding Model, and assets from Pexels. 

This sample application is a great starting point for you to build your own multimodal search engine for your use cases. Simply clone it, run it locally or deploy it to Vercel, and customize it to make it your own.

## 💡 Features

- **Multimodal Search**: Combines text, image, and video inputs to provide highly relevant outfit recommendations.
- **Pinecone Serverless Integration**: Uses Pinecone Serverless vector database for efficient and scalable multimodal search. 
- **Google Cloud Vertex AI**: Leverages Google's [Multimodal Embedding Model](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings) for accurate and high-quality embeddings of text, images, and videos.
- **Vercel Deployment**: Easily deploy the application to Vercel in a few clicks.
- **Customizable**: Modify both NextJS frontend and Python FastAPI backend components to fit your specific use cases, such as e-commerce, product showcase, or personal image and video search.
- **Extensive Asset Library**: Demo app includes over 45,000 royalty-free images and videos from Pexels, pre-embedded and upserted for immediate use.
- **Convenient Scripts**: Includes scripts to easily upload your own images and videos for your own use cases.

## 🔧 Setup & Installation

We offer two installation methods for Shop The Look:

1. [Demo Deployment](#%EF%B8%8F-demo-deployment-2-minutes) - quick setup for demo purposes
3. [Full Deployment](#%EF%B8%8F-full-deployment-30-minutes) - bring your own images and videos + full setup

#### Not sure which installation method to use? 

![Installation Flowchart](./assets/installation-flowchart.png)

## ☁️ Demo Deployment (2 minutes)

*Note: This is for **demonstration purposes only**.*

For developers who want to quickly deploy and test the Shop The Look application without setting up their own backend services or supply their own image/video assets, we offer a demo deployment option that includes over 45,000 royalty-free images and videos. This method allows you to deploy only the front-end to Vercel or run it locally, while utilizing our hosted backend API (which we have set up with all assets, Pinecone Serverless index, and Google Cloud Vertex AI).

### Benefits
- No need to set up Pinecone or Google Cloud accounts
- Contains over 45,000 royalty-free image and video assets embedded, upserted, and uploaded
- Faster deployment process
- For testing and exploration (not for production)

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- A Vercel account (for Vercel deployment)

### 💻 Local Demo Deployment

1. Clone the repository:
   ```bash
   git clone https://github.com/pinecone-io/sample-apps-internal.git
   cd sample-apps-internal/shop-the-look
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the frontend server:
   ```bash
   npm run next-dev
   # or
   yarn next-dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🚀 Vercel Demo Deployment

TODO: npx create-next-app@latest --app https://github.com/pinecone-io/sample-apps-internal.git

1. Clone the repository to your GitHub account.
   ```bash
   git clone https://github.com/pinecone-io/sample-apps-internal.git
   cd sample-apps-internal/shop-the-look
   ```

2. Log in to your Vercel account and click "New Project".

3. Import the repository.

4. In the "Configure Project" step:
   - Set the Framework Preset to Next.js
   - In the "Environment Variables" page, modify `NEXT_PUBLIC_VERCEL_ENV` to `demo`:
     ```
     NEXT_PUBLIC_VERCEL_ENV=demo
     ```

5. Click "Deploy".

Your Shop The Look front-end should now be deployed and accessible via the Vercel URL provided, using our hosted backend API for all data operations.

***Note**: While this demo deployment is great for testing and exploration, for production use, you will need to setup your own backend services in the **Full Deployment** section below.*

## ☀️ Full Deployment (30 minutes)

For developers who want to deploy a fully customizable Shop The Look application with their own images and videos, we offer a full deployment option. This method requires setting up both the frontend and backend components, including Pinecone Serverless, Google Cloud Vertex AI, and Google Cloud Storage, and uploading your own images and videos.

### Benefits
- Adaptable to use cases beyond outfit recommendation (e.g., product showcase, e-commerce, interior design, personal image and video search, etc)
- Use your own images and videos
- Modify frontend and backend logic and services to meet your use cases
- Production-ready

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Python 3.8 or later
- A Google Cloud account
- A Pinecone account
- A Vercel account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pinecone-io/sample-apps-internal.git
   cd sample-apps-internal/shop-the-look
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Setup API Keys

In order to deploy the full Shop The Look sample app, you need to setup the following services. Shop The Look ***will not work*** without these services. 

<details>
<summary>
Google Cloud Setup
</summary>

Google Cloud setup allows you to use Vertex AI, a machine learning platform that allows you to embed your images and videos using Google's Multimodal Embedding Model. This will also allow you to upload your images and videos to Google Cloud Storage.

1. Create a new project in the [Google Cloud Console](https://console.cloud.google.com/).

2. Enable the following APIs for your project:
   - Vertex AI API
   - Cloud Storage API

3. Create a service account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Give it a name and grant it the following roles:
     - Vertex AI User
     - Storage Object Viewer

4. Generate a JSON key for the service account:
   - Click on the service account
   - Go to the "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON format and download the key file

5. Encode the JSON key file to base64:
   ```bash
   base64 -i path/to/your-key-file.json | tr -d '\n' > google-credentials-base64.txt
   ```

6. Save the base64-encoded key, we will be using this in the [Environment Variables](#environment-variables) section. 

7. *Optional:* To run the Google Cloud Vertex AI SDK locally (for testing purposes), follow the gcloud CLI authentication setup instructions [here](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#prereqs). 
</details>

<details>
<summary>
Pinecone Setup
</summary>

This step allows you to use Pinecone Serverless, our very own serverless vector database service, to upsert the multimodal embeddings to Pinecone.

1. Sign up for a [Pinecone account](https://www.pinecone.io/?utm_source=shop-the-look&utm_medium=referral).
2. Create a new Pinecone Serverless Index with the following settings:
   - Dimensions: 1408 (for Google's Multimodal Embedding Model)
   - Metric: Cosine
   - TODO: other stuff + screenshots

3. Note down your Pinecone API key, you will need this to connect to your Pinecone index.

</details>

### 💻 Local Full Deployment (5 minutes)

#### Environment Variables

1. Modify `.env.development.example` **(in the root directory of this repository)** and change name to `.env.development`:

```
PINECONE_API_KEY=[your_pinecone_api_key]
GOOGLE_CREDENTIALS_BASE64=[your_base64_encoded_google_credentials]
NEXT_PUBLIC_VERCEL_ENV=development
NEXT_PUBLIC_DEVELOPMENT_URL=http://localhost:8000
```

2. Save the above environment variables to your shell configuration file (`.bashrc`, `.zshrc`, or any other `rc` file you use). Alternatively, you can set these environment variables manually in [your shell](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-linux).

#### Deploy

1. Start the backend & frontend server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. *Optional*: The backend API server is available at [http://localhost:8000/api/](http://localhost:8000/api/), simply send your REST requests to this endpoint to interact with the backend API.

### 🚀 Vercel Full Deployment (5 minutes)

TODO: Deploy using npx-create

We have made it incredibly easy to deploy Shop The Look to [Vercel](https://vercel.com/), a popular cloud platform for building and deploying web applications.

#### Deploying to Vercel

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Follow the prompts to link your project to a Vercel account and project.

5. Set up environment variables in the Vercel project settings:
   - Go to your project on the Vercel dashboard
   - Navigate to **Settings** -> **Environment Variables**
   - Add the following variables:

   ```
   PINECONE_API_KEY=[your_pinecone_api_key]
   GOOGLE_CREDENTIALS_BASE64=[your_base64_encoded_google_credentials]
   ```

   **Note: The `NEXT_PUBLIC_` variables is automatically added by Vercel, so you don't need to manually add them.**

6. Redeploy your project to apply the environment variables:
   ```bash
   vercel --prod
   ```

7. Your Shop The Look application should now be deployed and accessible via the Vercel URL provided in the CLI.

Follow the instructions in the [Use Your Own Images and Videos](#-use-your-own-images-and-videos) section to upload your own images and videos to Shop The Look.

## 🌉 Use Your Own Images and Videos (20 minutes)

In order to make Shop The Look your own, you need to upload your assets and modify the project config file. 

### Upload, embed, and upsert assets (~15 minutes)

1. Open the [Image and Video Embedding Processors](https://github.com/pinecone-io/sample-apps-internal/blob/main/shop-the-look/scripts/README.md) folder (located at [`scripts/README.md`](https://github.com/pinecone-io/sample-apps-internal/blob/main/shop-the-look/scripts/README.md)). 

2. Read the README and use the two scripts to upload image and videos respectively.

### Update credentials and project settings (5 minutes)

To change Shop The Look to your credentials and settings, you need to modify the `api/config.py` file. 

1. Open the `api/config.py` file in your project.

2. Update the Google Cloud settings:
   - Change the `project_id` to your own Google Cloud project ID, this looks something like `shop-the-look`, and is in the top-left corner of your Google Cloud dashboard. 
   - Update the `location` to the region where your Google Cloud resources are located.
   - Set the `gcs_bucket_name` to the name of your Google Cloud Storage bucket.

   ```python
   self.project_id = 'your-google-cloud-project-id'
   self.location = 'your-region'
   self.gcs_bucket_name = 'your-gcs-bucket-name'
   ```

3. Set up the Google credentials:
   - Ensure the `GOOGLE_CREDENTIALS_BASE64` environment variable is set with your own base64-encoded service account JSON.

   ```python
   self.google_credentials_base64 = os.getenv('GOOGLE_CREDENTIALS_BASE64')
   ```

4. Update the Pinecone settings:
   - Set the `api_key` to your own Pinecone API key.
   - Change the `index_name` to the name of your Pinecone index.
   - *Optional: adjust the `k` value to change the number of top results returned by your search.*

   ```python
   self.api_key = os.getenv('PINECONE_API_KEY')
   self.index_name = 'your-pinecone-index-name'
   self.k = 20  # or any other value you prefer
   ```

5. Save the changes to `config.py`.

By following these steps, you will have customized the `config.py` file to connect to your own Google Cloud project and Pinecone index. Make sure to redeploy your project after making these changes to apply the new configuration.

For more detailed instructions on setting up Google Cloud and Pinecone, refer to their respective documentation:
- [Google Cloud Authentication](https://cloud.google.com/docs/authentication/getting-started)
- [Pinecone Documentation](https://www.pinecone.io/docs?utm_source=shop-the-look&utm_medium=referral)

## 🫠 Troubleshooting

For **Google Cloud** authentication or permission issues, ensure that:
- The service account has the correct permissions - `Vertex AI User`, `Storage Object Viewer`
- The `GOOGLE_CREDENTIALS_BASE64` environment variable is correctly set, double check in your shell or Vercel environment variables.
- The Google Cloud APIs are enabled for your project - `Vertex AI API`, `Cloud Storage API`

For **Pinecone** issues, verify that:
- You entered the right Index name
- Your API key is correct
- The Index is created with the correct dimensions (1408)
- You're using the correct environment

For **Vercel** deployment issues, check:
- [Vercel build logs](https://vercel.com/docs/deployments/logs)
- Ensure all [environment variables](https://vercel.com/docs/projects/environment-variables) are correctly set in the Vercel project settings

For **other** issues, please create an issue in the [GitHub repository](https://github.com/pinecone-io/sample-apps-internal/issues).

## ⚠️ Service Limitations

There are some service limitations to be aware of. 

#### Affects Frontend
- Vercel's request body size limit of 4.5 MB, so all image and video uploads in the frontend (this is the drag-and-drop upload and upload button) is limited to <4.5 MB ([source](https://vercel.com/docs/storage/vercel-blob/server-upload)). Users will not be able to upload images or videos larger than 4.5 MB in Shop The Look. To alleviate this, we apply client-side image compression to images prior to uploading. Videos are not compressed. 

#### Affects Backend
- Multimodal Embedding Model using videos hosted on Google Cloud Storage has no maximum video length, but only 2 minutes of content will be analyzed at a time ([source](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#api-limits)) 
- Multimodal Embedding Model image upload is limited to 20 MB, and the image is resized to 512x512 pixels prior to embedding ([source](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#api-limits))
- Some users may encounter authentication issues with the Google Cloud SDK when getting embeddings for videos stored in Google Cloud Storage using `gs://` URIs. These issues will appear as `StatusCode.UNAUTHENTICATED` and `Video embedding failed with the following error: Deadline` errors. This is a known issue with the Google Cloud SDK, and a potential solution can be found in this [Stack Overflow thread](https://stackoverflow.com/a/78618078/1913389). If this does not fix your issue, you will need to provide the video as a base64-encoded byte string (`video.bytesBase64Encoded`) - further instructions found [here](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#vid-embedding).
- Multimodal Embedding Model base64-encoded string video upload is limited to 27,000,000 chars ([not documented](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings#api-limits), but you will error) 
- Vercel Python Serverless Functions cannot exceed 250 MB in size ([source](https://vercel.com/docs/functions/limitations#vercel-functions-limitations)), so if you use a large Python library like `vertex-ai`, you will error. You will need to query Vertex AI's REST API directly, like in [/api/v1/endpoints](https://github.com/pinecone-io/sample-apps-internal/tree/main/shop-the-look/api/v1/endpoints)
- When extending the FastAPI backend, requests need to be mapped to `/api/:path*/` as this uses `next.config.js` rewrites. More information in the [Next.js FastAPI](https://github.com/digitros/nextjs-fastapi) Starter from Vercel. ([source](https://vercel.com/docs/functions/limitations#vercel-functions-limitations))

## 📝 Contributing

Any useful contributions are welcome, please create a [pull request](https://github.com/pinecone-io/sample-apps-internal/pulls) or [issue](https://github.com/pinecone-io/sample-apps-internal/issues). 

## 🔮 Built With

- [Pinecone Serverless](https://www.pinecone.io/?utm_source=shop-the-look&utm_medium=referral)
- [Google Cloud Vertex AI Multimodal Embedding Library](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings)
- [Google Cloud Storage](https://cloud.google.com/storage?hl=en)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)
- [Pexels](https://www.pexels.com/)