// utils/uploadImage.ts
export async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Giả sử token được lưu trong localStorage
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
