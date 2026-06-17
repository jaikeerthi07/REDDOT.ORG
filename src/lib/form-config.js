/**
 * Google Form submission configuration for the Enquiry Form.
 * 
 * To set this up:
 * 1. Create a Google Form with Name, Email, Phone, Service, and Message fields.
 * 2. Get the pre-filled link to find entry IDs (e.g., entry.123456789).
 * 3. Inspect the Form action attribute or use the submit URL.
 * 4. Paste the URL and field IDs below.
 * 
 * If submitUrl is left empty, the form will gracefully save submissions
 * to localStorage for local testing/demonstration.
 */
export const GOOGLE_FORM_CONFIG = {
  // Replace with your actual Google Form submit URL
  // Example: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfXXXXXXXXXXXXX/formResponse"
  submitUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-BLaWpXIzuz8GW-92ckdkfiIsuIlpSNkxjLBM1Uh7tfHxNg/formResponse", 
  
  // Replace with entry IDs from your Google Form pre-filled link
  fields: {
    name: "entry.521506579",     // Replace with your Name field ID
    email: "entry.258283375",    // Replace with your Email field ID
    phone: "entry.1017080981",    // Replace with your Phone field ID
    service: "entry.224234828",  // Replace with your Service field ID
    message: "entry.815259781"   // Replace with your Message field ID
  }
}
