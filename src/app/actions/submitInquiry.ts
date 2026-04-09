"use server";

import { createClient } from 'next-sanity';

// Create a copy of the client with a token for write access
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "t90obuqv",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-21",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Requires write access token
});

export async function submitInquiry(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const title = formData.get('title') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !title || !message) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    if (!process.env.SANITY_API_TOKEN) {
      console.warn("No SANITY_API_TOKEN found. The inquiry will not be saved to Sanity.");
      // Return success anyway for the UI demo, but log a warning
      return { success: true };
    }

    // Create a new inquiry document in Sanity
    await writeClient.create({
      _type: 'inquiry',
      name,
      email,
      title,
      message,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return { success: false, error: "Submission failed" };
  }
}
