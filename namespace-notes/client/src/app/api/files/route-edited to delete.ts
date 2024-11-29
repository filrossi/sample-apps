export interface FilesResponse {
  files: FetchedFile[];
}

export interface FetchedFile {
  name: string;
  url: string;
  documentId: string;
}

// Maximum duration for requests (adjust as necessary)
export const maxDuration = 600;

/**
 * Helper function to fetch available namespaces (workspaces) from cloud storage.
 * Replace this logic with the appropriate API call for your cloud storage.
 */
async function fetchExistingWorkspaces(): Promise<string[]> {
  try {
    const response = await fetch(`${process.env.STORAGE_API_URL}/list-workspaces`);

    if (!response.ok) {
      throw new Error("Failed to fetch workspaces from cloud storage.");
    }

    const workspaces: string[] = await response.json();
    console.log("Fetched existing workspaces:", workspaces);
    return workspaces;
  } catch (error) {
    console.error("Error fetching existing workspaces:", error);
    return [];
  }
}

/**
 * GET method to fetch file URLs for a specific namespace.
 * Validates namespace existence before proceeding.
 */
export async function GET(request: Request) {
  const namespaceId = new URL(request.url).searchParams.get("namespaceId");

  console.log("GET request to fetch files for namespace:", namespaceId);

  if (namespaceId && typeof namespaceId !== "string") {
    throw new Error("Invalid or missing namespace ID in request URL.");
  }

  try {
    // Fetch existing workspaces from cloud storage
    const existingWorkspaces = await fetchExistingWorkspaces();

    // Validate namespace ID if provided
    if (namespaceId && !existingWorkspaces.includes(namespaceId)) {
      console.error(`Namespace ${namespaceId} does not exist in cloud storage.`);
      return new Response(JSON.stringify({ error: "Namespace not found" }), {
        status: 404,
      });
    }

    // Fetch files for the namespace
    const url = `${process.env.SERVER_URL}/api/documents/files/${namespaceId}`;
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${data.message}`);
    }

    const fileUrls: FilesResponse = data;
    console.log("Files fetched successfully:", JSON.stringify(fileUrls));

    return new Response(JSON.stringify(fileUrls), { status: 200 });
  } catch (error) {
    console.error("Error fetching files:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch files URLs" }),
      { status: 500 }
    );
  }
}

/**
 * POST method to upload files to a namespace.
 */
export async function POST(req: Request) {
  const formData = new FormData();
  const data = await req.formData();
  const entries = Array.from(data.entries());

  for (const [key, value] of entries) {
    if (key === "newWorkspace") {
      formData.append(key, JSON.stringify(true));
    } else {
      formData.append(key, value);
    }
  }

  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/api/documents/add`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log("Files uploaded successfully:", responseData);
      return new Response(
        JSON.stringify({ namespaceId: responseData.namespaceId }),
        { status: 200 }
      );
    } else {
      throw new Error("Failed to upload files, " + response.statusText);
    }
  } catch (error) {
    console.error("Error uploading files:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

/**
 * DELETE method to remove a file or namespace.
 */
export async function DELETE(request: Request) {
  const documentId = new URL(request.url).searchParams.get("documentId");
  const namespaceId = new URL(request.url).searchParams.get("namespaceId");

  if (typeof namespaceId !== "string") {
    throw new Error("Invalid or missing namespace ID in request URL.");
  }

  try {
    let url;
    let message;

    if (typeof documentId === "string") {
      // Delete a specific document
      url = `${process.env.SERVER_URL}/api/documents/files/delete/${namespaceId}/${documentId}`;
      message = "File deleted successfully.";
    } else {
      // Delete the entire workspace/namespace
      url = `${process.env.SERVER_URL}/api/documents/workspace/${namespaceId}`;
      message = "Workspace deleted successfully.";
    }

    const response = await fetch(url, { method: "DELETE" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to delete ${documentId ? "file" : "workspace"}: ${data.message}`
      );
    }

    console.log(message);
    return new Response(JSON.stringify({ message }), { status: 200 });
  } catch (error) {
    console.error(
      `Error deleting ${documentId ? "file" : "workspace"}:`,
      error
    );
    return new Response(
      JSON.stringify({ error: `Failed to delete ${documentId ? "file" : "workspace"}` }),
      { status: 500 }
    );
  }
}
