// Function to copy the text to the clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    return false;
  }
};

// Function to format the date to the local timezone
export const formatDate = (dateString: string) => {
  if (!dateString) return "Never";
  return new Date(dateString).toLocaleString("es-ES");
};

// Function to check if the date is expired
export const isExpired = (expiresAt: string | null) => {
  if (!expiresAt) return false;
  return new Date(expiresAt) < new Date();
};
